import Joi from "joi";

export const createMovieSchema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    rating: Joi.number().required(),
    year: Joi.number().required(),
    genre: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    releaseDate: Joi.date().required(),
});

// export const updateMovieSchema = Joi.object({
//     _id
// })