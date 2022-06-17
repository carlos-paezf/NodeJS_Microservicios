# Descarga de archivos

Vamos a crear una ruta para comprar si una imagen existe en nuestro directorio `uploads`. Como se menciono en la lección pasada, vamos a usar el verbo HEAD, el cual es similar al verbo GET pero sin un cuerpo, y se usa para solicitar información de una ruta.

Dentro de `micro-images.js` creamos la ruta:

```js
...
app.head('/uploads/:image', queryUpload)
...
```

Ahora creamos un archivo llamado `controllers/head-controller.js` y añadimos el siguiente método: Preguntamos si tenemos acceso al directorio `uploads` con la dirección de la imagen que se ingresa por parámetros, además de saber tenemos acceso de lectura al archivo. En caso de error respondemos con un estatus 404, y en caso contrario un estatus 200.

```js
const fs = require('fs')
const path = require('path')


const queryUpload = (req, res) => {
    fs.access(
        path.join(__dirname, '/../uploads', req.params.image),
        fs.constants.R_OK,
        (error) => {
            res.status(error ? 404 : 200).end()
        }
    )
}

module.exports = queryUpload
```

Podemos hacer la petición mediante POSTMAN o mediante cUrl con el siguiente comando:

```txt
curl --head 'http://localhost:3000/uploads/prueba.png'
```

Como ya podemos subir archivos y saber si se encuentran dentro del servidor, ahora es el turno de poderlos descargar usando el verbo GET. Dentro de nuestro archivo `micro-images.js` añadimos una nueva ruta:

```js
const { getThumbnail, downloadImage } = require('./controllers/get-controller')
...
app.get('/uploads/:image', downloadImage)
...
```

Ahora vamos al archivo `controllers/get-controller.js` y añadimos el siguiente método: Comprobamos la extensión de la imagen, la cuál si no es .jpg o .png retornar un error 404 (no encontrado). Si la extensión es aceptable, creamos un stream a la ruta de la imagen, y luego añadimos un manejador de errores para mostrar un error 404 en caso de que el código del error sea por qué el archivo no existe, o un 500 en otros casos. Por último usamos la extensión previamente almacenada para establecer el tipo de contenido devuelto al usuario, el cual debe ser de formato `image/`, y por último pasamos el contenido del archivo a la respuesta con la ayuda del método auxiliar `pipe()` que finaliza automáticamente cuando se ha leído todo el archivo.

```js
const downloadImage = (req, res) => {
    let ext = path.extname(req.params.image)

    if (!ext.match(/^\.(png|jpg)$/)) return res.status(404).end()

    let fileDirectory = fs.createReadStream(path.join(__dirname, '/../uploads', req.params.image))

    fileDirectory.on('error', (error) => {
        if (error.code == 'ENONET') return res.status(404).end()

        return res.status(500).end()
    })

    res.setHeader('Content-Type', 'image/' + ext.substring(1))

    fileDirectory.pipe(res)
}
```

Podemos hacer la prueba de la ruta dentro de Postman o directamente en el navegador, para observar la ruta retornada. Si ingresamos por parámetro el nombre de un archivo que no existe, obtendremos un error 404, pero si queremos personalizar aún más la respuesta en caso de mostrar un error 404, podemos hacer lo siguiente: Verificar que la solicitud puede aceptar contenido html para enviarle un mensaje personalizado

```js
const downloadImage = (req, res) => {
    ...
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
    ...
}
```

___
| Anterior                                             |                        | Siguiente                      |
| ---------------------------------------------------- | ---------------------- | ------------------------------ |
| [Subir imágenes al microservicio](03_Subir_imagenes_al_microservicio.md) | [Readme](../README.md) | [Usar rutas con parámetros](05_Usar_Rutas_Parametros.md) |
