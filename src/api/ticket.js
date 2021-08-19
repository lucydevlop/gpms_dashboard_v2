import io from '../utils/io';
import moment from 'moment';
/**
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
*/
export function createParkinglotTicket(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/dashboard/admin/product/ticket/add', {
    data
  });
}

export function getParkinglotTickets(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/dashboard/admin/product/ticket/list', {
    data
  });
}

export function getCorpList(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/corp/list', {
    data
  });
}

export function deleteTikcet(data) {
  return io.delete(`${process.env.REACT_APP_API_DOMAIN_URL}/product/ticket/delete/${data}`, data);
}

export function createTicketByFile(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/product/ticket/adds`, {
    data
  });
}
