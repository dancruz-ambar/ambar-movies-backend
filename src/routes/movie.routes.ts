import { ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { createMovieSchema } from "../schemas/movie.schema";
import {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
} from "../handlers/movie.handler";
import { paramIdSchema, paginationSchema } from "../schemas/params.schema";

export const movieRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/movies",
    handler: createMovie,
    options: {
      auth: 'jwt',
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
    options: {
      auth: 'jwt',
      validate: {
        query: paginationSchema,
      },
      tags: ["api", "movies"],
    },
  },
  {
    method: "PUT",
    path: "/api/movies/{id}",
    handler: updateMovie,
    options: {
      auth: 'jwt',
      validate: {
        params: paramIdSchema,
        payload: createMovieSchema,
        failAction: (request, h, err: any) => {
          console.log("ERROR IN ROUTE PUT");
          console.log(err);
          return h.response({ message: err.message }).code(400);
        },
      },
      tags: ["api", "movies"],
    },
  },
  {
    method: "DELETE",
    path: "/api/movies/{id}",
    handler: deleteMovie,
    options: {
      auth: 'jwt',
      validate: {
        params: paramIdSchema,
        failAction: (request, h, err: any) => {
          console.log("ERROR IN ROUTE DELETE");
          console.log(err);
          return h.response({ message: err.message }).code(400);
        },
      },
      tags: ["api", "movies"],
    }
  },
  {
    method: "GET",
    path: "/api/movies/status",
    handler: function (request: Request, h: ResponseToolkit) {
      return h.response({ message: "Movies API is running" }).code(200);
    },
    options: {
      tags: ["api", "movies"],
    }
  },
];
