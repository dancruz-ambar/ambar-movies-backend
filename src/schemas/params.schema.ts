import Joi from "joi";

export const paramIdSchema = Joi.object({
    id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .description("ID")
    .messages({
        "string.pattern.base": "ID must be a valid MongoDB ObjectId",
    })
});

export const paginationSchema = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
});