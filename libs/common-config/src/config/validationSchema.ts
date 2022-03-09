import * as Joi from 'joi';

export const ValidationSchema = Joi.object({
  PORT: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  LOGGING: Joi.string().required(),
  SYNCHRONIZE: Joi.string().required(),

  DB_TEST_HOST: Joi.string().required(),
  DB_TEST_PORT: Joi.string().required(),
  DB_TEST_NAME: Joi.string().required(),
  DB_TEST_USERNAME: Joi.string().required(),
  DB_TEST_PASSWORD: Joi.string().required(),
  TEST_LOGGING: Joi.string().required(),
  TEST_SYNCHRONIZE: Joi.string().required(),

  JWT_SECRET_KEY: Joi.string().required(),
});
