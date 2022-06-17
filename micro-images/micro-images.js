const express = require('express')
const bodyParser = require('body-parser')

const { getThumbnail, downloadImage, downloadCustomImage } = require('./controllers/get-controller')
const upload = require('./controllers/post-controller')
const morgan = require('morgan')
const queryUpload = require('./controllers/head-controller')
const { validateImage } = require('./controllers/param-controller')


const app = express()

app.use(morgan('dev'))


app.get(/\/thumbnail\.(jpg|png)/, getThumbnail)

app.post('/uploads/:image', bodyParser.raw({ limit: '10mb', type: 'image/*' }), upload)

app.head('/uploads/:image', queryUpload)

// app.get('/uploads/:image', downloadImage)

app.param('image', validateImage)


app.param('width', (req, res, next, width) => {
    req.width = +width
    return next()
})
app.param('height', (req, res, next, height) => {
    req.height = +height
    return next()
})


app.get('/uploads/:width(\\d+)x:height(\\d+)-:image', downloadCustomImage)
app.get('/uploads/_x:height(\\d+)-:image', downloadCustomImage)
app.get('/uploads/:width(\\d+)x_-:image', downloadCustomImage)
app.get('/uploads/:image', downloadCustomImage)

console.clear()
app.listen(3000, () => {
    console.log('Versión 1 del microservicio')
})