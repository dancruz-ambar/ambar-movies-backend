import { ServerRoute } from '@hapi/hapi';
import Joi from 'joi';
import { register, login, me } from '../handlers/auth.handler';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

export const authRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/api/auth/register',
    handler: register,
    options: {
      auth: false,
      validate: {
        payload: registerSchema,
      },
      tags: ['api', 'auth'],
    },
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    handler: login,
    options: {
      auth: false,
      validate: {
        payload: loginSchema,
      },
      tags: ['api', 'auth'],
    },
  },
  {
    method: 'GET',
    path: '/api/auth/me',
    handler: me,
    options: {
      auth: 'jwt',
      tags: ['api', 'auth'],
    },
  },
];
