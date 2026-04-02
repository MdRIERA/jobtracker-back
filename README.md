# JobTracker Backend

Backend de la aplicación **JobTracker**, una app para gestionar ofertas de empleo y candidaturas.

## Tecnologías usadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- dotenv
- cors

## Funcionalidades

- Registro e inicio de sesión de usuarios
- Autenticación con JWT
- Gestión de ofertas de empleo
- Gestión de candidaturas
- Filtros por empresa, título y estado
- Protección de rutas privadas

## Estructura principal

```bash
src/
  controllers/
  models/
  routes/
  middleware/
  config/
  server.js
```
## Instalación

- Clonar el repositorio: git clone URL_DEL_REPOSITORIO
- Entrar en la carpeta del proyecto: cd jobtracker-back
- Instalar dependencias: npm install
- Crear un archivo .env con las variables necesarias copiando el .env.example
