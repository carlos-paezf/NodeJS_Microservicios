const express = require('express')
const sharp = require('sharp')


const app = express()


app.get(/\/thumbnail\.(jpg|png)/, (req, res, next) => {
    let format = (req.params[0] === 'png' ? 'png' : 'jpeg')
    let width = 300
    let height = 200
    let border = 5
    let bgcolor = "#fcfcfc"
    let fgcolor = "#ddd"
    let textcolor = "#aaa"
    let textsize = 24
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
})


console.clear()
app.listen(3000, () => {
    console.log('Versión 1 del microservicio')
})