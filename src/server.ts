import Hapi from '@hapi/hapi';
import { connectDB } from './config/database';
import { movieRoutes } from './routes/movie.routes';

// const init = async () => {
//   console.log('Start server...');  
//   await connectDB();  
//   console.log('Server ready');
// };

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
  server.route(movieRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
}

init();