const express = require('express'),
    fs = require('fs'),
    cors = require('cors'),
    path = require('path'),
    multer = require('multer'),
    // upload = multer({ dest: './public/img/blog' }),

    login = require('./routes/login'),
    blogAdd = require('./routes/blogAdd__'),
    blogGet = require('./routes/blogGet'),
    blogEdit = require('./routes/blogEdit'),
    blogDelete = require('./routes/blogDelete'),
    userList = require('./routes/userList'),
    userAdd = require('./routes/userAdd'),
    userEdit = require('./routes/userEdit'),
    userDelete = require('./routes/userDelete'),
    categoryList = require('./routes/categoryList'),
    categoryAdd = require('./routes/categoryAdd'),
    categoryDelete = require('./routes/categoryDelete'),

    app = express();

app.use(cors())
app.use(express.json({ limit: '1024mb' }))
app.use(express.urlencoded({ limit: '1024mb', extended: true }))
app.use(express.static(path.join(__dirname, '../')))



const upload = multer({ limits: { fileSize: 1073741824, fieldSize: 1073741824 } })


app.get('/', (req, res) => {
    res.send('blog cms')
})

app.post('/login', login.login)

app.post('/blogAdd', upload.any(), blogAdd.blog)
app.post('/blogGet', blogGet.blog)
app.post('/blogEdit', upload.any(), blogEdit.blog)
app.post('/blogDelete', blogDelete.blog)

app.post('/userList', userList.user)
app.post('/userAdd', userAdd.user)
app.post('/userEdit', userEdit.user)
app.post('/userDelete', userDelete.user)

app.post('/categoryList', categoryList.category)
app.post('/categoryAdd', categoryAdd.category)
app.post('/categoryDelete', categoryDelete.category)




app.listen(4000)