const mongodb = require('../models/mongodb')
const { ObjectId } = require('mongodb')

exports.category = async (req, res) => {
    let dbName = await mongodb();
    let collection = dbName.collection('category')

    if (req.body) {
        let id = req.body.id
        let category = await collection.deleteOne({ _id: new ObjectId(id) })

        if (category.deletedCount > 0) {
            res.send({ code: 200, msg: 'Category deleted successfully' })
        } else {
            res.send({ code: 400, msg: 'User not delete' })
        }
    }
}
