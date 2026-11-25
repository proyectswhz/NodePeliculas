import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/database.js";
import nunjucks from "nunjucks";
import moviesRoutes from "./routes/movieRoutes.js";
import movieWebRoutes from "./routes/movieWebRoutes.js";
import { Movie } from "./models/movieModel.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Obtener __dirname en Módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔍 Como app.js y views están ambos dentro de "src", apuntamos directamente aquí:
nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
  noCache: true,
});
app.use(express.static(path.join(__dirname, "../public")));

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "njk");

// Ruta raíz (/) que renderiza el index.njk con las películas
app.get("/", async (req, res) => {
  try {
    // 1. Buscamos todas las películas en la base de datos de MongoDB
    const movies = await Movie.find().lean();

    // 2. Renderizamos 'index.njk' pasándole el array de películas
    return res.render("index", { movies });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .render("error", { error: "Error al cargar las películas en el inicio" });
  }
});

// Rutas de la API json
app.use("/api/movies", moviesRoutes);
// Rutas para la web
app.use("/movies", movieWebRoutes);

// Arranque del servidor
const iniciarServidor = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
      console.log(`👉 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor: ", error);
    process.exit(1);
  }
};

iniciarServidor();
