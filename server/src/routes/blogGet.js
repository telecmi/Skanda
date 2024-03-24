const data = require('../utils/blogData.json');
const mongodb = require('../models/mongodb')



exports.blog = async (req, res) => {

    let dbName = await mongodb();
    let collection = dbName.collection('blogs')

    let blogs = await collection.find({}).toArray()

    res.send({ code: 200, count: blogs.length, blog: blogs })
}