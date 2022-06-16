const sharp = require('sharp')


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


module.exports = getThumbnail