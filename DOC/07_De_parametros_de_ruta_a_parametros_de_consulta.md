# De parámetros de ruta a parámetros de consulta

Como estamos viendo, nuestro archivo `micro-images.js` se está extendiendo mucho debido a las rutas con parámetros, a pesar de que estamos tratando de extraer los controladores en archivos separados. Una manera de no tener que estar definiendo tantos endpoint con variaciones de parámetros de ruta, es usando los parámetros de consulta, es decir, en vez de usar `req.params` usaremos `req.query`.

Vamos a modificar el método `downloadCustomImage` a esta nueva versión:

```js
const downloadCustomImage = (req, res) => {
    fs.access(req.localpath, fs.constants.R_OK, (error) => {
        if (error) return res.status(404).end()

        let image = sharp(req.localpath)
        let width = +req.query.width
        let height = +req.query.height
        let greyscale = ['y', 'yes', '1', 'on'].includes(req.query.greyscale)

        if (width && height) image.resize(width, height, { fit: 'fill' })

        if (width || height) image.resize(width || null, height || null)

        if (greyscale) image.greyscale()

        res.setHeader('Content-Type', 'image/' + path.extname(req.image).substring(1))

        image.pipe(res)
    })
}
```

Con el cambio anterior, podemos eliminar los 3 parámetros de ruta `width`, `height` y `greyscale` del archivo `micro-images.js`. Igualmente, podemos eliminar todas las rutas para la descarga de imágenes con expresiones regulares, y tan solo quedarnos con la última ruta. Con los cambios anteriores, tendríamos un archivo `micro-images.js` con solo este contenido:

```js
const express = require('express')
const bodyParser = require('body-parser')

const upload = require('./controllers/post-controller')
const queryUpload = require('./controllers/head-controller')
const { getThumbnail, downloadCustomImage } = require('./controllers/get-controller')
const { validateImage } = require('./controllers/param-controller')

const app = express()

app.param('image', validateImage)

app.post('/uploads/:image', bodyParser.raw({ limit: '10mb', type: 'image/*' }), upload)

app.head('/uploads/:image', queryUpload)

app.get('/uploads/:image', downloadCustomImage)

console.clear()
app.listen(3000, () => {
    console.log('Versión 1 del microservicio')
})
```

Ahora podemos pasar de tener una ruta así:

```txt
http://localhost:3000/uploads/200x200-bw-prueba.png
```

A tener una ruta así:

```txt
http://localhost:3000/uploads/prueba.png?height=400&width=500&greyscale=yes
```

Los parámetros de la consulta son dinámicos, más claros, y nos dan la ventaja de que nuestro código es más pequeño y entendible.

___
| Anterior                                             |                        | Siguiente                      |
| ---------------------------------------------------- | ---------------------- | ------------------------------ |
| [Imágenes en escala de grises](06_Imagenes_escala_grises.md) | [Readme](../README.md) | [Completar editor de imágenes](08_Completar_editor_imagenes.md) |
