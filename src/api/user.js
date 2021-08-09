import io from '@utils/io';
import Mock from 'mockjs';

const userInfo = Mock.mock({
  'data|1-1': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime'
    }
  ]
});

// Mock.mock('/post/login', (req) => {
//   const { userName, password } = JSON.parse(req.body);
//   if ((userName === 'admin' || userName === 'guest') && Number(password) === 123) {
//     return {
//       message: 'ok',
//       userInfo
//     };
//   } else {
//     return {
//       message: 'error'
//     };
//   }
// });

Mock.mock('/get/userInfo', userInfo);

export function postLogin(userName, password) {
  // console.log('login', process.env.REACT_APP_API_DOMAIN_URL + '/login');
  return io.post(process.env.REACT_APP_API_DOMAIN_URL + '/auth/admin/login', {
    data: {
      id: userName,
      password: password
    }
  });
}

export function getUserInfo() {
  return io.get('/get/userInfo');
}
