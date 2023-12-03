import joi from "joi";

export const userLoginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().min(5).required(),
});