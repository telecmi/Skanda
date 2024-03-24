const fs = require('fs');
const path = require('path');
const mongodb = require('../models/mongodb')


exports.blog = async (req, res) => {

    let data = req.body

    const uploadDir = '../../public/blog';
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
    let collection = dbName.collection('blogs')
    await collection.insertOne(data)

    res.send({ code: 200, msg: 'success' })
}