------- Proyecto Final Curso Backend Avanzado III: Testing y Escalabilidad Backend -------

=== Tecnologías utilizadas ===

Node.js
Express.js
MongoDB Atlas + Mongoose
Swagger
JWT 
Dotenv 
Faker.js 
Jest + Supertest 
Docker + DockerHub 

=== Descripción ===

CRUD de Mascotas y Usuarios:
Se implementaron las rutas /api/pets y /api/users con las operaciones para la creación, lectura, actualización y eliminación.

Adopciones:
Ruta /api/adoptions que valida usuarios y mascotas, actualiza el estado de la mascota y guarda la adopción correctamente.

Middleware de Roles:
Restricción de acceso según rol (user, admin) para proteger rutas sensibles.

Swagger:
Documentación de los endpoints disponible en /api-docs, incluyendo definición de esquemas (users.yaml).

Generación de Datos Mocks:
Ruta /api/mocks para crear usuarios y mascotas falsas con Faker.js.

Testing:
Tests sobre rutas de usuarios y adopciones con Jest y Supertest.

Docker y Dockerhub:
El proyecto fue contenedorizado y subido al DockerHub.

Imagen en DockerHub: https://hub.docker.com/r/enzoduarte/adoptme-backend