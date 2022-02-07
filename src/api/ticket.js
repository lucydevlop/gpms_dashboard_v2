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

export function updateSeasonTicket(data) {
  return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/season-tickets/${data.sn}`, {
    data
  });
}

export function createSeasonTicket(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/season-tickets/`, {
    data
  });
}

export function deleteSeasonTicket(data) {
  return io.delete(`${process.env.REACT_APP_API_DOMAIN_URL}/season-tickets/${data.sn}`, {
    data: data
  });
}

export function createSeasonTickets(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/tickets/seasons', {
    data
  });
}

export function updateFreeTicket(data) {
  return io.put(process.env.REACT_APP_API_DOMAIN_URL + '/tickets/free', {
    data
  });
}

export function createFreeTicket(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/tickets/free', {
    data
  });
}

export function createFreeTickets(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/tickets/frees', {
    data
  });
}

export function updateVisitTicket(data) {
  return io.put(process.env.REACT_APP_API_DOMAIN_URL + '/season-tickets', {
    data
  });
}

export function createVisitTicket(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/season-tickets', {
    data
  });
}

export function createVisitTickets(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/tickets/visits', {
    data
  });
}

export function getParkinglotTickets(data) {
  return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/season-tickets', {
    params: {
      fromDate: data.fromDate,
      toDate: data.toDate,
      delYn: data.delYn,
      searchDateLabel: data.searchDateLabel,
      ticketType: data.ticketType,
      searchLabel: data.searchLabel,
      searchText: data.searchText,
      corpName: data.corpName
    }
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
