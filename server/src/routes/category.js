const mongodb = require('../models/mongodb')
const { ObjectId } = require('mongodb')


exports.create = async (req, res) => {

    let dbName = await mongodb();
    let collection = dbName.collection('category')

    let category = req.body.category;

    let find = await collection.findOne({ category: category })

    if (find) {
        res.send({ code: 400, msg: 'category already exists' })
    } else {
        let add = await collection.insertOne({ category: category })

        if (add.acknowledged) {
            res.send({ code: 200, msg: 'category added successfully' })
        } else {
            res.send({ code: 400, msg: 'category not added' })
        }
    }

}

exports.read = async (req, res) => {

    let dbName = await mongodb();
    let collection = dbName.collection('category')

    let category = await collection.find({}).toArray()

    res.send({ code: 200, count: category.length, category: category })

}

exports.delete = async (req, res) => {

    let dbName = await mongodb();
    let collection = dbName.collection('category')

    if (req.params.id) {
        let id = req.params.id
        let category = await collection.deleteOne({ _id: new ObjectId(id) })

        if (category.deletedCount > 0) {
            res.send({ code: 200, msg: 'Category deleted successfully' })
        } else {
            res.send({ code: 400, msg: 'User not delete' })
        }
    }
}