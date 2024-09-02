# ParqueaderoTALLER API REST MONGO
0. Leer el documento del link: https://www.gyata.ai/es/rest-api/rest-api-endpoint-example
¿Qué es un endpoint?
1. Crear una api rest en Node.js y base de datos MongoDB que permita la gestión de la
información de un parqueadero.
Se debe realizar la api para la gestión de las celdas. Los datos de las celdas son:
numeroCelda, estado, placaVehiculo, fechaIngreso, fechaSalida, pin
El número de celda es un valor autoincremental, numérico y debe ser único.
El estado puede ser disponible o no disponible y al registrarse debe tener por defecto el
estado disponible.
La placaVehiculo es de tipo String de máximo 6 caracteres y debe ser opcional.
La fechaIngreso es opcional y debe contener el día/mes/año y hora. Esta fecha se captura
del sistema al momento en que se registra el ingreso.
La fechaSalida es opcional y debe contener el día/mes/año y hora. Esta fecha corresponde a
la hora de salida del vehículo y se captura del sistema al momento que sale el vehículo del
parqueadero.
El pin es opcional y de tipo string. Al momento que se registre el ingreso deberá conformarse
por la encriptación de la concatenación del número de celda con la placa del vehículo.
Crear los métodos para la gestión de la información de las celdas:
POST /celdas # Crear una nueva celda
GET /celdas/{id} # Recuperar una celda específica
GET /celdas # Recuperar una lista de todas las celdas
GET /celdas/{estado} # Recuperar una lista de todas las celdas con estado disponible.
PUT /celdas/{id} # Actualizar una celda específica
DELETE /celdas/{id} # Eliminar un celda específico
Al registrar una celda los campos requeridos son numeroCelda y estado los demás atributos
son opcionales es decir en la colección irán sin datos. El numeroCelda es autoincremental y
el estado por defecto es disponible.
Por ahora solo se pueden registrar hasta 10 celdas, en un futuro el cliente puede decidir que
sean 50 o 100 o más celdas.
Crear el método para parquear, al momento de parquear se debe asignar la placa del
vehículo a una celda disponible y cambiar de disponible a no disponible.
Crear el método para calcular el valor a pagar el cual se calcula de la siguiente manera: Si el
número de horas que el vehículo estuvo en el parqueadero es inferior a 1 se cobrará una
hora. En los demás casos el número de horas se aproxima al valor entero más cercano hacia
abajo. El valor por hora es de 5000 COP
Crear el método para salir, se debe cambiar la celda al estado disponible y la placaVehiculo,
fechaIngreso, fechaSalida, pin deben quedar vacíos con el fin de que luego pueda registrar el
parqueo de otro vehículo.
2. Subir a GIT
3. Desplegar en render u otro servidor.
