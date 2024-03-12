const data = require('../utils/categoryData.json');
const path = require('path')
const fs = require('fs')

exports.category = (req, res) => {

    let newUser = req.body

    let jsonpath = path.join(__dirname, '../utils/categoryData.json');
    let data = JSON.parse(fs.readFileSync(jsonpath));

    data.category.push(newUser);

    // Convert the JavaScript object back to JSON format
    const updatedJsonData = JSON.stringify(data, null, 2);

    // Write the updated JSON data back to the file
    fs.writeFileSync(jsonpath, updatedJsonData);

    res.send({ code: 200, msg: 'category added successfully' })

}