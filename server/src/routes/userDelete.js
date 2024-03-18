const fs = require('fs');
const path = require('path')
const mongodb = require('../models/mongodb')
const { ObjectId } = require('mongodb')

exports.user = async (req, res) => {
    const { id } = req.body;

    if (id) {
        let dbName = await mongodb();
        let collection = dbName.collection('users')

        let userData = await collection.findOne({ _id: new ObjectId(id) })

        const fileDeletion = () => {
            const filePath = path.join(__dirname, '../../', userData.photo);
            const filename = userData.photo

            fs.unlink(filePath, (err) => {

                if (err) {
                    console.error('Error deleting file:', err);
                    res.send({ code: 500, msg: 'Failed to delete file', data: user })
                } else {
                    console.log('File deleted successfully:', filename);
                    res.send({ code: 200, msg: "File deleted successfully" })
                }

            });
        }

        let user = await collection.deleteOne({ _id: new ObjectId(id) })

        if (user.deletedCount > 0) {
            fileDeletion()
        } else {
            res.send({ code: 400, msg: 'User not delete', data: user })
        }
    } else {
        res.send({ code: 400, msg: 'ID not found', data: user })
    }
}


