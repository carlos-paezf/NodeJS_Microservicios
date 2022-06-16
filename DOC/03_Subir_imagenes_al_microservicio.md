# Subir imágenes al microservicio

Vamos a preparar nuestro código para subir imágenes reales. Lo primero será darle la libertad al usuario de definir los valores base de la imagen, y esto lo haremos mediante valores en el query de la consulta:

```js
app.get(/\/thumbnail\.(jpg|png)/, (req, res, next) => {
    let format = (req.params[0] === 'png' ? 'png' : 'jpeg')
    let width = +req.query.width || 300
    let height = +req.query.height || 200
    let border = +req.query.border || 5
    let bgcolor = req.query.bgcolor || "#fcfcfc"
    let fgcolor = req.query.fgcolor || "#ddd"
    let textcolor = req.query.textcolor || "#aaa"
    let textsize = +req.query.textsize || 24
    ...
})
```

La idea de esta sección será permitir que el usuario pueda subir imágenes, las cuales tendremos que almacenar en algún lugar, y luego permitir descargar miniaturas en distintos tamaños, e incluso permitiendo otras modificaciones (como color, rotación, etc.).

Para todo lo anterior, vamos a crear rutas dinámicas que apuntan a un path especifico, usando verbos HTTP para distinguir las acciones:

- `POST`: para subir archivos, y el cuerpo de la petición debe tener la imagen
- `HEAD`: para comprobar si una imagen existe
- `GET`: para descargar las imágenes

Iniciamos con la subida de imágenes.

Instalamos `body-parser` para comprimir automáticamente las solicitudes antes de subirlas, y esto lo hacemos con el comando:

```txt
pnpm install body-parser -S
```

Dentro de `micro-images.js` vamos a importar los el módulo que acabamos de instalar:

```js
...
const bodyParser = require('body-parser')
```

Para tener un código más ordenado, vamos a separar en una carpeta los controladores de las rutas. Para obtener el thumbnail, tenemos el archivo `controllers/get-controller.js` con su método respectivo; para hacer la carga de imágenes tendremos el archivo `controllers/post-controller.js`

Con lo anterior, nuestro archivo `micro-images` tendrá la siguiente apariencia:

```js
const express = require('express')
const bodyParser = require('body-parser')

const getThumbnail = require('./controllers/get-controller')

const app = express()

app.get(/\/thumbnail\.(jpg|png)/, getThumbnail)

console.clear()
app.listen(3000, () => {
    console.log('Versión 1 del microservicio')
})
```

Vamos a crear el endpoint para el método post, y en está ocasión usaremos bodyParser para limitar la tamaño máximo del cuerpo de la petición, además de que tipo de media se le puede enviar:

```js
const upload = require('./controllers/post-controller')
...
app.post('/uploads/:image', bodyParser.raw({ limit: '10mb', type: 'image/*' }), upload)
...
```

Vamos a nuestro método `upload()` que se encuentra en `controllers/post-controller.js` y hacemos lo siguiente: tomamos un el valor que viene por el parámetro de la ruta, el cual es el nombre de la imagen, incluyendo la extensión, la cuál si no es ni png ni jpg no será subida a nuestro almacenamiento. Luego tomamos el tamaño del cuerpo de la petición, el cual enviaremos como parte de la respuesta. Definimos el lugar de almacenamiento de la imagen, y le asignamos la configuración de que tenga permisos para lectura y escritura, además de que sera codificado en formato binario. Escribimos la imagen y retornamos una respuesta con un estado ok y el tamaño del archivo. Es importante que creemos el directorio `uploads`

```js
const path = require('path')
const fs = require('fs')


const upload = (req, res) => {
    let image = req.params.image.toLowerCase()

    if (!image.match(/\.(png|jpg)$/)) return res.status(403).end()

    let size = req.body.length
    let fileDirectory = fs.createWriteStream(path.join(__dirname, '/../uploads', image), {
        flags: 'w+',
        encoding: 'binary'
    })

    fileDirectory.write(req.body)
    fileDirectory.end()

    fileDirectory.on('close', () => {
        return res.status(200).send({ status: 'ok', size }) 
    })
}


module.exports = upload
```

Levantamos nuestro servidor y procedemos a hacer la petición mediante `curl`, teniendo en cuenta que debemos ubicarnos el directorio de la imagen a subir. Estructuramos el comando iniciando por la petición POST, la definición del Header **Content-Type**, el contenido de la petición, y el path de nuestro microservicio:

```txt
curl -X POST -H 'Content-Type: image/png' --data-binary @thumbnail.png http://localhost:3000/uploads/prueba.png
```

Si lo queremos hacer por Postman, debemos definir en los Headers el **Content-Type** a `image/png`, luego en el Body se selecciona **Binary** y cargamos el archivo. [Documentación de endpoint para los microservicios](https://documenter.getpostman.com/view/8438809/UzBiR9k9)

___
| Anterior                                             |                        | Siguiente                      |
| ---------------------------------------------------- | ---------------------- | ------------------------------ |
| [Crear aplicación base](02_Crear_Aplicacion_Base.md) | [Readme](../README.md) | [Descarga de archivos](04_Descarga_Archivos.md) |
