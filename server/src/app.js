const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const blog_add = require('./routes/blog_add')
const blog_get = require('./routes/blog_get')
const blog_update = require('./routes/blog_update')
const blog_delete = require('./routes/blog_delete')

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('blog cms')
})

app.post('/blog_add', blog_add.add)
app.post('/blog_get', blog_get.get)
app.post('/blog_update', blog_update.update)
app.post('/blog_delete', blog_delete.delete)

app.listen(6000)