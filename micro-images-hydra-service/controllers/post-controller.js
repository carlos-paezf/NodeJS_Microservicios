const fs = require('fs')


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


module.exports = { upload }