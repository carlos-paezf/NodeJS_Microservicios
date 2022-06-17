const path = require('path')


const validateImage = (req, res, next, image) => {
    if (!image.match(/\.(png|jpg)$/i)) {
        return res.status(req.method === 'POST' ? 403 : 404).end()
    }

    req.image = image
    req.localpath = path.join(__dirname, '/../uploads', req.image)

    return next()
}


const widthParam = (req, res, next, width) => {
    req.width = +width
    return next()
}


const heightParam = (req, res, next, height) => {
    req.height = +height
    return next()
}


const greyscaleParam = (req, res, next, greyscale) => {
    if (greyscale !== 'bw') return next('route')

    req.greyscale = true

    return next()
}


module.exports = { validateImage, widthParam, heightParam, greyscaleParam }