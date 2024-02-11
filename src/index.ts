import { createHttpServer } from './server';

const startApp = () => {
  const PORT = Number(process.env.PORT) || 5000;
  const server = createHttpServer();

  server.listen(PORT, () => {
    process.stdout.write(`Server started on port: ${PORT}...`);
  });

  process.on('SIGINT', () => {
    console.log('Received SIGINT. Closing server...');
    server.close();
    process.exit();
  });
};

startApp();
