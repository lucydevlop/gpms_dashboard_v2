import io from '@utils/io';

export function getCorpTicketClasses() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/discounts/corp-tickets`);
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

export function getAllCorpTicketsSummary(page, pageSize) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/corp-tickets`, {
    params: {
      page: page - 1,
      size: pageSize
    }
  });
}

export function addCorpTicket(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/corp-tickets`, {
    data: data
  });
}
