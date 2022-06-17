const path = require('path')
const fs = require('fs')


/* const upload = (req, res) => {
    let image = req.params.image.toLowerCase()

    if (!image.match(/\.(png|jpg)$/)) return res.status(403).end()

    let size = req.body.length
    let fileDirectory = fs.createWriteStream(path.join(__dirname, '/../uploads', image), {
        flags: 'w+',
        encoding: 'binary'
    })

    fileDirectory.write(req.body)
    fileDirectory.end()

    fileDirectory.on('close', () => {
        return res.status(200).send({ status: 'ok', size }) 
    })
} */


const upload = (req, res) => {
    let fileDirectory = fs.createWriteStream(req.localpath, {
        flags: 'w+',
        encoding: 'binary'
    })

    fileDirectory.end(req.body)

    fileDirectory.on('close', () => {
        return res.status(200).send({ status: 'ok', size: req.body.length }) 
    })
}


module.exports = upload