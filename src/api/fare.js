import io from '@utils/io';

export function getFareInfo() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/fare/info`);
}

export function createFareInfo(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/fare/info`, {
    data: data
  });
}

export function getFareBasic() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/fare/basic`);
}

export function updateFareBasic(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/fare/basic`, {
    data: data
  });
}

export function getFarePolicies() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/fare/policy`);
}
