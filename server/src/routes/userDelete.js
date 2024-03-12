const fs = require('fs');
const path = require('path')

exports.user = (req, res) => {
    const { id } = req.body;
    const jsonpath = path.join(__dirname, '../utils/userData.json');
    let data = JSON.parse(fs.readFileSync(jsonpath));

    console.log(id);

    // Find the index of the user with the specified ID
    const userIndex = data.user.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        // Remove the user from the array
        data.user.splice(userIndex, 1);

        // Convert the JavaScript object back to JSON format
        const updatedJsonData = JSON.stringify(data, null, 2);

        // Write the updated JSON data back to the file
        fs.writeFileSync(jsonpath, updatedJsonData);

        res.send({ code: 200, msg: 'User deleted successfully' });
    } else {
        res.status(404).send({ code: 404, msg: 'User not found' });
    }
}


