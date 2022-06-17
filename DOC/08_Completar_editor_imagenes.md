# Completar editor de imágenes

Vamos a añadir las funcionalidades de girar la imagen verticalmente (`flip`), girar horizontalmente (`flop`), añadir `blur` y `sharpen`. De nuevo vamos a modificar el método `downloadCustomImage()` para las funciones que acabamos de mencionar:

```js
const downloadCustomImage = (req, res) => {
    fs.access(req.localpath, fs.constants.R_OK, (error) => {
        ...
        let blur = +req.query.blur
        let sharpen = +req.query.sharpen
        ...
        let flip = ['y', 'yes', '1', 'on'].includes(req.query.flip)
        let flop = ['y', 'yes', '1', 'on'].includes(req.query.flop)
        ...
        if (flip) image.flip()
        if (flop) image.flop()
        if (blur > 0) image.blur(blur)
        if (sharpen > 0) image.sharpen(sharpen)
        ...
    })
}
```

Ahora, podemos acceder a la siguiente ruta con todas las funcionalidades:

```txt
http://localhost:3000/uploads/prueba.png?width=400&height=300&flip=yes&flop=yes&blur=5&sharpen=500
```

___
| Anterior                                             |                        | Siguiente                      |
| ---------------------------------------------------- | ---------------------- | ------------------------------ |
| [De parámetros de ruta a parámetros de consulta](07_De_parametros_de_ruta_a_parametros_de_consulta.md) | [Readme](../README.md) | [Reconvertir la aplicación a Hydra](09_Reconvertir_aplicacion_a_Hydra.md) |
