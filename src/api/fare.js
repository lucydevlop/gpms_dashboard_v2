import io from '@utils/io';

export function getFareReference() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/charge/references`);
}

export function createFareInfo(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/fare/info`, {
    data: data
  });
}

export function updateFareInfo(data) {
  return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/fare/info`, {
    data: data
  });
}

export function getFareBasic() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/fare/basic`);
}

// export function updateFareBasic(data) {
//   return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/fare/basic`, {
//     data: data
//   });
// }

export function createFareBasic(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/charge/basic`, {
    data: data
  });
}

export function getFarePolicies() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/fare/policies`);
}

export function updateFarePolicy(data) {
  return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/fare/policy`, {
    data: data
  });
}

export function createFarePolicy(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/fare/policy`, {
    data: data
  });
}

export function getFares() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/fares`);
}
