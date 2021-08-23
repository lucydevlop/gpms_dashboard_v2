import io from '../utils/io';

export function corpRegister(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/auth/user/register`, {
    data
  });
}

export function corpUpdate(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/corp/create`, {
    data
  });
}

export function corpDelete(data) {
  return io.delete(`${process.env.REACT_APP_API_DOMAIN_URL}/corp/delete/${data}`, {
    data
  });
}
