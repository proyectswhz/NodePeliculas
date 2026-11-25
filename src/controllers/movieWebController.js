import { Movie } from "../models/movieModel.js";

export const obtenerPeliculasWeb = async (req, res) => {
  try {
    const { genre } = req.query;
    let filter = {};

    if (genre) {
      filter.genre = { $regex: new RegExp(`^${genre}$`, "i") };
    }

    const movies = await Movie.find(filter).lean();
    return res.status(200).render("index", { movies });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .render("error", { error: "Error al obtener las películas" });
  }
};

export const obtenerPeliculaPorIdWeb = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).lean();
    if (!movie) {
      return res
        .status(404)
        .render("error", { error: "Película no encontrada" });
    }
    // Renderizar la vista movie con los datos de la película
    return res.status(200).render("detalle", { movie });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .render("error", { error: "Error al obtener la película" });
  }
};

// Crear una pelicula desde la web
export const crearPeliculaWeb = async (req, res) => {
  try {
    const { title, genre, year, duration, director, rate, poster } = req.body;

    // Validar que los campos obligatorios principales estén presentes
    if (!title || !genre || !year || !duration || !director) {
      return res.status(400).render("error", {
        error: "Todos los campos obligatorios son necesarios",
      });
    }

    // Convertir el string de géneros separados por comas en un Array de Mongoose
    let genresArray = genre;
    if (typeof genre === "string") {
      genresArray = genre
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);
    }

    // Crear la nueva instancia del modelo Movie
    const newMovie = new Movie({
      title,
      genre: genresArray,
      year: Number(year),
      duration: Number(duration),
      director,
      rate: rate ? Number(rate) : 0,
      poster: poster || "https://via.placeholder.com/300x450", // Imagen por defecto si no se incluye
    });

    // Guardar en la base de datos de MongoDB
    await newMovie.save();

    // Redirigir al listado general para ver el resultado
    return res.redirect("/movies");
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      error: "Error al crear la película en la base de datos",
    });
  }
};

export const mostrarFormularioCrear = (req, res) => {
  try {
    return res.render("crearMovie", {
      action: "/movies/nuevo",
      movie: { genre: "" },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .render("error", { error: "Error al cargar el formulario" });
  }
};
// -- Eliminar Pelicula por ID
export const borrarPeliculaWeb = async (req, res) => {
  try {
    const { id } = req.params;

    await Movie.findByIdAndDelete(id);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .render("error", { error: "Error al borrar la película" });
  }
};

// -- Mostrar formulario para EDITAR.
export const editarPeliculaWeb = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).lean();

    if (!movie) {
      return res
        .status(404)
        .render("error", { error: "Película no encontrada" });
    }
    if (Array.isArray(movie.genre)) {
      movie.genre = movie.genre.join(", ");
    } else if (typeof movie.genre !== "string") {
      movie.genre = ""; // Si viene nulo o raro, lo dejamos vacío
    }
    return res.render("crearMovie", {
      movie,
      action: `/movies/editar/${movie._id}`, // Ruta a la que enviará el formulario los datos actualizados
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .render("error", { error: "Error al cargar el formulario de edición" });
  }
};

export const actualizarPeliculaWeb = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, year, duration, director, rate, poster } = req.body;

    // Validar campos obligatorios
    if (!title || !genre || !year || !duration || !director) {
      return res.status(400).render("error", {
        error: "Todos los campos obligatorios son necesarios",
      });
    }

    let genresArray = genre;
    if (typeof genre === "string") {
      genresArray = genre
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);
    }

    // Actualizar en MongoDB
    await Movie.findByIdAndUpdate(id, {
      title,
      genre: genresArray,
      year: Number(year),
      duration: Number(duration),
      director,
      rate: rate ? Number(rate) : 0,
      poster: poster || "https://via.placeholder.com/300x450",
    });

    // Redirigir al inicio o al listado
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .render("error", { error: "Error al actualizar la película" });
  }
};
