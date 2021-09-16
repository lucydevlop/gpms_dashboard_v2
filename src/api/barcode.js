import io from '@utils/io';

export function getBarcode() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/barcode`);
}

export function createBarcode(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/barcode`, {
    data: data
  });
}

export function updateBarcode(data) {
  return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/barcode`, {
    data: data
  });
}

export function getBarcodeClasses() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/barcode/classes`);
}

export function createBarcodeClasses(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/barcode/classes`, {
    data: data
  });
}

export function updateBarcodeClasses(data) {
  return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/barcode/classes`, {
    data: data
  });
}
