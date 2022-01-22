import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  JWT_SECRET_KEY: Joi.string().required(),
});
