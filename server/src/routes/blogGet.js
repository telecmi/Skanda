const data = require('../utils/blogData.json');


exports.blog = (req, res) => {

    res.send({ code: 200, count: data.blog.length, blog: data.blog })
}