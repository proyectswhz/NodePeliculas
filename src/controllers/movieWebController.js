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
      .render("error", { message: "Error al obtener las películas" });
  }
};

export const obtenerPeliculaPorIdWeb = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).lean();
    if (!movie) {
      return res
        .status(404)
        .render("error", { message: "Película no encontrada" });
    }
    return res.status(200).render("detalle", { movie });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .render("error", { message: "Error al obtener la película" });
  }
};

// Crear una pelicula desde la web
export const crearPeliculaWeb = async (req, res) => {
  try {
    const { title, genre, year, duration, director, rate, poster } = req.body;

    if (!title || !genre || !year || !duration || !director) {
      return res.status(400).render("error", {
        message: "Todos los campos obligatorios son necesarios",
      });
    }

    let genresArray = genre;
    if (typeof genre === "string") {
      genresArray = genre
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);
    }

    const newMovie = new Movie({
      title,
      genre: genresArray,
      year: Number(year),
      duration: Number(duration),
      director,
      rate: rate ? Number(rate) : 0,
      poster: poster || "https://via.placeholder.com/300x450",
    });

    await newMovie.save();

    return res.redirect("/movies");
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      message: "Error al crear la película en la base de datos",
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
      .render("error", { message: "Error al cargar el formulario" });
  }
};

// -- Eliminar Pelicula por ID
export const borrarPeliculaWeb = async (req, res) => {
  try {
    const { id } = req.params;

    await Movie.findByIdAndDelete(id);
    return res.redirect("/movies");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .render("error", { message: "Error al borrar la película" });
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
        .render("error", { message: "Película no encontrada" });
    }
    if (Array.isArray(movie.genre)) {
      movie.genre = movie.genre.join(", ");
    } else if (typeof movie.genre !== "string") {
      movie.genre = "";
    }
    return res.render("crearMovie", {
      movie,
      action: `/movies/editar/${movie._id}`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .render("error", { message: "Error al cargar el formulario de edición" });
  }
};

export const actualizarPeliculaWeb = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, year, duration, director, rate, poster } = req.body;

    if (!title || !genre || !year || !duration || !director) {
      return res.status(400).render("error", {
        message: "Todos los campos obligatorios son necesarios",
      });
    }

    let genresArray = genre;
    if (typeof genre === "string") {
      genresArray = genre
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);
    }

    await Movie.findByIdAndUpdate(id, {
      title,
      genre: genresArray,
      year: Number(year),
      duration: Number(duration),
      director,
      rate: rate ? Number(rate) : 0,
      poster: poster || "https://via.placeholder.com/300x450",
    });

    return res.redirect("/movies");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .render("error", { message: "Error al actualizar la película" });
  }
};

// -- Alternar estado de favorito
