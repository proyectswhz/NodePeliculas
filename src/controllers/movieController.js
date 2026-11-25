import { Movie } from "../models/movieModel.js";

// Controlador para obtener todas las películas (con filtro opcional por género)
export const obtenerPeliculas = async (req, res, next) => {
  try {
    const { genre } = req.query;
    let filter = {};

    if (genre) {
      // Filtramos en MongoDB buscando el género (ignorando mayúsculas/minúsculas)
      filter.genre = { $regex: new RegExp(`^${genre}$`, "i") };
    }

    const movies = await Movie.find(filter);
    return res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

// Obtener película por ID
export const obtenerPeliculasId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json(movie);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva película
export const crearPeliculas = async (req, res, next) => {
  try {
    const { title, genre, year, duration, director, rate, poster } = req.body;

    const newMovie = new Movie({
      title,
      genre,
      year,
      duration,
      director,
      rate: rate ?? 0,
      poster,
    });

    const savedMovie = await newMovie.save();
    return res.status(201).json(savedMovie);
  } catch (error) {
    next(error);
  }
};

// Actualizar una película existente
export const actualizarPeliculas = async (req, res, next) => {
  try {
    const { id } = req.params;

    // findByIdAndUpdate busca por ID, actualiza con el body y `{ new: true }` devuelve el documento actualizado
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json(updatedMovie);
  } catch (error) {
    next(error);
  }
};

// Borrar una película
export const borrarPelicula = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json({ message: "Movie deleted" });
  } catch (error) {
    next(error);
  }
};
