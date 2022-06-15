# Crear Microservicio con Hydra

**Hydra** es un paquete que facilita la construcción de distribuidas como Microservicios. Ofrece características como descubrimiento de servicios, mensajería distribuida, balanceo de carga de mensajes, logging, presencia, y monitoreo de salud de la aplicación. Para instalarla usamos el comando:

```txt
time pnpm i hydra -S
```

Hydra tiene una dependencia que no se instala mediante npm, yarn o pnpm, y se llama [Redis](https://redis.io/), un contenedor de datos estructurados en memoria, y que Hydra usa como base de datos, cache y administrador de mensajes. Para instarlo [en Windows](https://redis.io/docs/getting-started/installation/install-redis-on-windows/), instalamos una terminal de Ubuntu, en la cual ejecutamos los siguientes comandos:

```txt
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
```

```txt
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
```

```txt
sudo apt-get update
```

```txt
sudo apt-get install redis
```

Luego, desde la terminal de Ubuntu ejecutamos el siguiente comando para levantar el servidor de redis:

```txt
sudo service redis-server start
```

Con el siguiente comando conectamos el CLI de Redis:

```txt
redis-cli
```

Procedemos a instalar otros paquetes relacionados con Hydra con el siguiente comando (`yo` es el comando para el paquete Yeoman, el cual ayuda con el inicio rápido de nuevos proyectos):

```txt
npm i -g yo generator-fwsp-hydra hydra-cli
```

Una vez tengamos la anterior listo, vamos a configurar el CLI de Hydra con el siguiente comando:

```txt
hydra-cli config local
```

Llenamos los campos con los datos correspondientes:

- `redisUrl`: `127.0.0.1`
- `redisPort`: `6379`
- `redisDb`: `15`
- `redisPassword`: `` (lo podemos dejar en blanco)

Mediante Yeoman vamos a crear el scaffolding de hydra para un microservicio básico, para ello usamos el comando a continuación, y llenamos los campos necesarios:

```txt
yo fwsp-hydra
```

- `Name of the service ('-service' will be appended automatically)`: `tutorial`
- `Your full name`: `` (Se puede dejar en blanco)
- `Your email address`: `` (Se puede dejar en blanco)
- `Your organization or username (used to tag docker images)`: `` (Se puede dejar en blanco, pero se recomienda completarlo)
- `Host the service runs on?`: `` (Se puede dejar en blanco para valores por defecto)
- `Port the service runs on?`: `` (Se puede dejar en blanco para valores por defecto)
- `What does this services do?`: `` (Se puede dejar en blanco)
- `Does this service need auth?`: `No`
- `Is this a hydra-express service?`: `Yes`
- `Set up a view engine?`: `No`
- `Set up logging?`: `No`
- `Enable CORS on serverResponses`: `No`
- `Run npm install`: `No`

Una vez realizado lo anterior, se crea un folder con la siguiente estructura:

```txt
--- tutorial-service
    |--- config
        |--- config.json
        |--- sample-config.json
    |--- routes
        |--- tutorial-v1-routes.js
    |--- scripts
        |--- docker.js
    |--- specs
        |--- helpers
            |--- chai,js
        |--- test.js
    |--- .editorconfig
    |--- .eslintrc
    |--- .gitattributes
    |--- .gitignore
    |--- .nvmrc
    |--- package.json
    |--- README.md
    |--- tutorial-service.js
```

Procedemos a ejecutar los siguientes comandos dentro del directorio del proyecto:

```txt
pnpm install
```

```txt
pnpm start
```

Es importante que mantengamos abierta la consola en donde tenemos corriendo redis, puesto que nuestro proyecto se está conectando a dicho servidor.

___
| Anterior |                        | Siguiente                                            |
| -------- | ---------------------- | ---------------------------------------------------- |
|          | [Readme](../README.md) | [Crear aplicación base](02_Crear_Aplicacion_Base.md) |
