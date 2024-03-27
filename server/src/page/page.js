const path = require('path');


exports.login = (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../public/build/login') })
}

exports.home = (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../public/build/home') })
}