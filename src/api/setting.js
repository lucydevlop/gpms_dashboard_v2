import io from '../utils/io';

export function getSettings() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/settings`);
}
