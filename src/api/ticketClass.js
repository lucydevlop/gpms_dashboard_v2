import io from '@utils/io';

export function getTicketClasses() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/ticket/classes`);
}

export function createTicketClasses(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/ticket/classes`, {
    data: data
  });
}

export function updateTicketClasses(data) {
  return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/ticket/classes`, {
    data: data
  });
}
