import io from '../utils/io';

export function corpRegister(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/auth/user/register`, {
    data
  });
}

export function corpDelete(data) {
  return io.delete(`${process.env.REACT_APP_API_DOMAIN_URL}/corp/delete/${data}`, {
    data
  });
}

export function createTenantByFile(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/auth/user/registers`, {
    data
  });
}
