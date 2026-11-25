// Enrutador de express
import { Router } from "express";
import {
  obtenerPeliculas,
  obtenerPeliculasId,
  crearPeliculas,
  actualizarPeliculas,
  borrarPelicula,
} from "../controllers/movieController.js";
const router = Router();

// EndPoints de movies
router.get("/", obtenerPeliculas);
router.get("/:id", obtenerPeliculasId);
router.post("/", crearPeliculas);
router.patch("/:id", actualizarPeliculas);
router.delete("/:id", borrarPelicula);

export default router;
