import React from 'react';
import {
  DashboardOutlined,
  PieChartOutlined,
  CarOutlined,
  ShopOutlined,
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
    name: 'tenant',
    icon: <ShopOutlined />,
    path: '/tenant',
    localeKey: 'menu.tenant',
    authority: ['ADMIN', 'SUPER_ADMIN'],
    routes: [
      {
        name: 'list',
        path: '/tenant/list',
        component: ['/views/Tenant/List'],
        // authority: ['admin', 'ROLE_SUPER'],
        loading: true,
        localeKey: 'menu.tenant.list'
      },
      {
        name: 'ticket',
        path: '/tenant/tickets',
        component: ['/views/Tenant/Tickets'],
        // authority: ['admin', 'ROLE_SUPER'],
        loading: true,
        localeKey: 'menu.tenant.tickets'
      }
    ]
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
    name: 'users',
    icon: <UserOutlined />,
    path: '/store',
    localeKey: 'menu.users',
    authority: ['ADMIN', 'SUPER_ADMIN', 'ROLE_SUPER'],
    routes: [
      {
        name: 'discount',
        path: '/store/discount/apply',
        component: ['/views/Users/Discount/Apply'],
        loading: true,
        localeKey: 'menu.store.discountApply'
      }
    ]
  },
  {
    name: 'setting',
    icon: <SettingOutlined />,
    path: '/parkinglotsetting',
    component: ['/views/Users'],
    authority: ['admin', 'ROLE_SUPER'],
    localeKey: 'menu.setting'
  }
];
