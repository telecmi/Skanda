const data = require('../utils/userData.json');
const mongodb = require('../models/mongodb');

exports.user = async (req, res) => {

    let dbName = await mongodb();
    let collection = dbName.collection('users')

    let userList = await collection.find({}).toArray()



    res.send({ code: 200, count: userList.length, users: userList })
}