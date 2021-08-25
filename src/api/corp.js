import io from '@utils/io';

export function getCorpAllTickets(sn, inSn) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/corps/${sn}/${inSn}/able/ticket`);
}

export function getCorps(data) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/corps`, {
    params: {
      sn: data.sn === undefined ? '' : data.sn,
      corpName: data.corpName,
      corpId: data.corpId,
      tel: data.tel,
      delYn: data.delYn === undefined ? '' : data.delYn
    }
  });
}

export function getVehicleSearch(no) {
  const data = {
    vehicleNo: no
  };

  return io.post(
    `${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/parking/discount/search/vehicle`,
    {
      data: data
    }
  );
}

export function applyCorpDiscountTicket(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/parking/discount/add/ticket`, {
    data: data
  });
}
