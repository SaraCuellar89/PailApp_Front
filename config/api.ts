import { Platform } from 'react-native';

// Cambia esta constante cuando despliegues en Vercel:
// ejemplo: https://tu-proyecto.vercel.app
const DEPLOYED_API_URL = 'pruebas-o8gn.vercel.app';

// Ejemplo Tailscale (si quieres probar sin Vercel):
// const DEPLOYED_API_URL = 'http://100.x.y.z:4000';

const withProtocol = (url: string) => (
  /^https?:\/\//i.test(url) ? url : `https://${url}`
);

const normalizeBaseUrl = (url: string) => withProtocol(url).replace(/\/+$/, '');

export const API_BASE_URL = normalizeBaseUrl(DEPLOYED_API_URL);
