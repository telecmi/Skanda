const data = require('../utils/categoryData.json');

exports.category = (req, res) => {

    console.log(data.category)
    res.send({ code: 200, count: data.category.length, category: data.category })

}