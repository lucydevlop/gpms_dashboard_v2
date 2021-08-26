import io from '@utils/io';

export function getCorpTicketClasses() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/corp/ticket/classes`);
}

export function createCorpTicketClasses(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/corp/ticket/classes`, {
    data: data
  });
}

export function updateCorpTicketClasses(data) {
  return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/corp/ticket/classes`, {
    data: data
  });
}
