const data = require('../utils/userData.json');
const mongodb = require('../models/mongodb');


exports.login = async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ code: 400, msg: 'Invalid request: Missing data' });
        }

        const dbName = await mongodb();
        const collection = dbName.collection('users');

        const user = await collection.findOne({ email: data.userid, password: data.password });

        if (user) {
            return res.status(200).json({ code: 200, msg: 'User login successful', user: user });
        } else {
            return res.status(404).json({ code: 404, msg: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ code: 500, msg: 'Internal server error' });
    }
};