const mongodb = require('../models/mongodb')


exports.category = async (req, res) => {

    let dbName = await mongodb();
    let collection = dbName.collection('category')

    let category = await collection.find({}).toArray()

    res.send({ code: 200, count: category.length, category: category })

}