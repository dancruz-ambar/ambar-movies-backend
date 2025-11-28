import { ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { createMovieSchema } from "../schemas/movie.schema";
import {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
} from "../handlers/movie.handler";

export const movieRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/movie",
    handler: createMovie,
    options: {
      validate: {
        payload: createMovieSchema,
        failAction: (request, h, err: any) => {
          console.log("ERROR IN ROUTE POST");
          console.log(err);
          return h.response({ message: err.message }).code(400);
        },
      },
      tags: ["api", "movies"],
    },
  },
  {
    method: "GET",
    path: "/api/movies",
    handler: getAllMovies,
  },
  {
    method: "PUT",
    path: "/api/movies/{id}",
    handler: updateMovie,
    options: {
      validate: {
        payload: createMovieSchema,
        failAction: (request, h, err: any) => {
          console.log("ERROR IN ROUTE PUT");
          console.log(err);
          return h.response({ message: err.message }).code(400);
        },
      },
    },
  },
  {
    method: "DELETE",
    path: "/api/movies/{id}",
    handler: deleteMovie,
  },
  {
    method: "GET",
    path: "/api/movies/status",
    handler: function (request: Request, h: ResponseToolkit) {
      return h.response({ message: "Movies API is running" }).code(200);
    },
  },
];
