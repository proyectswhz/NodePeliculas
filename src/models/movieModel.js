import { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    genre: { type: [String], required: true },
    year: {
      type: Number,
      required: true,
      min: 1888,
      max: new Date().getFullYear(),
    },
    duration: { type: Number, required: true, min: 1 },
    director: { type: String, required: true, trim: true },
    rate: { type: Number, default: 0, min: 0, max: 10 },
    poster: {
      type: String,
      required: true,
      match: /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/i,
    },
    favorite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Movie = model("Movie", movieSchema);
