const { MongoClient } = require('mongodb')
const dbUrl = require('../config/config') 


const client = new MongoClient(dbUrl);

const dbName = 'blog'

const db = async () => {
    try {
        await client.connect();
        return client.db(dbName)
    } catch (error) {
        throw error
    }
}
module.exports = db