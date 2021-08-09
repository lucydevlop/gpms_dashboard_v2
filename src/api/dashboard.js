import io from '@utils/io';

export function getDashboardGateStatus() {
  return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/dashboard/admin/main/gate');
}

export function actionReset(gateId, category) {
  return io.get(
    `${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/gate/reset/${gateId}/${category}`
  );
}
