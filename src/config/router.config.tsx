import React from 'react';
import {
  DashboardOutlined,
  PieChartOutlined,
  AppstoreOutlined,
  FormOutlined,
  UnorderedListOutlined,
  HeatMapOutlined,
  PictureOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  CarOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { RouteChild, RouteRoot } from '@models/global';

export const constantRouteConfig: { app: RouteRoot; user: RouteRoot } = {
  app: {
    path: '/',
    component: ['/skeleton/Main', 'fadeRA'],
    authority: ['admin', 'guest', 'ROLE_SUPER'],
    routes: []
  },
  user: {
    path: '/user',
    component: ['/skeleton/User', 'fadeRA'],
    routes: [
      {
        name: 'Login',
        path: '/user/login',
        component: ['/views/User/Login']
      },
      {
        name: 'identifyUser',
        path: '/user/identifyUser',
        component: ['/components/Authorized/IdentifyUser', 'fadeRA']
      }
    ]
  }
};

export const asyncRouteConfig: RouteChild[] = [
  {
    path: '/',
    exact: true,
    redirect: '/dashboard',
    hideMenu: true
  },
  {
    name: 'dashboard',
    icon: <DashboardOutlined />,
    path: '/dashboard',
    component: ['/views/Dashboard'],
    loading: true,
    localeKey: 'menu.dashboard'
  },
  {
    name: 'inout',
    icon: <CarOutlined />,
    path: '/inout',
    component: ['/views/Inout'],
    authority: ['ADMIN', 'SUPER_ADMIN', 'OPERATION'],
    loading: true,
    localeKey: 'menu.inout'
  },
  {
    name: 'tickets',
    icon: <CarOutlined />,
    path: '/tickets',
    component: ['/views/Ticket'],
    authority: ['ADMIN', 'SUPER_ADMIN', 'OPERATION'],
    loading: true,
    localeKey: 'menu.ticket'
  },
  {
    name: 'setting',
    icon: <SettingOutlined />,
    authority: ['ADMIN', 'SUPER_ADMIN'],
    path: '/setting',
    localeKey: 'menu.setting',
    routes: [
      {
        name: 'parkinglotSetting',
        path: '/setting/parkinglot',
        component: ['/views/Setting/Parkinglot'],
        localeKey: 'menu.setting.parkinglot'
      },
      {
        name: 'facilitySetting',
        path: '/setting/facility',
        component: ['/views/Setting/Facility'],
        localeKey: 'menu.setting.facility'
      },
      {
        name: 'feeSetting',
        path: '/setting/fee',
        component: ['/views/Setting/Fee'],
        localeKey: 'menu.setting.fee'
      },
      {
        name: 'productSetting',
        path: '/setting/product',
        component: ['/views/Setting/Product'],
        localeKey: 'menu.setting.product'
      },
      {
        name: 'userSetting',
        path: '/setting/user',
        component: ['/views/Setting/User'],
        localeKey: 'menu.setting.user'
      }
    ]
  },
  {
    name: 'statistics',
    icon: <PieChartOutlined />,
    path: '/statistics',
    localeKey: 'menu.statistics',
    authority: ['ADMIN', 'SUPER_ADMIN', 'OPERATION'],
    routes: [
      {
        name: 'inout',
        path: '/statistics/inout',
        component: ['/views/Statistics/Inout'],
        loading: true,
        localeKey: 'menu.statistics.inout'
      },
      {
        name: 'erros',
        path: '/parkinglot/error',
        component: ['/views/ParkingLot/Error'],
        authority: ['admin', 'ROLE_SUPER'],
        loading: true,
        localeKey: 'menu.parkinglot.error'
      },
      {
        name: 'list',
        path: '/parkinglot/parkinglot',
        component: ['/views/ParkingLot/Parkinglot'],
        authority: ['admin', 'ROLE_SUPER'],
        loading: true,
        localeKey: 'menu.parkinglot.parkinglot'
      }
    ]
  },
  {
    name: 'parkinglotcs',
    icon: <CustomerServiceOutlined />,
    path: '/parkinglotcs',
    localeKey: 'menu.parkinglotcs',
    routes: [
      {
        name: 'inout',
        path: '/parkinglotcs/inout',
        component: ['/views/ParkingLotCS/Inout'],
        authority: ['admin', 'ROLE_SUPER'],
        loading: true,
        localeKey: 'menu.parkinglotcs.inout'
      },
      {
        name: 'ticket',
        path: '/parkinglotcs/ticket',
        component: ['/views/ParkingLotCS/Ticket'],
        authority: ['admin', 'ROLE_SUPER'],
        loading: true,
        localeKey: 'menu.parkinglotcs.ticket'
      }
    ]
  },
  {
    name: 'users',
    icon: <UserOutlined />,
    path: '/users',
    component: ['/views/Users'],
    authority: ['admin', 'ROLE_SUPER'],
    localeKey: 'menu.users'
  },
  {
    name: 'setting',
    icon: <SettingOutlined />,
    path: '/parkinglotsetting',
    component: ['/views/Users'],
    authority: ['admin', 'ROLE_SUPER'],
    localeKey: 'menu.setting'
  }
  // ,
  // {
  //   name: 'program',
  //   icon: <AppstoreOutlined />,
  //   path: '/program',
  //   localeKey: 'program',
  //   routes: [
  //     {
  //       name: 'analysis',
  //       path: '/program/analysis',
  //       component: ['/views/Program/Statistics'],
  //       authority: ['admin'],
  //       loading: true,
  //       localeKey: 'menu.program.analysis'
  //     },
  //     {
  //       name: 'monitor',
  //       path: '/program/monitor',
  //       component: ['/views/Program/Statistics'],
  //       loading: true,
  //       localeKey: 'menu.program.monitor'
  //     },
  //     {
  //       name: 'platform',
  //       path: '/program/platform',
  //       component: ['/views/Program/Platform'],
  //       loading: true,
  //       localeKey: 'menu.program.platform'
  //     },
  //     {
  //       name: 'unit',
  //       path: '/program/unit',
  //       component: ['/views/Program/Unit'],
  //       loading: true,
  //       localeKey: 'menu.program.unit'
  //     }
  //   ]
  // },
  // {
  //   name: 'form',
  //   icon: <FormOutlined />,
  //   path: '/form',
  //   localeKey: 'menu.form',
  //   routes: [
  //     {
  //       name: 'basicForm',
  //       path: '/form/basicForm',
  //       component: ['/views/Form/BasicForm'],
  //       authority: ['admin'],
  //       loading: true,
  //       localeKey: 'menu.form.basicForm'
  //     },
  //     {
  //       name: 'stepForm',
  //       path: '/form/stepForm',
  //       component: ['/views/Form/StepForm'],
  //       localeKey: 'menu.form.stepForm'
  //     },
  //     {
  //       name: '三级菜单',
  //       path: '/form/test',
  //       routes: [
  //         {
  //           name: '三级菜单',
  //           path: '/form/test/test1',
  //           component: ['/views/Form/TestDetail']
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   name: 'list',
  //   icon: <UnorderedListOutlined />,
  //   path: '/list',
  //   localeKey: 'menu.list',
  //   routes: [
  //     {
  //       name: 'basicList',
  //       path: '/list/basicList',
  //       component: ['/views/List/BasicList'],
  //       loading: true,
  //       localeKey: 'menu.list.basicList'
  //     },
  //     {
  //       name: 'cardList',
  //       path: '/list/cardList',
  //       component: ['/views/List/CardList'],
  //       loading: true,
  //       localeKey: 'menu.list.cardList'
  //     },
  //     {
  //       name: 'basicTable',
  //       path: '/list/basicTable',
  //       component: ['/views/List/BasicTable'],
  //       localeKey: 'menu.list.basicTable'
  //     }
  //   ]
  // },
  // {
  //   name: 'map',
  //   icon: <HeatMapOutlined />,
  //   path: '/map',
  //   component: ['/views/Map'],
  //   authority: ['admin'],
  //   localeKey: 'menu.map'
  // },
  // {
  //   name: 'gallery',
  //   icon: <PictureOutlined />,
  //   path: '/gallery',
  //   component: ['/views/Gallery'],
  //   authority: ['admin'],
  //   localeKey: 'menu.gallery'
  // },
  // {
  //   name: 'result',
  //   icon: <CheckCircleOutlined />,
  //   path: '/result',
  //   localeKey: 'menu.result',
  //   routes: [
  //     {
  //       name: 'successResult',
  //       path: '/result/successResult',
  //       component: ['/views/Result/SuccessResult'],
  //       localeKey: 'menu.result.successResult'
  //     },
  //     {
  //       name: 'failedResult',
  //       path: '/result/failedResult',
  //       component: ['/views/Result/FailedResult'],
  //       localeKey: 'menu.result.failedResult'
  //     }
  //   ]
  // },
  // {
  //   name: 'exception',
  //   icon: <InfoCircleOutlined />,
  //   path: '/exception',
  //   localeKey: 'menu.exception',
  //   routes: [
  //     {
  //       name: '403',
  //       path: '/exception/403',
  //       component: ['/views/Exception/403', 'bounceIn-animated']
  //     },
  //     {
  //       name: '404',
  //       path: '/exception/404',
  //       component: ['/views/Exception/404']
  //     },
  //     {
  //       name: '500',
  //       path: '/exception/500',
  //       component: ['/views/Exception/500']
  //     },
  //     {
  //       name: 'index',
  //       path: '/exception/home',
  //       component: ['/views/Exception'],
  //       hideMenu: true
  //     }
  //   ]
  // }
];
