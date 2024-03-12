const fs = require('fs');
const path = require('path')

exports.user = (req, res) => {
    let updateUser = req.body;
    let jsonpath = path.join(__dirname, '../utils/userData.json');
    let data = JSON.parse(fs.readFileSync(jsonpath));

    console.log(updateUser);

    // Update user(s) with matching ID
    data.user.forEach((user, index) => {
        if (user.id === updateUser.id) {
            data.user[index] = updateUser;
        }
    });

    // Convert the JavaScript object back to JSON format
    const updatedJsonData = JSON.stringify(data, null, 2);

    // Write the updated JSON data back to the file
    fs.writeFileSync(jsonpath, updatedJsonData);

    res.send({ code: 200, msg: 'User data updated successfully' });
}

