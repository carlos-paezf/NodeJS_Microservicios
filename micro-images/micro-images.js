const express = require('express')
const bodyParser = require('body-parser')

const getThumbnail = require('./controllers/get-controller')
const upload = require('./controllers/post-controller')
const morgan = require('morgan')


const app = express()

app.use(morgan('dev'))


app.get(/\/thumbnail\.(jpg|png)/, getThumbnail)

app.post('/uploads/:image', bodyParser.raw({ limit: '10mb', type: 'image/*' }), upload)


console.clear()
app.listen(3000, () => {
    console.log('Versión 1 del microservicio')
})