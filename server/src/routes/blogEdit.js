const jsonData = require('../utils/blogData.json');
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv')
const { metaSchema, ogSchema, twitterSchema, articleSchema, authorSchema, categorySchema, blogAdditionalSchema, blogIntroSchema, blogUrlSchema, sectionSchema, rcSchema, testiSchema, faqSchema } = require('../services/validationSchema')

const ajv = new Ajv({
    allowUnionTypes: true
})

exports.blog = (req, res) => {
    const id = req.body.id;
    const newData = req.body;

    const metaValidate = ajv.compile(metaSchema)
    const metaValid = metaValidate(newData.meta)

    const ogValidate = ajv.compile(ogSchema)
    const ogValid = ogValidate(newData.og)

    const twitterValidate = ajv.compile(twitterSchema)
    const twitterValid = twitterValidate(newData.twitter)

    const articleValidate = ajv.compile(articleSchema)
    const articleValid = articleValidate(newData.article)

    const blogIntroValidate = ajv.compile(blogIntroSchema)
    const blogIntroValid = blogIntroValidate(newData.blog_intro)

    const blogUrlValidate = ajv.compile(blogUrlSchema)
    const blogUrlValid = blogUrlValidate({ url_slug: newData.url_slug, canonical: newData.canonical })

    const authorValidate = ajv.compile(authorSchema)
    const authorValid = authorValidate(newData.author)

    const categoryValidate = ajv.compile(categorySchema)
    const categoryValid = categoryValidate(newData.category)

    const additionalDataValidate = ajv.compile(blogAdditionalSchema)
    const additionalDataValid = additionalDataValidate(newData.additional_data)

    let sectionValid = true;
    let faqValid = true;
    let rcValid = true;
    let testiValid = true;

    newData.blog_data.forEach((e) => {
        if (e.type === 'section') {
            const sectionValidate = ajv.compile(sectionSchema)
            sectionValid = sectionValidate(e.data)
        }
        else if (e.type === 'faq') {
            const faqValidate = ajv.compile(faqSchema)
            faqValid = faqValidate(e.data)
        }
        else if (e.type === 'recommended_reading') {
            const rcValidate = ajv.compile(rcSchema)
            rcValid = rcValidate(e.data)
        }
        else if (e.type === 'testimonials') {
            const testiValidate = ajv.compile(testiSchema)
            testiValid = testiValidate(e.data)
        }
    })

    if (metaValid && ogValid && twitterValid && articleValid && blogIntroValid && blogUrlValid && authorValid && categoryValid && additionalDataValid && sectionValid && rcValid && testiValid && faqValid) {

        let jsonpath = path.join(__dirname, '../utils/blogData.json');
        let blogData = JSON.parse(fs.readFileSync(jsonpath));

        // Find the index of the entry with the matching ID
        const index = blogData.blog.findIndex(entry => entry.id === id);
        if (index !== -1) {
            // Replace the old entry with the new data
            blogData.blog[index] = newData;
        }

        fs.writeFileSync(jsonpath, JSON.stringify(blogData, null, 2));

        res.send({ code: 200, message: 'Blog updated successfully' });
    } else {
        res.send({ code: 400, message: 'Blog not updated' });
    }
}
