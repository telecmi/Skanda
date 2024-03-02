const fs = require('fs');
const path = require('path');


exports.add = (req, res) => {
    // Assuming req.body is the object you want to store
    const newData = req.body;

    console.log(newData)

    // Define the file path where you want to store the data
    const filePath = path.join(__dirname, '../utils/blogData.json')

    // Read the existing data from the file
    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err) {
            return;
        }

        let jsonData = {};

        // If file is empty or does not contain valid JSON, initialize jsonData with an empty blog array
        if (!fileData.trim()) {
            jsonData.blog = [];
        } else {
            try {
                // Parse the existing JSON data
                jsonData = JSON.parse(fileData);
            } catch (parseError) {
                return;
            }
        }

        // Push the new data into the blog array
        jsonData.blog.push(newData);

        // Convert the JavaScript object to a JSON string
        const updatedData = JSON.stringify(jsonData);

        // Write the updated JSON string back to the file
        fs.writeFile(filePath, updatedData, (writeErr) => {
            if (writeErr) {
                return;
            }
        });
    });

    res.send({ code: 200, msg: 'Blog added successfully' })
}