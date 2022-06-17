const fs = require('fs')
const path = require('path')
const sharp = require('sharp')


const downloadCustomImage = (req, res) => {
    fs.access(req.localpath, fs.constants.R_OK, (error) => {
        if (error) return res.status(404).end()

        let image = sharp(req.localpath)
        let width = +req.query.width
        let height = +req.query.height
        let blur = +req.query.blur
        let sharpen = +req.query.sharpen
        let greyscale = ['y', 'yes', '1', 'on'].includes(req.query.greyscale)
        let flip = ['y', 'yes', '1', 'on'].includes(req.query.flip)
        let flop = ['y', 'yes', '1', 'on'].includes(req.query.flop)

        if (width && height) image.resize(width, height, { fit: 'fill' })

        if (width || height) image.resize(width || null, height || null)

        if (flip) image.flip()
        if (flop) image.flop()
        if (blur > 0) image.blur(blur)
        if (sharpen > 0) image.sharpen(sharpen)
        if (greyscale) image.greyscale()

        res.setHeader('Content-Type', 'image/' + path.extname(req.image).substring(1))

        image.pipe(res)
    })
}


module.exports = { downloadCustomImage }