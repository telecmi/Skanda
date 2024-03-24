const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mongodb = require('../models/mongodb');
const { ObjectId } = require('mongodb')

const generateId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: 4 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '../../../public/img/user')
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
            return res.send({ message: 'Multer error: ' + err.message, code: 400 });
        } else if (err) {
            return res.send({ message: 'Error: ' + err.message, code: 400 });
        }

        if (req.body) {
            try {
                let data = JSON.parse(req.body.userData)

                let filepath;

                req.files.forEach((file) => {
                    filepath = file.path
                })

                if (filepath) {
                    const publicIndex = filepath.indexOf('/public');
                    const relativePath = filepath.slice(publicIndex);
                    data.photo = relativePath
                }

                let dbName = await mongodb();
                let collection = dbName.collection('users')

                let id = data.id
                delete data.id

                if (data.photoOld) {

                    const filePath = path.join(__dirname, '../../', data.photoOldURL);
                    const filename = data.photoOldURL

                    fs.unlink(filePath, (err) => { });
                }

                delete data.photoOldURL
                delete data.photoOld

                let result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: data })

                if (result.modifiedCount === 1) {
                    res.send({ code: 200, message: 'User updated successfully', user: data });
                } else {
                    res.send({ code: 404, message: 'User not found or no changes made', user: data });
                }
            } catch (error) {
                console.error('Error updating user:', error);
                res.send({ code: 500, message: 'Internal server error' });
            }

        }
    });
}
