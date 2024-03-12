const data = require('../utils/categoryData.json');
const path = require('path')
const fs = require('fs');

exports.category = (req, res) => {
    const categoryIdToRemove = req.body.id; // Assuming the request body contains the ID of the category to remove
    const jsonDataPath = path.join(__dirname, '../utils/categoryData.json'); // Path to the JSON file
    let data = require(jsonDataPath); // Load JSON data

    // Filter out the category with the specified ID
    data.category = data.category.filter(category => category.id !== categoryIdToRemove);

    // Write the updated JSON data back to the file
    fs.writeFileSync(jsonDataPath, JSON.stringify(data, null, 2));

    res.send({ code: 200, msg: "Category deleted successfully" });
}
