let current = 0;

export const nextWorker = (workerPorts: number[]) => {
  const isLastWorker = current === workerPorts.length - 1;
  const currWorkerPort = workerPorts[current];
  const port = currWorkerPort;

  if (isLastWorker) {
    current = 0;
  } else {
    current += 1;
  }

  return port;
};
