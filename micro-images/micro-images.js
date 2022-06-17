const express = require('express')
const bodyParser = require('body-parser')

const { getThumbnail, /* downloadImage, */ downloadCustomImage } = require('./controllers/get-controller')
const upload = require('./controllers/post-controller')
const morgan = require('morgan')
const queryUpload = require('./controllers/head-controller')
const { validateImage, /* widthParam, heightParam, greyscaleParam */ } = require('./controllers/param-controller')


const app = express()

app.use(morgan('dev'))


app.param('image', validateImage)

/* app.param('width', widthParam)
app.param('height', heightParam)
app.param('greyscale', greyscaleParam) */


// app.get(/\/thumbnail\.(jpg|png)/, getThumbnail)

app.post('/uploads/:image', bodyParser.raw({ limit: '10mb', type: 'image/*' }), upload)

app.head('/uploads/:image', queryUpload)

// app.get('/uploads/:image', downloadImage)

/* app.get('/uploads/:width(\\d+)x:height(\\d+)-:greyscale-:image', downloadCustomImage)
app.get('/uploads/:width(\\d+)x:height(\\d+)-:image', downloadCustomImage)
app.get('/uploads/_x:height(\\d+)-:greyscale-:image', downloadCustomImage)
app.get('/uploads/_x:height(\\d+)-:image', downloadCustomImage)
app.get('/uploads/:width(\\d+)x_-:greyscale-:image', downloadCustomImage)
app.get('/uploads/:width(\\d+)x_-:image', downloadCustomImage)
app.get('/uploads/:greyscale-:image', downloadCustomImage) */
app.get('/uploads/:image', downloadCustomImage)


console.clear()
app.listen(3000, () => {
    console.log('Versión 1 del microservicio')
})