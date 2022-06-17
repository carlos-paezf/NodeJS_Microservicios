# Comparar App Express vs Microservicio Hydra

Las diferencias entre los archivos `micro-images/micro-images.js` y `micro-images-hydra-service/routes/micro-images-hydra-v1-routes.js` son las siguientes:

- El proyecto con Hydra tiene el modo strict
- Se usan los módulos hydra-express y fwsp-server-response, y se elimina el uso del paquete express, ya que se reemplaza con `hydraExpress.getExpress()`.
- Se añaden 2 métodos personalizados para los errores y mensajes OK.
- Dentro de los controladores para enviar los errores ahora usamos `res.sendError()`

___
| Anterior                                                                  |                        | Siguiente                                              |
| ------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------ |
| [Reconvertir la aplicación a Hydra](09_Reconvertir_aplicacion_a_Hydra.md) | [Readme](../README.md) | [Uso del framework Seneca](11_Uso_Framework_Seneca.md) |
