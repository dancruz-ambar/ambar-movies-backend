import Joi from "joi";

export const createMovieSchema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required().uri(),
    description: Joi.string().required(),
    rating: Joi.number().required().min(0).max(10),
    year: Joi.number().required().min(1900).max(new Date().getFullYear()),
    genre: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required().min(1),
    releaseDate: Joi.date().required().min(new Date('1900-01-01')).max(new Date()),
});

// export const updateMovieSchema = Joi.object({
//     _id
// })