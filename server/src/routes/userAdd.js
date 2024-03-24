const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mongodb = require('../models/mongodb')

const generateId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: 4 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '../../../public/user')
    },
    filename: (req, file, cb) => {

        let filename = Date.now() + '_' + generateId() + '_' + file.originalname

        cb(null, filename)
    }
})

const upload = multer({ storage }).any()


exports.user = async (req, res) => {

    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: 'Multer error: ' + err.message, code: 400 });
        } else if (err) {
            return res.status(500).json({ message: 'Error: ' + err.message, code: 400 });
        }

        const formData = JSON.parse(req.body.userData);

        let filepath;

        req.files.forEach((file, index) => {
            filepath = file.path
        })

        if (filepath) {
            const publicIndex = filepath.indexOf('/public');
            const relativePath = filepath.slice(publicIndex);
            formData.photo = relativePath
        }

        let dbName = await mongodb();
        let collection = dbName.collection('users')

        // user add
        const userAdd = () => {
            collection.insertOne(formData).then((response) => {
                return res.send({ code: 200, message: 'User added successfully', data: formData });
            }).catch((err) => {
                console.log(err)
                return res.send({ code: 400, message: 'Internal error please try again', data: formData });
            })
        }

        // user already exists
        let email = formData.email
        const emailExists = await collection.findOne({ email })

        if (emailExists) {
            res.send({ code: 400, msg: 'Email already exists', data: formData })
        } else {
            userAdd()
        }

    })
}