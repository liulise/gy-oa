export const isDevelop = process.env.NODE_ENV === 'development';
export const BASEURL = isDevelop ? 'http://localhost:9000/' : '';
