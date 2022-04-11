import * as Joi from 'joi';

export const ValidationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.string().required(),

  PUSH_PORT: Joi.string().required(),

  ADMIN_USER: Joi.string().required(),
  ADMIN_PASSWORD: Joi.string().required(),
  SECRET_KEY: Joi.string().required(),

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

  DB_CONNECTION_TIMEOUT: Joi.string().required(),

  JWT_SECRET_KEY: Joi.string().required(),

  REDIS_TEST_HOST: Joi.string().required(),
  REDIS_TEST_PORT: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),

  API_KEY: Joi.string().required(),
});
