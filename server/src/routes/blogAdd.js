const fs = require('fs');
const path = require('path');
const Ajv = require('ajv')
const { metaSchema, ogSchema, twitterSchema, articleSchema, authorSchema, categorySchema, blogAdditionalSchema, blogIntroSchema, blogUrlSchema, sectionSchema, rcSchema, testiSchema, faqSchema } = require('../services/validationSchema')

const ajv = new Ajv({
    allowUnionTypes: true
})


exports.blog = (req, res) => {
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

        // Define the file path where you want to store the data
        const filePath = path.join(__dirname, '../utils/blogData.json')

        // Read the existing data from the file
        fs.readFile(filePath, 'utf8', (err, fileData) => {
            if (err) {
                return;
            }

            let jsonData = {};

            // If file is empty or does not contain valid JSON, initialize jsonData with an empty blog array
            if (!fileData.trim()) {
                jsonData.blog = [];
            } else {
                try {
                    // Parse the existing JSON data
                    jsonData = JSON.parse(fileData);
                } catch (parseError) {
                    return;
                }
            }

            // Push the new data into the blog array
            jsonData.blog.push(newData);

            // Convert the JavaScript object to a JSON string
            const updatedData = JSON.stringify(jsonData);

            // Write the updated JSON string back to the file
            fs.writeFile(filePath, updatedData, (writeErr) => {
                if (writeErr) {
                    return;
                }
            });
        });

        res.send({ code: 200, msg: 'Blog added successfully' })

    } else {
        res.send({ code: 400, msg: 'Blog not added' })
    }
}