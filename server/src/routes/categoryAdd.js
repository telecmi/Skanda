const data = require('../utils/categoryData.json');
const mongodb = require('../models/mongodb')

exports.category = async (req, res) => {

    let dbName = await mongodb();
    let collection = dbName.collection('category')

    let category = req.body.category;

    let find = await collection.findOne({ category: category })

    if (find) {
        res.send({ code: 400, msg: 'category already exists' })
    } else {
        let add = await collection.insertOne({ category: category })

        if (add.acknowledged) {
            res.send({ code: 200, msg: 'category added successfully' })
        } else {
            res.send({ code: 400, msg: 'category not added' })
        }
    }

    // let newUser = req.body

    // let jsonpath = path.join(__dirname, '../utils/categoryData.json');
    // let data = JSON.parse(fs.readFileSync(jsonpath));

    // data.category.push(newUser);

    // // Convert the JavaScript object back to JSON format
    // const updatedJsonData = JSON.stringify(data, null, 2);

    // // Write the updated JSON data back to the file
    // fs.writeFileSync(jsonpath, updatedJsonData);

    // res.send({ code: 200, msg: 'category added successfully' })

}