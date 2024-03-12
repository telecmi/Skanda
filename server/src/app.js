const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const login = require('./routes/login');
const blogAdd = require('./routes/blogAdd')
const blogGet = require('./routes/blogGet')
const blogEdit = require('./routes/blogEdit')
const blogDelete = require('./routes/blogDelete')
const userList = require('./routes/userList')
const userAdd = require('./routes/userAdd')
const userEdit = require('./routes/userEdit')
const userDelete = require('./routes/userDelete')
const categoryList = require('./routes/categoryList')
const categoryAdd = require('./routes/categoryAdd')
const categoryDelete = require('./routes/categoryDelete')

const app = express();

app.use(cors())
app.use(express.json({ limit: '1024mb' }))
app.use(express.urlencoded({ limit: '1024mb', extended: true }))

app.get('/', (req, res) => {
    res.send('blog cms')
})

app.post('/login', login.login)

app.post('/blogAdd', blogAdd.blog)
app.post('/blogGet', blogGet.blog)
app.post('/blogEdit', blogEdit.blog)
app.post('/blogDelete', blogDelete.blog)

app.post('/userList', userList.user)
app.post('/userAdd', userAdd.user)
app.post('/userEdit', userEdit.user)
app.post('/userDelete', userDelete.user)

app.post('/categoryList', categoryList.category)
app.post('/categoryAdd', categoryAdd.category)
app.post('/categoryDelete', categoryDelete.category)




app.listen(5000)