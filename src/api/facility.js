import io from '@utils/io';
import Mock from 'mockjs';

const facilityList = Mock.mock({
  'facilities|1-2': [
    {
      sn: '@increment',
      id: '@first',
      name: '@first',
      parkinglotSn: 1,
      category: 'LPR',
      gateGroupId: 'GATE001',
      health: 'NORMAL'
    },
    {
      sn: '@increment',
      id: '@first',
      name: '@first',
      parkinglotSn: 1,
      category: 'BREAKER',
      gateGroupId: 'GATE001',
      health: 'ERROR',
      status: 'OPEN'
    }
  ],
  summary: {
    total: 3,
    active: 3,
    failure: 0
  }
});

Mock.mock('/get/facilityList', () => {
  return {
    message: 'ok',
    data: facilityList
  };
});

export function actionFacility(id, facilityId, action) {
  return io.get(
    process.env.REACT_APP_API_DOMAIN_URL + '/parkinglots/' + id + '/' + facilityId + '/' + action
  );
}

export function getGates() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/gate/list`);
}

export function getFacilities() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/facilities`);
}

export function getDisplayMessages() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/facility/display/message`);
}
