import io from '@utils/io';

export function getCorpAbleTickets(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/corp/discount/apply/ticket`, {
    data: data
  });
}

export function deleteCorpTicket(data) {
  return io.delete(
    `${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/parking/discount/cancel/ticket/${data}`,
    data
  );
}
