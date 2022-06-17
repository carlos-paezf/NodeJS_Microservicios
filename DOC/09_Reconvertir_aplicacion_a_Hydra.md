# Reconvertir la aplicación a Hydra

Vamos a convertir nuestra aplicación con Hydra. Recordemos que podemos generar un scaffolding para un proyecto de microservicio con hydra, y lo hacemos con el siguiente comando (Podemos recodar el tema con la lección 1: [Crear Microservicio con Hydra](01_Crear_Microservicio_con_Hydra.md)):

```txt
yo fwsp-hydra
```

Para esta aplicación vamos a dejar los siguientes datos:

```txt
? Name of the service (`-service` will be appended automatically) micro-images-hydra
? Your full name? carlos-paezf
? Your email address?
? Your organization or username? (used to tag docker images) carlos-paezf
? Host the service runs on?
? Port the service runs on? 3000
? What does this service do? Manipulación de imágenes y descarga de miniaturas
? Does this service need auth? No
? Is this a hydra-express service? Yes
? Set up a view engine? No
? Set up logging? No
? Enable CORS on serverResponses? No
? Run npm install? No
```

Ahora, vamos al directorio que se generó (`micro-images-hydra-service`), y ejecutamos el comando para instalar las dependencias:

```txt
pnpm install
```

Para poder usar Hydra, es importante tener el servidor de Redis activo, para ello usamos el siguiente comando en una consola de Linux en Windows, como Ubuntu 22.04 LTS :

```txt
sudo service redis-server start
```

Es momento de levantar nuestro nuevo proyecto de Hydra con el siguiente comando:

```txt
pnpm start
```

Si vamos a la dirección `http://localhost:3000`, observaremos un mensaje que nos dice `{"code":404}`, lo cual para este momento, esta bien. Pero si vamos a esta ruta `http://localhost:3000/v1/micro-images-hydra`, veremos un mensaje de bienvenida:

```json
{
    "statusCode": 200,
    "statusMessage": "OK",
    "statusDescription": "Request succeeded without error",
    "result": {
        "greeting": "Welcome to Hydra Express!"
    }
}
```

Es importante que ahora instalemos los paquetes de sharp y body-parser con el siguiente comando:

```txt
pnpm i sharp body-parser -S
```

Podemos instalar nodemon para reiniciar el servidor mientras estamos en desarrollo:

```txt
pnpm i nodemon -D 
```

En caso de haber instalado nodemon, entonces añadimos un nuevo script dentro de `package.json` para el modo desarrollo:

```json
{
    "scripts": {
        ...,
        "start:dev": "nodemon micro-images-hydra-service.js",
        ...
    },
}
```

Ahora podemos levantar el servidor en modo desarrollo, con el siguiente comando:

```txt
pnpm run start:dev
```

Es tiempo de añadir nuestra aplicación anterior a este nuevo proyecto, para ello vamos a `micro-images-hydra-service/routes/micro-images-hydra-v1-routes.js`, y podemos el siguiente código:

```js
/**
 * @name micro-images-hydra-v1-api
 * @description This module packages the Micro-images-hydra API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');

const bodyParser = require('body-parser');
const { downloadCustomImage } = require('../controllers/get-controller');
const { queryUpload } = require('../controllers/head-controller');
const { upload } = require('../controllers/post-controller');
const { validateImage } = require('../controllers/param-controller');



let serverResponse = new ServerResponse();
express.response.sendError = function (err) {
    serverResponse.sendServerError(this, { result: { error: err } });
};
express.response.sendOk = function (result) {
    serverResponse.sendOk(this, { result });
};


let api = express.Router();


api.get('/', (req, res) => {
    res.sendOk({ greeting: 'Welcome to Hydra Express!' });
});


api.param('image', validateImage)

api.post('/uploads/:image', bodyParser.raw({ limit: '10mb', type: 'image/*' }), upload)
api.head('/uploads/:image', queryUpload)
api.get('/uploads/:image', downloadCustomImage)


module.exports = api;
```

Creamos la carpeta de controladores, y añadimos los mismos métodos de nuestro proyecto anterior. No olvidemos crear la carpeta `uploads`.

Si todo va bien, podemos usar la ruta a continuación, y se debe mostrar la imagen con los valores ingresados en la query:

```txt
http://localhost:3000/v1/micro-images-hydra/uploads/prueba2.png?width=400&height=300&flip=yes&flop=yes&blur=5&sharpen=500&greyscale=1
```

![prueba2](images/prueba2.png)

___
| Anterior                                                        |                        | Siguiente                                                                                       |
| --------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------- |
| [Completar editor de imágenes](08_Completar_editor_imagenes.md) | [Readme](../README.md) | [Comparar App Express vs Microservicio Hydra](10_Comprar_App_Express_vs_Microservicio_Hydra.md) |
