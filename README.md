# Peliculas API

---

## Requisitos previos

- Node.js - (https://nodejs.org) - Versión 24
- pnpm (`npm install -g pnpm`)
- MongoDB - (https://www.mongodb.com/)

---

## 📦 Instalación

1. Clona el repositorio o descarga el proyecto:

```bash
git clone <url-repositorio>
cd <nombre-carpeta>
```

2. Instalar las dependencias.

```bash
pnpm install
```

---

## ⚙️ Configuración

1. Crear archivo .env
2. Añadir las siguientes variables de entorno con tus datos:

```text
PORT=3000
MONGO_URI=mongodb://localhost:27017/tu-nombre-de-base-de-datos
```

---

## 🚀 Ejecución del proyecto

- Modo desarrollo, con recarga automática.

```bash
pnpm dev
```

- Modo producción:

```bash
pnpm start
```

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura **MVC (Modelo-Vista-Controlador)** organizada dentro de la carpeta `src`:

- **`src/models/`**: Contiene los esquemas y modelos de Mongoose para la gestión y estructuración de los datos en MongoDB (esquema de películas).
- **`src/controllers/`**: Almacena la lógica de negocio; procesa las peticiones que llegan de las rutas, interactúa con la base de datos y decide qué datos enviar a las vistas.
- **`src/routes/`**: Define los endpoints y rutas de la aplicación para gestionar la navegación web del CRUD (crear, listar, editar y borrar).
- **`src/views/`**: Contiene las plantillas de **Nunjucks** (`.njk`) que componen la interfaz visual (la plantilla base, el listado, los formularios y la vista de detalle).
- **`public/`**: Almacena los recursos estáticos del proyecto, principalmente la hoja de estilos (`style.css`) y elementos visuales.
- **`src/app.js`**: Archivo principal de entrada donde se configura el servidor Express, la conexión con la base de datos y el motor de plantillas.

# NodePeliculas

Aplicación web full-stack de gestión de películas construida con **Node.js**, **Express**, **MongoDB** y **Mongoose**, orquestada mediante **Docker Compose** y publicada en **GitHub Container Registry (GHCR)**.

## Arquitectura y servicios

El proyecto se divide en dos servicios principales gestionados desde `compose.yml`:

- **`mongo`** (`ghcr.io/proyectswhz/peliculas-mongo:1.0`): imagen personalizada basada en `mongo:7.0` que incluye un script de inicialización en `/docker-entrypoint-initdb.d/` para cargar datos iniciales (`peliculas.json`) únicamente cuando el volumen de datos está vacío. Dispone de autenticación root y `healthcheck`.
- **`app`** (`ghcr.io/proyectswhz/peliculas-app:1.0`): aplicación Node.js (`node:26-alpine` con `pnpm`) que se conecta a MongoDB mediante Mongoose y expone el servidor en el puerto `3000`. Espera a que `mongo` pase el `healthcheck` (`service_healthy`) antes de arrancar.

## Requisitos previos

- [Docker](https://www.docker.com/) y **Docker Compose** (`docker compose`).
- Archivo `.env` en la raíz del proyecto (ver `.env.example`).

## Configuración de variables de entorno

Crea tu archivo `.env` a partir de `.env.example`:

```bash
cp .env.example .env
```

## Ejemplo de variables .env

```bash
PORT=3000
MONGO_USER=tu_usuario_mongo
MONGO_PASSWORD=tu_password_mongo
MONGO_URI=mongodb://tu_usuario_mongo:tu_password_mongo@mongo:27017/NodePeliculas?authSource=admin
```

## Ejecución con Docker Compose

- Levantar usando las imágenes de GHCR

```bash
docker compose pull
docker compose up -d
```

- Construir localmente y levantar

```bash
docker compose up -d --build
```

- Una vez levantado, la aplicación estará disponible en http://localhost:3000.

## Comandos útiles de operación

```bash
# Ver estado y salud de los contenedores
docker compose ps

# Ver logs en tiempo real
docker compose logs -f

# Detener y eliminar contenedores (conservando el volumen datos-mongo)
docker compose down

# Detener y eliminar contenedores Y volumen de datos (reinicia BD desde cero)
docker compose down -v
```
