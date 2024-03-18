const { MongoClient } = require('mongodb')

const url = 'mongodb+srv://rahulvelu:rahulvelu12@cluster0.le5pd.mongodb.net/';
const client = new MongoClient(url);

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