export const parseUrlPath = (url: string) => (url.endsWith('/') ? url : `${url}/`);
