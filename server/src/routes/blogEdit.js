const jsonData = require('../utils/blogData.json');
const mongodb = require('../models/mongodb')
const { ObjectId } = require('mongodb')
const fs = require('fs');
const path = require('path');


exports.blog = async (req, res) => {

    let data = req.body
    let _id = req.body._id

    const uploadDir = '../../public/blog';
    let fileArray = []

    let filesToKeep = [];

    function collectPaths(obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'string' && obj[key].includes('/public/blog')) {
                remove_pub_blog = obj[key].replace('/public/blog/', '')
                filesToKeep.push(remove_pub_blog);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                collectPaths(obj[key]);
            }
        }
    }

    collectPaths(data);

    console.log(filesToKeep);


    fs.readdir(path.join(__dirname, uploadDir), (err, files) => {
        if (err) {
            console.error('Could not list the directory.', err);
            return;
        }

        files.forEach((file) => {
            if (file.startsWith(data.id+'_') && !filesToKeep.includes(file)) {
                // This file is not in the list and should be removed
                fs.unlink(path.join(path.join(__dirname, uploadDir), file), (err) => {
                    if (err) {
                        console.error('Error removing file:', file, err);
                    } else {
                        console.log('Removed file:', file);
                    }
                });
            }
        });
    });

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
    let collection = dbName.collection('blogs')
    // await collection.insertOne(data)
    await collection.updateOne({_id: new ObjectId(_id)},{$set: data})

    res.send({ code: 200, msg: 'success' })
}
