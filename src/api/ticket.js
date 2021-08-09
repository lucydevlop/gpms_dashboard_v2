import io from '../utils/io';

export function getParkinglotTickets(data) {
  return io.get(
    process.env.REACT_APP_API_DOMAIN_URL + '/cs/parkinglot/' + data.parkinglotId + '/tickets',
    {
      params: {
        startDate: data.startDate,
        endDate: data.endDate,
        dateType: data.dateType
      }
    }
  );
}

export function createParkinglotTicket(parkinglotId, data) {
  return io.post(
    process.env.REACT_APP_API_DOMAIN_URL + '/cs/parkinglot/' + parkinglotId + '/ticket',
    {
      data
    }
  );
}
