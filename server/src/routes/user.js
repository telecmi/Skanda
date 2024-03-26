const fs = require('fs');
const path = require('path');
const mongodb = require('../models/mongodb')
const { ObjectId } = require('mongodb')


exports.create = async (req, res) => {

    let data = req.body

    const uploadDir = '../../public/user';
    let fileArray = []

    if (req.files) {
        req.files.forEach((file) => {
            const destinationPath = path.join(__dirname, uploadDir, data.id + '_' + file.originalname);

            fs.writeFile(destinationPath, file.buffer, (err) => {
                if (err) {
                    // console.error('Error moving file:', err);
                } else {
                    // console.log('File uploaded successfully:', destinationPath);
                }
            });
            fileArray.push({ "field": file.fieldname, "filename": '/public' + destinationPath.split('/public')[1] });
        });
    }


    fileArray.forEach(({ field, filename }) => {
        const path = field.split(/[\[\].]+/).filter(p => p);
        let ref = data;
        for (let i = 0; i < path.length - 1; i++) {
            ref = ref[path[i]];
            if (Array.isArray(ref)) {

                ref = ref[parseInt(path[++i], 10)];
            }
        }
        ref[path[path.length - 1]] = filename;
    });



    let dbName = await mongodb()
    let collection = dbName.collection('users')
    await collection.insertOne(data)

    res.send({ code: 200, msg: 'success' })
}


exports.read = async (req, res) => {

    let dbName = await mongodb();
    let collection = dbName.collection('users')

    let userList = await collection.find({}).toArray()

    res.send({ code: 200, count: userList.length, users: userList })
}


exports.update = async (req, res) => {

    let data = req.body
    let _id = req.body._id

    const uploadDir = '../../public/user';
    let fileArray = []

    let filesToKeep = [];

    function collectPaths(obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'string' && obj[key].includes('/public/user')) {
                remove_pub_user = obj[key].replace('/public/user/', '')
                filesToKeep.push(remove_pub_user);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                collectPaths(obj[key]);
            }
        }
    }

    collectPaths(data);

    try {
        const files = await fs.promises.readdir(path.join(__dirname, uploadDir));
        for (const file of files) {
            if (file.startsWith(data.id + '_') && !filesToKeep.includes(file)) {
                await fs.promises.unlink(path.join(__dirname, uploadDir, file));
            }
        }
    } catch (err) {
        console.error('Error processing the directory.', err);
        return res.send({ code: 500, msg: 'Failed to process files' });
    }

    if (req.files) {
        req.files.forEach((file) => {
            const destinationPath = path.join(__dirname, uploadDir, data.id + '_' + file.originalname);

            fs.writeFile(destinationPath, file.buffer, (err) => {
                if (err) {
                    // console.error('Error moving file:', err);
                } else {
                    // console.log('File uploaded successfully:', destinationPath);
                }
            });
            fileArray.push({ "field": file.fieldname, "filename": '/public' + destinationPath.split('/public')[1] });
        });
    }


    fileArray.forEach(({ field, filename }) => {
        const path = field.split(/[\[\].]+/).filter(p => p);
        let ref = data;
        for (let i = 0; i < path.length - 1; i++) {
            ref = ref[path[i]];
            if (Array.isArray(ref)) {

                ref = ref[parseInt(path[++i], 10)];
            }
        }
        ref[path[path.length - 1]] = filename;
    });


    delete data._id

    let dbName = await mongodb()
    let collection = dbName.collection('users')
    // await collection.insertOne(data)
    let update = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: data })

    // if (update.modifiedCount > 0) {
    res.send({ code: 200, msg: 'success' })
    // }else{
    //     res.send({ code: 400, msg: 'User not updated' })
    // }
}


exports.delete = async (req, res) => {

    const id = req.params.id;
    const deleteFileID = req.body.id;
    console.log(deleteFileID)

    let dir = path.join(__dirname, '../../public/user')

    const dbName = await mongodb()
    const collection = dbName.collection('users')

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