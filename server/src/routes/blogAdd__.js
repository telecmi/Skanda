const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mongodb = require('../models/mongodb')
const Ajv = require('ajv')
const { metaSchema, ogSchema, twitterSchema, articleSchema, authorSchema, categorySchema, blogAdditionalSchema, blogIntroSchema, blogUrlSchema, sectionSchema, rcSchema, testiSchema, faqSchema } = require('../services/validationSchema')

const ajv = new Ajv({
    allowUnionTypes: true
})

// const generateId = () => {
//     const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     return Array.from({ length: 4 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, __dirname + '../../../public/img/blog')
//     },
//     filename: (req, file, cb) => {

//         let filename = Date.now() + '_' + generateId() + '_' + file.originalname

//         cb(null, filename)
//     }
// })

// const upload = multer({ storage }).any()

const validation = (data) => {

    const metaValidate = ajv.compile(metaSchema)
    const metaValid = metaValidate(data.meta)

    const ogValidate = ajv.compile(ogSchema)
    const ogValid = ogValidate(data.og)

    const twitterValidate = ajv.compile(twitterSchema)
    const twitterValid = twitterValidate(data.twitter)

    const articleValidate = ajv.compile(articleSchema)
    const articleValid = articleValidate(data.article)

    const blogIntroValidate = ajv.compile(blogIntroSchema)
    const blogIntroValid = blogIntroValidate(data.blog_intro)

    const blogUrlValidate = ajv.compile(blogUrlSchema)
    const blogUrlValid = blogUrlValidate({ url_slug: data.url_slug, canonical: data.canonical })

    const authorValidate = ajv.compile(authorSchema)
    const authorValid = authorValidate(data.author)

    const categoryValidate = ajv.compile(categorySchema)
    const categoryValid = categoryValidate(data.category)

    const additionalDataValidate = ajv.compile(blogAdditionalSchema)
    const additionalDataValid = additionalDataValidate(data.additional_data)

    let sectionValid = true;
    let faqValid = true;
    let rcValid = true;
    let testiValid = true;

    if (data.blog_data) {
        data.blog_data.forEach((e) => {
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
    }

    if (metaValid && ogValid && twitterValid && articleValid && blogIntroValid && blogUrlValid && authorValid && categoryValid && additionalDataValid && sectionValid && rcValid && testiValid && faqValid) {
        return true
    } else {
        return false
    }

}

exports.blog = async (req, res) => {

    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.send({ message: 'Multer error: ' + err.message, code: 400 });
        } else if (err) {
            return res.send({ message: 'Error: ' + err.message, code: 400 });
        }

        const blogData = JSON.parse(req.body.blogData);

        console.log(blogData)

        let filepath;
        let relativePath;

        req.files.forEach((file, index) => {
            filepath = file.path
        })

        if (filepath) {
            const publicIndex = filepath.indexOf('/public');
            relativePath = filepath.slice(publicIndex);
        }

        if (blogData) {
            let valid = validation(blogData)

            if (valid) {
                let dbName = await mongodb();
                let collection = dbName.collection('blogs')

                blogData.blog_intro.img = relativePath

                let add = await collection.insertOne(blogData)

                if (add.acknowledged) {
                    res.send({ code: 200, msg: 'blog added successfully', })
                } else {
                    res.send({ code: 400, msg: 'blog not added' })
                }
            }
        }
    })
}