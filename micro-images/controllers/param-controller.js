const path = require('path')


const validateImage = (req, res, next, image) => {
    if (!image.match(/\.(png|jpg)$/i)) {
        return res.status(req.method === 'POST' ? 403 : 404).end()
    }

    req.image = image
    req.localpath = path.join(__dirname, '/../uploads', req.image)

    return next()
}


module.exports = { validateImage }