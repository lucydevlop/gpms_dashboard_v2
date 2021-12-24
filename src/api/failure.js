import io from '@utils/io';
import moment from 'moment';

export function getFailures(data) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/failures`, {
    params: {
      fromDate: moment(data.startDate).format('yyyy-MM-DD'),
      toDate: moment(data.endDate).format('yyyy-MM-DD'),
      category: data.category === undefined ? '' : data.category,
      resolved: 'ALL'
    }
  });
}
