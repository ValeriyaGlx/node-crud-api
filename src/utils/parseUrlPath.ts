import { IncomingMessage } from 'http';

export const parseUrlPath = (req: IncomingMessage) => req.url?.split('/').filter((el) => el);
