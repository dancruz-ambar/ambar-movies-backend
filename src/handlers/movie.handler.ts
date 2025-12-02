import { Request, ResponseToolkit } from "@hapi/hapi";
import { MovieModel } from "../models/movie.model";

export const createMovie = async (request: Request, h: ResponseToolkit) => {
  const movie = new MovieModel(request.payload);
  await movie.save();
  return h
    .response({ data: movie, message: "Movie created successfully" })
    .code(201);
};

export const getAllMovies = async (request: Request, h: ResponseToolkit) => {
  const { page, limit } = request.query;
  const skip = (page - 1) * limit;

  const [movies, total] = await Promise.all([
    MovieModel.find().skip(skip).limit(limit),
    MovieModel.countDocuments(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return h.response({
      data: movies,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    })
    .code(200);
};

export const updateMovie = async (request: Request, h: ResponseToolkit) => {
  const { id } = request.params;
  const movie = await MovieModel.findByIdAndUpdate(
    id,
    request.payload as typeof MovieModel,
    { new: true }
  );
  if (!movie) {
    return h.response({ message: "Movie not found" }).code(404);
  }
  return h
    .response({ data: movie, message: "Movie updated successfully" })
    .code(200);
};

export const deleteMovie = async (request: Request, h: ResponseToolkit) => {
  const { id } = request.params;
  
  const movie = await MovieModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!movie) {
    return h.response({ message: "Movie not found to delete" }).code(404);
  }
  return h.response({ message: "Movie deleted successfully" }).code(204);
};
