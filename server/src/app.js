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
app.use(express.json({ limit: '1024mb' }))
app.use(express.urlencoded({ limit: '1024mb', extended: true }))

app.get('/', (req, res) => {
    res.send('blog cms')
})

app.post('/blog_add', blog_add.add)
app.post('/blog_get', blog_get.get)
app.post('/blog_update', blog_update.update)
app.post('/blog_delete', blog_delete.delete)

app.post('blogData' ,(req,res)=>{

    console.log(req.body)
    res.send({code: 200})
})

app.listen(6000)