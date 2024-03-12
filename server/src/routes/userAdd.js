const fs = require('fs');
const path = require('path')


exports.user = (req, res) => {

    let newUser = req.body

    let jsonpath = path.join(__dirname, '../utils/userData.json');
    let data = JSON.parse(fs.readFileSync(jsonpath));

    data.user.push(newUser);

    // Convert the JavaScript object back to JSON format
    const updatedJsonData = JSON.stringify(data, null, 2);

    // Write the updated JSON data back to the file
    fs.writeFileSync(jsonpath, updatedJsonData);

    res.send({ code: 200, msg: 'user added successfully' })
}