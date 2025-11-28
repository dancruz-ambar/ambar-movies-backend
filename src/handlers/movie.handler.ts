import { Request, ResponseToolkit } from '@hapi/hapi'
import { MovieModel } from '../models/movie.model';


export const createMovie = async (request: Request, h: ResponseToolkit) => {
    const movie = new MovieModel(request.payload);
    await movie.save();
    return h.response({data: movie, message: 'Movie created successfully'}).code(201);
};

export const getAllMovies = async (request: Request, h: ResponseToolkit) => {
    const movies = await MovieModel.find();
    return h.response({data: movies}).code(200);
};

export const updateMovie = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;
    const movie = await MovieModel.findByIdAndUpdate(id, request.payload as typeof MovieModel, {new: true});
    if (!movie) {
        return h.response({message: 'Movie not found'}).code(404);
    }
    return h.response({data: movie, message: 'Movie updated successfully'}).code(200);
};

export const deleteMovie = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;
    const movie = await MovieModel.findByIdAndDelete(id);
    if (!movie) {
        return h.response({message: 'Movie not found to delete'}).code(404);
    }
    return h.response({message: 'Movie deleted successfully'}).code(204);
}