const express = require('express'),
    fs = require('fs'),
    cors = require('cors'),
    path = require('path'),
    multer = require('multer'),
    login = require('./routes/login'),
    blog = require('./routes/blog'),
    user = require('./routes/user'),
    category = require('./routes/category'),
    page = require('./page/page'),
    app = express();

app.use(cors())
app.use(express.json({ limit: '1024mb' }))
app.use(express.urlencoded({ limit: '1024mb', extended: true }))
app.use(express.static(path.join(__dirname, '../')))
app.use(express.static(path.join(__dirname, '../public/build/login/')))
app.use(express.static(path.join(__dirname, '../public/build/home/')))



const upload = multer({ limits: { fileSize: 1073741824, fieldSize: 1073741824 } })

// page
app.get('/', page.login);
app.get('/home', page.home);


// api
app.post('/login', login.login)

app.post('/blogAdd', upload.any(), blog.create)
app.get('/blogGet', blog.read)
app.put('/blogEdit', upload.any(), blog.update)
app.delete('/blogDelete/:id', blog.delete)

app.post('/userAdd', upload.any(), user.create)
app.get('/userList', user.read)
app.put('/userEdit', upload.any(), user.update)
app.delete('/userDelete/:id', user.delete)

app.post('/categoryAdd', category.create)
app.get('/categoryList', category.read)
app.delete('/categoryDelete/:id', category.delete)


app.get('*', page.login)

app.listen(4000)