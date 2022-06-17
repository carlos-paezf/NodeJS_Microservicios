# Usar rutas con parámetros

Vamos a usar un método llamado `param()`, el cual asigna el parámetro dado a los callbacks que se asignen a la ruta. En este caso queremos que el parámetro `image` se le pueda asignar como argumento al método `validateImage`:

```js
const { validateImage } = require('./controllers/param-controller')
...
app.param('image', validateImage)
```

El método `validateImage` dentro del archivo `controllers/param-controller.js`, tendrá la funcionalidad de comprobar si el nombre coincide con imágenes .png o .jpg, si no es así, entonces replicamos un código de error 403 para peticiones POST o 404 para las demás peticiones. Si todo es aceptable, entonces almacenamos la imagen y el path de localización dentro del la petición. Al estar usando el método `next()` significa que estamos aplicando la funcionalidad de un middleware.

```js
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
```

Si miramos nuestro controladores, en muchas partes tenemos validaciones de extensión repetidas. vamos a hacer algunos cambios. Por ejemplo, para la ruta de carga de archivos, modificaremos el controlador de la siguiente manera: Eliminamos la validación de la imagen, y ahora simplificamos la ruta donde se encuentra la imagen localmente.

```js
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
```

Ahora dentro del controlador para verificar la existencia de una imagen dentro del servidor, haremos esta optimización: Hacemos que el path donde se encuentra el archivo solicitado, sea el que se ha almacenado dentro de la petición.

```js
const queryUpload = (req, res) => {
    fs.access(
        req.localpath,
        fs.constants.R_OK,
        (error) => {
            res.status(error ? 404 : 200).end()
        }
    )
}
```

Para el método de descarga de imagen hacemos el siguiente cambio: Eliminamos la validación del archivo y eliminamos el error 404 personalizado.

```js
const downloadImage = (req, res) => {
    let fileDirectory = fs.createReadStream(req.localpath)

    fileDirectory.on('error', (error) => {
        res.status(error.code === 'ENOENT' ? 404 : 500).end()
    })

    res.setHeader('Content-Type', 'image/' + path.extname(req.image).substring(1))

    fileDirectory.pipe(res)
}
```

Ahora vamos a añadir 2 parámetros más con sus validadores, para el ancho y el alto. Nos vamos a encargar de que los parámetros que se reciban persistan en la petición:

```js
app.param('width', (req, res, next, width) => {
    req.width = +width
    return next()
})
app.param('height', (req, res, next, height) => {
    req.height = +height
    return next()
})
```

Vamos a crear un nuevo controlador para la descarga de la imagen a partir de los parámetros de ancho y alto, para ello vamos `controllers/get-controller.js` y añadimos la siguiente función: Comprobamos que la función existe para iniciar el procesamiento de la imagen. Si recibimos el alto y el ancho, ignoramos el aspect ratio de la imagen, si solo recibimos el alto o el ancho, redimensinamos con esos valores. Por último enviamos la imagen al usuario.

```js
const downloadCustomImage = (req, res) => {
    fs.access(req.localpath, fs.constants.R_OK, (error) => {
        if (error) return res.status(404).end()

        let image = sharp(req.localpath)

        if (req.width && req.height) image.resize(req.width, req.height, {
            fit: 'fill'
        })

        if (req.width || req.height) image.resize(req.width, req.height)

        res.setHeader('Content-Type', 'image/' + path.extname(req.image).substring(1))

        image.pipe(res)
    })
}
```

Ahora, dentro de `micro-images.js` creamos las siguientes rutas para tener variantes de descarga: La primera nos permite descargar la imagen con el alto y ancho que indiquemos, la segunda nos permite personalizar la imagen cambiando solo el alto, la tercera nos permite descargar la imagen solo cambiando el ancho, y la última nos permite descargar la imagen con sus dimensiones originales. Es importante que estén definidos en este orden, puesto que los parámetros de las rutas están basado en expresiones regulares y se pueden solapar unas a otras, por ello definimos de mayor a menor complejidad.

```js
app.get('/uploads/:width(\\d+)x:height(\\d+)-:image', downloadCustomImage)
app.get('/uploads/_x:height(\\d+)-:image', downloadCustomImage)
app.get('/uploads/:width(\\d+)x_-:image', downloadCustomImage)
app.get('/uploads/:image', downloadCustomImage)
```

Ahora tenemos podemos por ejemplo llamar las siguientes rutas desde el navegador o desde Postman:

- `http://localhost:3000/uploads/400x200-prueba.png`
- `http://localhost:3000/uploads/_x200-prueba.png`
- `http://localhost:3000/uploads/400x_-prueba.png`
- `http://localhost:3000/uploads/prueba.png`

___
| Anterior                                             |                        | Siguiente                      |
| ---------------------------------------------------- | ---------------------- | ------------------------------ |
| [Descarga de archivos](04_Descarga_Archivos.md) | [Readme](../README.md) | [Imágenes en escala de grises](06_Imagenes_escala_grises.md) |
