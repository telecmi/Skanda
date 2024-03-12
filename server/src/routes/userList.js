const data = require('../utils/userData.json');

exports.user = (req, res) => {

    res.send({ code: 200, count: data.user.length, users: data.user })
}