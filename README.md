# Microservicios en NodeJS

[![wakatime](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/d859bfb2-ec14-43ba-b903-d335c7741dd7.svg?style=for-the-badge)](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/d859bfb2-ec14-43ba-b903-d335c7741dd7)

## ¿Que es Node.js?

Es un entorno que permite ejecutar JavaScript en el servidor de manera asíncrona, con una arquitectura orientada a eventos, basado en el motor V8 de Google.

## Entorno de trabajo

- Instalador de Node.js: [Node.js](https://nodejs.org/es/)
  
  > Verificar versión de Node.js: Ejecutamos el comando `node -v`. También podemos ver la versión de *npm* (Node Package Manager) con el comando `npm -v`

- Herramienta (Editor de código): [Visual Studio Code](https://code.visualstudio.com/) o [VS Code Insiders](https://code.visualstudio.com/insiders/)
- Terminal: [Git Bash](https://git-scm.com/downloads)

Durante este proyecto estaré usando [PNpm](https://pnpm.io/es/) para instalar los paquetes que se requieran. Como prueba (luego lo eliminamos), añadiremos `express` a nuestro sitio de trabajo con el siguiente comando (`time` es un comando especial de Unix, y se utiliza para saber la duración de ejecución de un determinado comando; hago uso de en en Windows mediante Git Bash):

```txt
time pnpm i express -S 
```

## Documentación

- [Crear Microservicio con Hydra](DOC/01_Crear_Microservicio_con_Hydra.md)
- [Crear aplicación base](DOC/02_Crear_Aplicacion_Base.md)
- [Subir imágenes al microservicio](DOC/03_Subir_imagenes_al_microservicio.md)
- [Descarga de archivos](DOC/04_Descarga_Archivos.md)
- [Usar rutas con parámetros](DOC/05_Usar_Rutas_Parametros.md)
