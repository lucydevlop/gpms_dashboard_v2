import io from '@utils/io';
import Mock from 'mockjs';

const parkinglotList = Mock.mock({
  'data|4-7': [
    {
      parkinglotId: '@increment',
      parkinglotName: '@first',
      id: '@first',
      city: 'SEOUL',
      address: '@paragraph(1)',
      ip: '192.168.0.0',
      time: '@boolean',
      lastUpdateTime: '@datetime',
      total: 10,
      success: 10,
      failure: 0,
      percent: 100
    },
    {
      parkinglotId: '@increment',
      parkinglotName: '@first',
      id: '@first',
      city: 'BUSAN',
      address: '@paragraph(1)',
      ip: '192.168.0.0',
      time: '@boolean',
      lastUpdateTime: '@datetime',
      total: 10,
      success: 5,
      failure: 5,
      percent: 50
    }
  ]
});

Mock.mock('/parkinglots', () => {
  return {
    msg: 'ok',
    data: parkinglotList
  };
});

// export function getParkinglot() {
//   return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/parkinglots');
//   // return io.get('/parkinglots');
// }

const parkinglotActionDetails = Mock.mock({
  'data|12-12': [
    {
      id: '@increment',
      create_dt: '@datetime',
      userName: '@first',
      gateId: '@first',
      facilityId: '@first',
      disabilityContent: '차단봉의심',
      actionContent: '차단기 열림',
      status: 'DONE',
      resolvedYn: 'Y'
    },
    {
      id: '@increment',
      create_dt: '@datetime',
      userName: '@first',
      gateId: '@first',
      facilityId: '@first',
      disabilityContent: '비정상접속',
      actionContent: '리셋',
      status: 'WAIT',
      resolvedYn: 'N'
    }
  ]
});

Mock.mock('/get/parkinglotActions', () => {
  return {
    message: 'ok',
    data: parkinglotActionDetails
  };
});

export function getParkinglotActions(sn) {
  const data =
    sn === 0 ? { startDate: '2021-01-01' } : { parkinglotId: sn, startDate: '2021-01-01' };

  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/parkinglots/errors', {
    data: sn === 0 ? { startDate: '2021-01-01' } : { parkinglotId: sn, startDate: '2021-01-01' }
  });
}

const parkinglotStatistics = Mock.mock({
  data: {
    parkinglotCnt: 120,
    facilitiesCnt: 490,
    utilzation: {
      normal: 55,
      error: 20,
      inActive: 25
    },
    'newActions|10-10': [
      {
        id: '@increment',
        create_dt: '@datetime',
        userName: '@first',
        parkinglotId: '@increment',
        parkinglotName: '지엘엔티주차장',
        gateId: '@first',
        facilityId: '@first',
        disabilityContent: '차단봉의심',
        actionContent: '차단기 열림',
        status: 'DONE',
        resolvedYn: 'Y',
        remoteTool: 'ANYDESK'
      }
    ],
    'longActions|10-10': [
      {
        id: '@increment',
        create_dt: '@datetime',
        userName: '@first',
        parkinglotId: '@increment',
        parkinglotName: '부천테크노파크3단지주차장',
        gateId: '@first',
        facilityId: '@first',
        disabilityContent: '비정상접속',
        actionContent: '리셋',
        status: 'WAIT',
        resolvedYn: 'N',
        remoteTool: 'TEAMVIEWER'
      }
    ]
  }
});

Mock.mock('/get/parkinglotStatistist', () => {
  return {
    msg: 'ok',
    data: parkinglotStatistics
  };
});

export function getParkinglotStatistist() {
  return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/analysis');
}

export function createParkinglot(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/parkinglots', {
    data: {
      parkinglot: {
        ip: data.ip,
        name: data.parkinglotName,
        city: data.city,
        address: data.address,
        remoteTool: data.remoteTool,
        remoteKey: data.remoteKey
      }
    }
  });
}

export function getAllDisabilities(data) {
  return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/errors', {
    params: {
      city: data.city ? data.city : '',
      name: data.name ? data.name : '',
      startDate: data.startDate,
      endDate: data.endDate
    }
  });
}

export function getDisability(data) {
  return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/errors/' + data);
}

export function getCsDashboard() {
  return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/cs/dashboard');
}

export function completeCs(data) {
  // console.log('completeCs', data);
  return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/cs/call/' + data + '/complete');
}

export function getParkinglotDashboard() {
  return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/parkinglots/dashboard');
}

// export function getDashboard() {
//   return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/dashboard');
// }

export function getParkinglot() {
  return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/parkinglots');
}

export function getGateList() {
  return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/gates');
}

export function updateParkinglot(data) {
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/parkinglots', {
    data
  });
}

export function getGateGroups() {
  return io.get(process.env.REACT_APP_API_DOMAIN_URL + '/dashboard/admin/gate_groups');
}
