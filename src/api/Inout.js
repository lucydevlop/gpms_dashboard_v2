import io from '@utils/io';
import moment from 'moment';

export function getInouts(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/inout/list`, {
    data: {
      searchDateLabel: data.dateType,
      fromDate: moment(data.startDate).format('yyyy-MM-DD'),
      toDate: moment(data.endDate).format('yyyy-MM-DD'),
      searchLabel: 'CARNUM',
      searchText: data.vehicleNo,
      parkcartype: data.parkcartype === 'ALL' ? '' : data.parkcartype
    }
  });
}

export function getParkinglotInouts(data) {
  return io.get(
    process.env.REACT_APP_API_DOMAIN_URL + '/cs/parkinglot/' + data.parkinglotId + '/inouts',
    {
      params: {
        startDate: data.startDate,
        endDate: data.endDate,
        searchDateLabel: data.dateType,
        vehicleNo: data.vehicleNo
      }
    }
  );
}

export function createParkinglotInout(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/dashboard/admin/inout/create', {
    data
  });
}

export function editParkinglotInout(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/dashboard/admin/inout/edit', {
    data
  });
}

export function calcParkinglotInout(parkinglotId, data) {
  return io.post(
    process.env.REACT_APP_API_DOMAIN_URL + '/cs/parkinglot/' + parkinglotId + '/calc/inout',
    {
      data
    }
  );
}

export function updateParkinglotInout(parkinglotId, data) {
  return io.patch(
    process.env.REACT_APP_API_DOMAIN_URL + '/cs/parkinglot/' + parkinglotId + '/inout',
    {
      data
    }
  );
}

export function getParkinglotDiscountClass(parkinglotId) {
  return io.get(
    process.env.REACT_APP_API_DOMAIN_URL + '/cs/parkinglot/' + parkinglotId + '/discount-class'
  );
}

export function getParkinglotRcsCorpInfo(parkinglotId) {
  return io.get(
    process.env.REACT_APP_API_DOMAIN_URL + '/cs/parkinglot/' + parkinglotId + '/corp/RCS'
  );
}

export function deleteParkinglotInout(id) {
  return io.delete(
    `${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/inout/delete/${id}`,
    id
  );
}
