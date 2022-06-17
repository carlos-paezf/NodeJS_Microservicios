# Microservicios en NodeJS

[![wakatime](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/307f6dc8-e661-46af-a419-6e7282faaa30.svg)](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/307f6dc8-e661-46af-a419-6e7282faaa30)

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
- [Imágenes en escala de grises](DOC/06_Imagenes_escala_grises.md)
- [De parámetros de ruta a parámetros de consulta](DOC/07_De_parametros_de_ruta_a_parametros_de_consulta.md)
- [Completar editor de imágenes](DOC/08_Completar_editor_imagenes.md)
- [Reconvertir la aplicación a Hydra](DOC/09_Reconvertir_aplicacion_a_Hydra.md)
- [Comparar App Express vs Microservicio Hydra](DOC/10_Comprar_App_Express_vs_Microservicio_Hydra.md)
