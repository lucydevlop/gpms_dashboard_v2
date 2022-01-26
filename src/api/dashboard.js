import io from '@utils/io';

export function getDashboardGateStatus() {
  return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/home');
}

export function actionReset(gateId, category) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/home/reset/${gateId}/${category}`);
}

export function actionGate(gateId, action) {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/home/breaker/${gateId}/${action}`);
}
