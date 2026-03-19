import { Platform } from 'react-native';

const DEPLOYED_API_URL = 'pruebas-o8gn.vercel.app';

const withProtocol = (url: string) => (
  /^https?:\/\//i.test(url) ? url : `https://${url}`
);

const normalizeBaseUrl = (url: string) => withProtocol(url).replace(/\/+$/, '');

export const API_BASE_URL = normalizeBaseUrl(DEPLOYED_API_URL);
