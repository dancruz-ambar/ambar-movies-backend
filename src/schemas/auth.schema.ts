import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const registerSchema = loginSchema.append({
    name: Joi.string().required(),
});