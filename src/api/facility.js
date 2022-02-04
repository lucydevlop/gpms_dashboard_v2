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

export function actionFacility(facilityId, action) {
  return io.get(
    `${process.env.REACT_APP_API_DOMAIN_URL}/facilities/action/${facilityId}/${action}`
  );
}

export function getGates() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/gates`);
}

export function updateGate(data) {
  return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/gates/${data.sn}`, {
    data: data
  });
}

export function createGate(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/gates`, {
    data: data
  });
}

export function deleteGate(data) {
  return io.delete(`${process.env.REACT_APP_API_DOMAIN_URL}/gates/${data}`, { data });
}

export function getFacilities() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/facilities`);
}

export function getDisplay() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/displays`);
}

export function createFacility(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/facilities`, {
    data: data
  });
}

export function updateFacility(data) {
  return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/facilities/${data.sn}`, {
    data: data
  });
}

export function deleteFacility(data) {
  return io.delete(`${process.env.REACT_APP_API_DOMAIN_URL}/facilities/${data}`, {
    data: data
  });
}

export function updateDisplay(data) {
  return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/displays/message/${data.sn}`, {
    data: data
  });
}

export function deleteDisplayMessage(data) {
  return io.delete(`${process.env.REACT_APP_API_DOMAIN_URL}/displays/message/${data.sn}`, {
    data: data
  });
}

export function updateDisplayInfo(data) {
  return io.put(`${process.env.REACT_APP_API_DOMAIN_URL}/displays/info/${data.sn}`, {
    data: data
  });
}

export function createDisplay(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/displays/message`, {
    data: data
  });
}

export function displayflowSetting(data) {
  return io.post(`${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/message/info`, {
    data: data
  });
}

export function getDisplayFlowSetting() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/admin/message/info`);
}

export function getActiveFacilities() {
  return io.get(`${process.env.REACT_APP_API_DOMAIN_URL}/facilities/active`);
}
