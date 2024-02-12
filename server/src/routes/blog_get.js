const data = require('../utils/blogData.json');


exports.get = (req, res) => {

    res.send({ code: 200, count: data.blog.length, blog: data.blog })
}