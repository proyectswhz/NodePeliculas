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
