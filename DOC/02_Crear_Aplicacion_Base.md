# Crear aplicación base

Una de las principales ventajas de los microservicios, es que pueden emplearse en múltiples aplicaciones. Vamos a crear un microservicio para subir imágenes, y para ello seguiremos estos pasos:

1. Construir la base del microservicio con `express`
2. Usaremos `sharp`, el cuál es un modulo externo para la manipulación de imágenes
3. Terminaremos de construir el microservicio usando Hydra

Lo primero será crear un directorio nuevo para nuestro proyecto, en mi caso lo llamé `micro-images`. Luego inicializamos el gestor de paquetes `package.json` con el siguiente comando:

```txt
npm init -y
```

Instalamos los paquetes necesarios para este proyecto con el comando a continuación:

```txt
pnpm i express sharp -S
```

Vamos a crear un archivo llamado `micro-images.js`, el cual será el centro de nuestra aplicación. Importamos los módulos de express y sharp, e inicializamos nuestra aplicación express:

```js
const express = require('express')
const sharp = require('sharp')


const app = express()
```

Creamos un endpoint para obtener una imagen con el uso de una expresión regular que buscará por `thumbnail.jpg` o `thumbnail.png`. Luego definimos algunos parámetros predeterminados para la miniatura, y por último creamos una imagen vacía usando sharp:

```js
...
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
})
```

Dentro de nuestra ruta vamos a crear una imagen SVG que será la miniatura predeterminada, esta cuenta con un fondo, bordes, líneas diagonales, borde de texto, y texto. Una vez terminado el SVG, la usamos para cubrir la imagen que está vacía:

```js
...
app.get(/\/thumbnail\.(jpg|png)/, (req, res, next) => {
    ...
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
```

Por último, dentro del archivo le definimos a nuestra app el puerto por el que debe escuchar:

```js
...
app.listen(3000, () => {
    console.log('Versión 1 del microservicio')
})
```

Levantamos nuestro microservicio con el siguiente comando:

```txt
node micro-images
```

Cuando vamos a la dirección `http://localhost:3000/thumbnail.jpg`, vamos a obtener la siguiente imagen:

![image](images/thumbnail.jpg)

Pero si vamos a la dirección `http://localhost:3000/thumbnail.png`, obtenemos esta imagen:

![image](images/thumbnail.png)

La imagen es la misma, pero como se le definió al controlador de la ruta, el formato va a cambiar de acuerdo al valor del parámetro que se ingresa.

___
| Anterior |                        | Siguiente                                            |
| -------- | ---------------------- | ---------------------------------------------------- |
| [Crear Microservicio con Hydra](01_Crear_Microservicio_con_Hydra.md) | [Readme](../README.md) | [Subir imágenes al microservicio](03_Subir_imagenes_al_microservicio.md) |
