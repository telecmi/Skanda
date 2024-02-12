const jsonData = require('../utils/blogData.json');
const fs = require('fs');
const path = require('path');

exports.update = (req, res) => {
    const id = req.body.id;
    const newData = req.body;

    jsonData.blog.forEach(blog => {
        if (blog.id === id) {
            blog.primary = newData.primary;
            blog.secondary = newData.secondary;
        }
    });

    let jsonpath = path.join(__dirname, '../utils/blogData.json');

    fs.writeFileSync(jsonpath, JSON.stringify(jsonData, null, 2));

    // Send response
    res.send({ code: 200, message: 'Blog updated successfully' });
}
