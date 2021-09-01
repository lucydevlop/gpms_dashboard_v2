import io from '../utils/io';

export function visitorAdds(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/dashboard/admin/product/ticket/adds', {
    data
  });
}

export function getVisitorList(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/dashboard/admin/product/ticket/list', {
    data
  });
}

export function visitorDelete(data) {
  return io.delete(`${process.env.REACT_APP_API_DOMAIN_URL}/product/ticket/delete/${data}`, data);
}
