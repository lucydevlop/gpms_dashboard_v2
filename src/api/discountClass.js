import io from '@utils/io';

export function getDiscountClasses() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/discount/classes`);
}
