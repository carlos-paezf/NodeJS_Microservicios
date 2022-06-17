# Imágenes en escala de grises

Vamos a darle la funcionalidad a nuestra aplicación, de que pueda transformar las imágenes a escala de grises, para ello primero añadimos un `param` dentro de `micro-images.js`:

```js
...
app.param('greyscale', (req, res, next, greyscale) => {
    if (greyscale !== 'bw') return next('route')

    req.greyscale = true

    return next()
})
...
```

Podemos mover todos los callbacks de los params a funciones externas, con el fin de reducir la extensión de los archivos. Por ejemplo, si creamos funciones dentro de `controllers/param-controller.js` con los métodos respectivos de cada parámetro, podemos tener un archivo `micro-images.js` más corto:

```js
const { validateImage, widthParam, heightParam, greyscaleParam } = require('./controllers/param-controller')
...
app.param('image', validateImage)
app.param('width', widthParam)
app.param('height', heightParam)
app.param('greyscale', greyscaleParam)
...
```

Ahora, dentro de nuestro método `downloadCustomImage`, añadimos la siguiente validación:

```js
const downloadCustomImage = (req, res) => {
    fs.access(req.localpath, fs.constants.R_OK, (error) => {
        ...
        if (req.greyscale) image.greyscale()
        ...
    })
}
```

En las rutas que presentan expresiones regulares para la descarga de imágenes personalizadas, debemos ahora añadir antes de cada una, la misma expresión junto con la opción de escala de grises, de tal modo que quede de la siguiente manera:

```js
app.get('/uploads/:width(\\d+)x:height(\\d+)-:greyscale-:image', downloadCustomImage)
app.get('/uploads/:width(\\d+)x:height(\\d+)-:image', downloadCustomImage)

app.get('/uploads/_x:height(\\d+)-:greyscale-:image', downloadCustomImage)
app.get('/uploads/_x:height(\\d+)-:image', downloadCustomImage)

app.get('/uploads/:width(\\d+)x_-:greyscale-:image', downloadCustomImage)
app.get('/uploads/:width(\\d+)x_-:image', downloadCustomImage)

app.get('/uploads/:greyscale-:image', downloadCustomImage)
app.get('/uploads/:image', downloadCustomImage)
```

Ahora podemos acceder a un endpoint como `http://localhost:3000/uploads/200x200-bw-prueba.png`, para obtener la imagen de prueba pero en escala de grises.

___
| Anterior                                             |                        | Siguiente                      |
| ---------------------------------------------------- | ---------------------- | ------------------------------ |
| [Usar rutas con parámetros](05_Usar_Rutas_Parametros.md) | [Readme](../README.md) | [De parámetros de ruta a parámetros de consulta](07_De_parametros_de_ruta_a_parametros_de_consulta.md) |
