import io from '@utils/io';

export function getHolidays(data) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/holidays`, {
    params: {
      startDate: data.startDate,
      endDate: data.endDate
    }
  });
}

export function createHoliday(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/holiday`, {
    data: {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      startTime: data.startTime,
      endTime: data.endTime,
      isWorking: data.isWorking,
      delYn: data.delYn,
      type: data.type
    }
  });
}

export function updateHoliday(data) {
  return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/holiday`, {
    data: {
      sn: data.sn,
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      startTime: data.startTime,
      endTime: data.endTime,
      isWorking: data.isWorking,
      delYn: data.delYn,
      type: data.type
    }
  });
}
