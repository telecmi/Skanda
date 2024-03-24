const jsonData = require('../utils/blogData.json');
const mongodb = require('../models/mongodb')
const { ObjectId } = require('mongodb')
const path = require('path');
const fs = require('fs');

exports.blog = async (req, res) => {
    const id = req.body._id;
    const deleteFileID = req.body.id;

    let dir = path.join(__dirname, '../../public/blog')

    const dbName = await mongodb()
    const collection = dbName.collection('blogs')

    let deleteBlog = await collection.deleteOne({ _id: new ObjectId(id) })

    if (deleteBlog.deletedCount > 0) {

        fs.readdir(dir, (err, files) => {
            if (err) {
                res.send({ code: 400, message: 'Blog not deleted' });
                return;
            }

            files.forEach(file => {
                if (file.includes(deleteFileID)) {
                    fs.unlink(path.join(dir, file), err => {
                        if (err) {
                            // res.send({ code: 400, message: 'Unable to delete blog files' });
                        } else {
                            // res.send({ code: 200, message: 'Blog deleted successfully' });
                        }
                    });
                }
            });
        });

        res.send({ code: 200, message: 'Blog deleted successfully' });

    } else {
        res.send({ code: 400, message: 'Blog not deleted' });
    }

}