import io from '../utils/io';

export function getInoutByDay(data) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/statistic/inout/count/day`, {
    params: {
      startDate: data.startDate,
      endDate: data.endDate
    }
  });
}

export function getInoutByMonth(data) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/statistic/inout/count/month`, {
    params: {
      startDate: data.startDate,
      endDate: data.endDate
    }
  });
}

export function getInoutPaymentByDay(data) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/statistic/inout/payment/day`, {
    params: {
      startDate: data.startDate,
      endDate: data.endDate
    }
  });
}

export function getInoutPaymentByMonth(data) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/statistic/inout/payment/month`, {
    params: {
      startDate: data.startDate,
      endDate: data.endDate
    }
  });
}
