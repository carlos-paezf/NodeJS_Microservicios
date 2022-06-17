# Uso del framework Seneca

Seneca en un framework que ayuda a crear microservicios basados en mensajes, lo que da 2 grandes ventajas:

- ***Transport Agnostic***: El transporte de los archivos o contenido está totalmente separado de la lógica del servicio, lo que le permite a la aplicación tratar con diversos tipos de transportes, en distintos lenguajes sin problemas.
- ***Pattern Matching***: Adaptación a todo tipo de patrones, puesto que los mensaje siempre son objetos JSON, y cada función indica que tipo de mensajes puede manejar a través de sus propiedades.

Vamos a crear un directorio llamado `micro-images-seneca`, inicializamos el gestor de paquetes con `npm init -y` e instalamos el paquete de Seneca con el siguiente comando:

```txt
pnpm i seneca -S
```

Como primer ejemplo vamos crear un archivo llamado `micro-images-seneca/seneca1.js`, en el que tendremos un *productor* y un *consumidor*: Lo primero es importar Seneca y crear un servicio. Luego usamos la función `add` que actúa como *productor* y coincide con un objeto que tiene la propiedad `{math: 'sum'}`, es decir, cualquier solicitud al servicio que tenga la misma propiedad `{math: 'sum'}`, pasará a ejecutar la función del productor. Esta última recibe los argumentos `msg` y `next` (respuesta que la función debe invocar cuando termine o en caso de error).

Luego tenemos la función `act` que funciona como *consumidor*, y que justamente va a consumir la función establecida en el productor. Al consumidor le pasamos un objeto con la propiedad `{math: 'sum'}` lo que hace que apunte al productor, y una lista de valores sobre la que va a operar.

```js
const seneca = require('seneca')
const service = seneca()


service.add({ math: 'sum' }, (msg, next) => {
    next(null, {
        sum: msg.values.reduce((total, value) => (total + value), 0)
    })
})

service.act({ math: 'sum', values: [1, 2, 3] }, (error, msg) => {
    if (error) return console.error(error)

    console.log('sum = %s', msg.sum)
})
```

Para ejecutar el código, usamos el siguiente comando:

```txt
node seneca1.js
```

La salida de la ejecución anterior será como la siguiente:

```txt
{"kind":"plugin","case":"READY","name":"transport","level":300,"isot":"2022-06-17T22:42:56.198Z","when":1655505776198,"level_name":"info","seneca_id":"p6onblozqip3/1
655505776102/22112/3.28.0/-","seneca_did":"wbt3","plugin_name":"transport"}
sum = 6
{"kind":"notice","data":"hello p6onblozqip3/1655505776102/22112/3.28.0/-","level":300,"isot":"2022-06-17T22:42:56.298Z","when":1655505776298,"level_name":"info","sen
eca_id":"p6onblozqip3/1655505776102/22112/3.28.0/-"}
```

Veamos otro ejemplo en el archivo `micro-images-seneca/seneca2.js`, en el que incluimos varias funciones productor, y el consumidor lo podemos llevar a cabo mediante cUrl o Seneca, gracias a su sistema de transporte agnóstico, o lo podemos hacer directamente en el navegador.

Empezamos cargando Seneca y creando una instancia para nuestro servicio (para el cual le informamos que no queremos ningún registro). También creamos una variable que tendrá un pila de datos como un array. Luego tenemos 3 productores. El primer productor se encarga de agregar un elemento a la pila, el segundo productor elimina el último elemento de la pila, y el tercer productor nos permite ver los elementos que se encuentran en la pila. Al final iniciamos el servidor, el cual ya está predeterminado en http.

Lo diferente es el modo en el que recibe el patrón el primer productor, puesto que está recibiendo un string y no un objeto como el caso anterior, y en el que le decimos que puede recibir cualquier tipo de valor en la propiedad `value`:

```js
const seneca = require('seneca')
const service = seneca({ log: 'silent' })
const stack = []


service.add('stack:push,value:*', (msg, next) => {
    stack.push(msg.value)
    next(null, stack)
})

service.add('stack:pop', (msg, next) => {
    stack.pop()
    next(null, stack)
})

service.add('stack:get', (msg, next) => {
    next(null, stack)
})


service.listen(3000)
```

Para probar nuestro servicios, levantamos el archivo con `node seneca2.js` y usamos los siguientes endpoints:

- `http://localhost:3000/act?stack=get`
- `http://localhost:3000/act?stack=push&value=uno`
- `http://localhost:3000/act?stack=pop`

___
| Anterior                                                                                        |                        | Siguiente                                                          |
| ----------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------ |
| [Comparar App Express vs Microservicio Hydra](10_Comprar_App_Express_vs_Microservicio_Hydra.md) | [Readme](../README.md) | [Crear Microservicio con NodeJS](12_Crear_Microservicio_NodeJS.md) |
