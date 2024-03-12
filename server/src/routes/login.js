const data = require('../utils/userData.json');


exports.login = (req, res) => {

    const findUser = (email, password) => {
        return data.user.find(user => user.email === email && user.password === password);
    };

    const input = req.body
    const user = findUser(input.userid, input.password);

    if (user) {
        res.send({ code: 200, msg: "user login successful", user: user });
    } else {
        res.send({ code: 400, msg: "user not found" });
    }

}