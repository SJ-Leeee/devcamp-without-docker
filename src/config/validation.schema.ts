import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  // ENV
  ENV: Joi.string().valid('local', 'dev', 'prod').required(),
  PORT: Joi.number().required(),

  // AUTH
  JWT_SECRET: Joi.string().required(),

  // DB
  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.number().required(),
  MYSQL_USERNAME: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
});
