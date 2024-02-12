const jsonData = require('../utils/blogData.json');
const fs = require('fs');
const path = require('path');

exports.delete = (req, res) => {
    const id = req.body.id;

    // jsonData.blog.forEach(blog => {
    //     if (blog.id === id) {
    //         console.log(req.body);
    //     }
    // });

    let jsonpath = path.join(__dirname, '../utils/blogData.json');

    // // fs.writeFileSync(jsonpath, JSON.stringify(jsonData, null, 2));

    // // Send response

    fs.readFile(jsonpath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

        try {
            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // Filter out the object with the matching ID
            jsonData.blog = jsonData.blog.filter(item => item.id !== id);

            // Write the updated JSON data back to the file
            fs.writeFile(jsonpath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                    return;
                }
                console.log('Object with ID', id, 'deleted successfully.');
            });
        } catch (error) {
            console.error('Error parsing JSON data:', error);
        }
    });

    res.send({ code: 200, message: 'Blog delete successfully' });
}