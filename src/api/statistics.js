import io from '../utils/io';

export function getInoutByDay(data) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/statistic/inout/day`, {
    params: {
      startDate: data.startDate,
      endDate: data.endDate
    }
  });
}
