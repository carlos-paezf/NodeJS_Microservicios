const sharp = require('sharp')
const path = require('path')
const fs = require('fs')


const getThumbnail = (req, res) => {
    let format = (req.params[0] === 'png' ? 'png' : 'jpeg')
    let width = +req.query.width || 300
    let height = +req.query.height || 200
    let border = +req.query.border || 5
    let bgcolor = req.query.bgcolor || "#fcfcfc"
    let fgcolor = req.query.fgcolor || "#ddd"
    let textcolor = req.query.textcolor || "#aaa"
    let textsize = +req.query.textsize || 24

    let image = sharp({
        create: {
            width,
            height,
            channels: 4,
            background: { r: 0, g: 0, b: 0 }
        }
    })

    const thumbnail = new Buffer.from(`
        <svg width="${width}" height="${height}">
            <rect
                x="0" y="0"
                width="${width}" height="${height}"
                fill="${fgcolor}" />
            <rect
                x="${border}" y="${border}"
                width="${width - border * 2}" height="${height - border * 2}"
                fill="${bgcolor}" />
            <line
                x1="${border * 2}" y1="${border * 2}"
                x2="${width - border * 2}" y2="${height - border * 2}"
                stroke-width="${border}" stroke="${fgcolor}" />
            <line
                x1="${width - border * 2}" y1="${border * 2}"
                x2="${border * 2}" y2="${height - border * 2}"
                stroke-width="${border}" stroke="${fgcolor}" />
            <rect
                x="${border}" y="${(height - textsize) / 2}"
                width="${width - border * 2}" height="${textsize}"
                fill="${bgcolor}" />
            <text
                x="${width / 2}" y="${height / 2}" dy="8"
                font-family="Helvetica" font-size="${textsize}"
                fill="${textcolor}" text-anchor="middle">${width} x ${height}</text>
        </svg>
    `)

    image.composite([{
        input: thumbnail,
    }]).toFormat(format).pipe(res)
}

/* const downloadImage = (req, res) => {
    let ext = path.extname(req.params.image)

    if (!ext.match(/^\.(png|jpg)$/)) return res.status(404).end()

    let fileDirectory = fs.createReadStream(path.join(__dirname, '/../uploads', req.params.image))

    fileDirectory.on('error', (error) => {
        if (error.code == 'ENOENT') {
            res.status(404)

            if (req.accepts('html')) {
                res.setHeader('Content-Type', 'text/html')

                res.write('<strong>Error:</strong> imagen no encontrada')
            }

            return res.end()
        }

        return res.status(500).end()
    })

    res.setHeader('Content-Type', 'image/' + ext.substring(1))

    fileDirectory.pipe(res)
} */

const downloadImage = (req, res) => {
    let fileDirectory = fs.createReadStream(req.localpath)

    fileDirectory.on('error', (error) => {
        res.status(error.code === 'ENOENT' ? 404 : 500).end()
    })

    res.setHeader('Content-Type', 'image/' + path.extname(req.image).substring(1))

    fileDirectory.pipe(res)
}


const downloadCustomImage = (req, res) => {
    fs.access(req.localpath, fs.constants.R_OK, (error) => {
        if (error) return res.status(404).end()

        let image = sharp(req.localpath)

        if (req.width && req.height) image.resize(req.width, req.height, {
            fit: 'fill'
        })

        if (req.width || req.height) image.resize(req.width, req.height)

        if (req.greyscale) image.greyscale()

        res.setHeader('Content-Type', 'image/' + path.extname(req.image).substring(1))

        image.pipe(res)
    })
}


module.exports = { getThumbnail, downloadImage, downloadCustomImage }