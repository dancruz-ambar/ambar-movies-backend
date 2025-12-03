import Hapi from '@hapi/hapi';
import { connectDB } from './config/database';
import { movieRoutes } from './routes/movie.routes';
import { authRoutes } from './routes/auth.routes';
import { registerAuth } from './config/auth';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      }
    }
  });

  await connectDB();
  await registerAuth(server);

  server.route(authRoutes);
  server.route(movieRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
}

init();