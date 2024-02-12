import 'dotenv/config';
import http from 'http';
import cluster from 'node:cluster';
import os from 'os';
import { createHttpServer } from './server';
import { isMulti, nextWorker } from './utils';
import { forwardRequest } from './utils/forwardRequest';
import { UserType } from './types';
import { updateUsersDataInMulti } from './utils/updateUsersDataInMulti';
import { Worker } from 'cluster';

const PORT = Number(process.env.PORT) || 5000;

const startApp = () => {
  const server = createHttpServer();

  if (!isMulti()) {
    server.listen(PORT, () => {
      process.stdout.write(`Server started on port: ${PORT}...`);
    });
  } else {
    server.listen(PORT, () => {
      console.log(`worker pid=${process.pid} on port: ${PORT}`);
    });
  }
};

if (!isMulti()) {
  startApp();
} else {
  if (cluster.isPrimary) {
    const cpusLength = os.cpus().length;
    console.log(`Master started. Pid: ${process.pid}`);

    const ports: number[] = [];
    const workers: Worker[] = [];
    for (let i = 0; i < cpusLength - 1; i++) {
      const workerPort = PORT + 1 + i;
      const worker = cluster.fork({ PORT: workerPort.toString() });
      ports.push(workerPort);
      workers.push(worker);
    }

    const balancer = http.createServer((req, res) => {
      const port = nextWorker(ports);
      forwardRequest(req, res, port);
    });

    balancer.listen(PORT, () => {
      process.stdout.write(`The load balancer is running on port ${PORT}...\n`);
    });

    workers.forEach((worker) => {
      worker?.on('message', (msg) => {
        if (msg.type === 'update') {
          workers.forEach((worker) => worker?.send(msg));
        }
      });
    });
  }

  if (cluster.isWorker) {
    startApp();
  }

  process.on('message', (msg) => {
    const { type } = msg as { type: string };
    if (type === 'update') {
      const { data } = msg as { data: UserType[] };
      updateUsersDataInMulti(data);
    }
  });
}
