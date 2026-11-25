import { Router } from "express";
import {
  obtenerPeliculasWeb,
  obtenerPeliculaPorIdWeb,
  mostrarFormularioCrear,
  crearPeliculaWeb,
  borrarPeliculaWeb,
  editarPeliculaWeb,
  actualizarPeliculaWeb,
} from "../controllers/movieWebController.js";

const router = Router();

router.get("/", obtenerPeliculasWeb);
router.get("/nuevo", mostrarFormularioCrear);
router.get("/:id", obtenerPeliculaPorIdWeb);

router.post("/nuevo", crearPeliculaWeb);
router.post("/eliminar/:id", borrarPeliculaWeb);

// Editar
router.get("/editar/:id", editarPeliculaWeb);
router.post("/editar/:id", actualizarPeliculaWeb);

export default router;
