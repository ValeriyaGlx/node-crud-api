import 'dotenv/config';
import { createServer } from 'http';

const PORT = Number(process.env.PORT) || 4000;

const server = createServer(async () => {});

server.listen(PORT, () => {
  process.stdout.write(`Server started on port: ${PORT}...`);
});
