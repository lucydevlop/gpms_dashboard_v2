import io from '@utils/io';
import moment from 'moment';

export function getInoutDetail(data) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/inout`, {
    params: {
      sn: data
    }
  });
}

export function getInouts(data) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/inouts`, {
    params: {
      searchDateLabel: data.dateType,
      startDate: moment(data.startDate).format('yyyy-MM-DD'),
      endDate: moment(data.endDate).format('yyyy-MM-DD'),
      searchLabel: 'CARNUM',
      vehicleNo: data.vehicleNo,
      parkCarType: data.parkcartype === 'ALL' ? '' : data.parkcartype,
      outSn: data.outSn
    }
  });
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

export function calcParkinglotInout(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/inouts/calc', {
    data
  });
}

export function updateParkinglotInout(data) {
  return io.put(process.env.REACT_APP_API_DOMAIN_URL + '/inouts', {
    data
  });
}

export function transferParkinglotInout(data) {
  return io.put(process.env.REACT_APP_API_DOMAIN_URL + '/inouts/transfer', {
    data
  });
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
  return io.delete(`${process.env.REACT_APP_API_DOMAIN_URL}/inouts/forced/exit/${id}`, id);
}

export function getInoutPayment(data) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/inouts/payments`, {
    params: {
      fromDate: data.startDate,
      toDate: data.endDate,
      vehicleNo: data.vehicleNo
    }
  });
}
