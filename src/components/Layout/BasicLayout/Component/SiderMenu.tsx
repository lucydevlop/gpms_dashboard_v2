import React, { useEffect, useState, useCallback } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import intersection from 'lodash/intersection';
import classNames from 'classnames';
import UserStore, { userStore } from '@store/userStore';
import LayoutStore, { layoutStore } from '@store/layoutStore';
import LocaleStore, { localeStore } from '@store/localeStore';
import SiteDetail from './SiteDetail';
import Icon from '@ant-design/icons';
import Iconfont from '@components/Iconfont';
import cloneDeep from 'lodash/cloneDeep';
import { RouteChild } from '@models/global';

interface InjectedProps {
  siderBar?: React.ReactNode;
  siteLogo?: React.ReactNode;
}

const { SubMenu } = Menu;
let isInitMenuOpen = false;

type State = {
  openKeys: any[];
  menuProps: any;
};

@inject('layoutStore', 'userStore', 'localeStore')
@observer
class SiderMenu extends React.Component<InjectedProps, any> {
  constructor(props: InjectedProps) {
    super(props);
    this.state = {
      openKeys: [],
      menuProps: {}
    };
    this.RCSMenu = this.RCSMenu.bind(this);
    this.VerticalMenu = this.VerticalMenu.bind(this);
    this.checkRoute = this.checkRoute.bind(this);
    this.createIcon = this.createIcon.bind(this);
    this.getMenuItem = this.getMenuItem.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.getNavMenuItem = this.getNavMenuItem.bind(this);
    this.getMenuTitle = this.getMenuTitle.bind(this);
    this.getSubMenuOrItem = this.getSubMenuOrItem.bind(this);
    this.handleClickLink = this.handleClickLink.bind(this);
  }

  // state: State = {
  //
  // };

  componentDidMount() {
    const { routeConfig } = layoutStore;
    const [, appRoutes] = routeConfig;
    if (isInitMenuOpen) {
      return;
    }
    // 缓存匹配到的路由信息
    let cacheRoute: RouteChild;
    const menuOpen = location.pathname.split('/').reduce((total: string[], path) => {
      if (path) {
        cacheRoute = this.checkRoute(cacheRoute || appRoutes.routes, path);
        cacheRoute && cacheRoute.routes && total.push(cacheRoute.path);
      }
      return total;
    }, []);
    isInitMenuOpen = true;
    this.setState({ openKeys: menuOpen });
  }

  checkRoute = (routeInfo: any, path: string) => {
    const isArr = Array.isArray(routeInfo);
    const arr = isArr ? routeInfo : routeInfo.routes;
    return arr.find(
      (route: RouteChild) => route.path === (isArr ? '' : routeInfo.path) + '/' + path
    );
  };

  createIcon = (icon: string | React.ReactNode) => {
    if (!icon) return null;
    const cacheIcon = cloneDeep(icon);
    // @ts-ignore
    if (icon.$$typeof) {
      // return icon;
      return <span className="RCS-menuIcon">{cacheIcon}</span>;
    }
    if (typeof cacheIcon === 'string') {
      return cacheIcon.indexOf('iconfont-') > 0 ? (
        <Iconfont type={cacheIcon} />
      ) : (
        <Icon component={cacheIcon as any} />
      );
    } else {
      return (
        <Icon component={cacheIcon as React.FunctionComponent<React.SVGProps<SVGSVGElement>>} />
      );
    }
  };

  getMenuItem = (menu: RouteChild, parentName?: string) => {
    const { localeObj } = localeStore;
    const { icon, name, path, search, localeKey } = menu;
    const localName = localeKey ? localeObj[localeKey] : name;
    return (
      <Link
        to={{ pathname: path, search }}
        replace
        onClick={() => {
          this.handleClickLink();
        }}
      >
        {this.createIcon(icon)}
        <span
          className={parentName ? 'RCS-antd-menuItem-title' : 'RCS-antd-subMenu-title'}
          title={localName}
        >
          {localName}
        </span>
      </Link>
    );
  };

  handleOpenMenu = (openKeys: string[]) => {
    const {
      routeConfig,
      isHorizontalNavigator,
      layoutStatus: { collapsed }
    } = layoutStore;

    const moreThanOne =
      openKeys.filter((key) => routeConfig.some((route) => route.path === key)).length > 1;
    if (collapsed && !openKeys.length) {
      return;
    }
    this.setState({ openKeys: moreThanOne ? [openKeys.pop()] : [openKeys] });

    let menuProps: any = {};
    if (!isHorizontalNavigator) {
      menuProps = {
        ...menuProps,
        inlineCollapsed: collapsed
      };
      !collapsed && (menuProps.openKeys = openKeys);
    }
  };

  getNavMenuItem = (menuData: RouteChild[], parentName?: string) => {
    const { authority: currentAuthority } = userStore;
    if (!menuData.length) {
      return [];
    }
    return menuData
      .filter((menu: RouteChild) => {
        const { authority, hideMenu } = menu;
        if (!hideMenu) {
          if (!authority) return true;
          const allowed = intersection(currentAuthority, authority);
          return allowed.length > 0;
        }
        return false;
      })
      .map((res: RouteChild) => this.getSubMenuOrItem(res, parentName));
  };

  getMenuTitle = (name: string = '', parentName?: string, icon?: React.ReactNode) => {
    const { localeObj } = localeStore;
    const key = parentName ? `menu.${parentName}.${name}` : `menu.${name}`;
    const localName = localeObj[key] || name;
    return (
      <span>
        {this.createIcon(icon)}
        <span className={!parentName ? 'RCS-antd-subMenu-title' : ''} title={localName}>
          {localName}
        </span>
      </span>
    );
  };

  getSubMenuOrItem = (menu: RouteChild, parentName?: string) => {
    if (menu.routes && !menu.hideMenu && menu.routes.some((child: RouteChild) => child.name)) {
      // 菜单父级
      const { icon, name, path, routes } = menu;
      return (
        <SubMenu
          title={this.getMenuTitle(name, parentName, icon)}
          key={path}
          className="RCS-antd-subMenu"
        >
          {this.getNavMenuItem(routes, name)}
        </SubMenu>
      );
    } // 菜单子级枝叶
    return (
      <Menu.Item key={menu.path} className="RCS-antd-menuItem">
        {this.getMenuItem(menu, parentName)}
      </Menu.Item>
    );
  };

  handleClickLink = () => {
    const {
      toggleCollapsed,
      layoutStatus: { isMobile }
    } = layoutStore;
    isMobile && toggleCollapsed();
  };

  RCSMenu = () => {
    const {
      routeConfig,
      isHorizontalNavigator,
      isDarkTheme,
      layoutStatus: { collapsed }
    } = layoutStore;
    const [, appRoutes] = routeConfig;
    return (
      this.props.siderBar || (
        <Menu
          className={classNames(
            'RCS-menu',
            isHorizontalNavigator && 'RCS-menu-horizontal',
            isDarkTheme && 'RCS-menu-darkTheme',
            collapsed && 'RCS-menu-collapsed'
          )}
          mode={isHorizontalNavigator ? 'horizontal' : 'inline'}
          selectedKeys={[location.pathname]}
          onOpenChange={this.handleOpenMenu}
          {...this.state.menuProps}
        >
          {this.getNavMenuItem(appRoutes.routes || [])}
        </Menu>
      )
    );
  };
  VerticalMenu = () => {
    const {
      isInlineLayout,
      isDarkTheme,
      layoutStatus: { fixSiderBar, collapsed }
    } = layoutStore;
    return (
      <aside
        className={classNames(
          'RCS-navigator',
          fixSiderBar && 'RCS-navigator-fixSiderBar',
          collapsed && 'RCS-navigator-collapsed',
          isInlineLayout ? 'RCS-inlineLayout-navigator' : 'RCS-splitLayout-navigator',
          isDarkTheme && 'RCS-navigator-darkTheme'
        )}
      >
        {!isInlineLayout && (this.props.siteLogo || <SiteDetail />)}
        {this.RCSMenu()}
      </aside>
    );
  };

  render() {
    const { isHorizontalNavigator } = layoutStore;
    const HorizontalMenu = this.RCSMenu();
    return <>{isHorizontalNavigator ? HorizontalMenu : this.VerticalMenu()}</>;
  }
}
export default SiderMenu;
//
// const SiderMenu: React.FC<{ siderBar?: React.ReactNode; siteLogo?: React.ReactNode }> = (props) => {
//   const [openKeys, setOpenKeys] = useState<any[]>([]);
//
//   const location = useLocation();
//
//   const {
//     layoutStore: {
//       routeConfig,
//       toggleCollapsed,
//       isInlineLayout,
//       isHorizontalNavigator,
//       isDarkTheme,
//       layoutStatus: { fixSiderBar, collapsed, isMobile }
//     },
//     userStore: { authority: currentAuthority },
//     localeStore: { localeObj }
//   } = props as InjectedProps;
//
//   const [, appRoutes] = routeConfig;
//
//   // 检查路由是否匹配信息表
//   function checkRoute(routeInfo: any, path: string) {
//     const isArr = Array.isArray(routeInfo);
//     const arr = isArr ? routeInfo : routeInfo.routes;
//     return arr.find(
//       (route: RouteChild) => route.path === (isArr ? '' : routeInfo.path) + '/' + path
//     );
//   }
//
//   // 初始化开启的菜单
//   const initOpenMenu = useCallback(() => {
//     if (isInitMenuOpen) {
//       return;
//     }
//     // 缓存匹配到的路由信息
//     let cacheRoute: RouteChild;
//     const menuOpen = location.pathname.split('/').reduce((total: string[], path) => {
//       if (path) {
//         cacheRoute = checkRoute(cacheRoute || appRoutes.routes, path);
//         cacheRoute && cacheRoute.routes && total.push(cacheRoute.path);
//       }
//       return total;
//     }, []);
//     isInitMenuOpen = true;
//     setOpenKeys([...menuOpen]);
//   }, [appRoutes.routes, location]);
//
//   useEffect(() => {
//     initOpenMenu();
//   }, [initOpenMenu]);
//
//   function createIcon(icon: string | React.ReactNode) {
//     if (!icon) return null;
//     const cacheIcon = cloneDeep(icon);
//     // @ts-ignore
//     if (icon.$$typeof) {
//       // return icon;
//       return <span className="RA-menuIcon">{cacheIcon}</span>;
//     }
//     if (typeof cacheIcon === 'string') {
//       return cacheIcon.indexOf('iconfont-') > 0 ? (
//         <Iconfont type={cacheIcon} />
//       ) : (
//         <Icon component={cacheIcon as any}></Icon>
//       );
//     } else {
//       return (
//         <Icon component={cacheIcon as React.FunctionComponent<React.SVGProps<SVGSVGElement>>} />
//       );
//     }
//   }
//
//   // 获取菜单标题
//   function getMenuTitle(name: string = '', parentName?: string, icon?: React.ReactNode) {
//     const key = parentName ? `menu.${parentName}.${name}` : `menu.${name}`;
//     const localName = localeObj[key] || name;
//     return (
//       <span>
//         {createIcon(icon)}
//         <span className={!parentName ? 'RA-antd-subMenu-title' : ''} title={localName}>
//           {localName}
//         </span>
//       </span>
//     );
//   }
//
//   // 递归生成菜单项
//   function getNavMenuItem(menuData: RouteChild[], parentName?: string) {
//     if (!menuData.length) {
//       return [];
//     }
//     return menuData
//       .filter((menu: RouteChild) => {
//         const { authority, hideMenu } = menu;
//         if (!hideMenu) {
//           if (!authority) return true;
//           const allowed = intersection(currentAuthority, authority);
//           return allowed.length > 0;
//         }
//         return false;
//       })
//       .map((res: RouteChild) => getSubMenuOrItem(res, parentName));
//   }
//
//   // 初始化子级菜单或者菜单枝叶
//   function getSubMenuOrItem(menu: RouteChild, parentName?: string) {
//     if (menu.routes && !menu.hideMenu && menu.routes.some((child: RouteChild) => child.name)) {
//       // 菜单父级
//       const { icon, name, path, routes } = menu;
//       return (
//         <SubMenu
//           title={getMenuTitle(name, parentName, icon)}
//           key={path}
//           className="RA-antd-subMenu"
//         >
//           {getNavMenuItem(routes, name)}
//         </SubMenu>
//       );
//     } // 菜单子级枝叶
//     return (
//       <Menu.Item key={menu.path} className="RA-antd-menuItem">
//         {getMenuItem(menu, parentName)}
//       </Menu.Item>
//     );
//   }
//
//   function handleClickLink() {
//     isMobile && toggleCollapsed();
//   }
//
//   // 生成菜单枝叶
//   function getMenuItem(menu: RouteChild, parentName?: string) {
//     const { icon, name, path, search, localeKey } = menu;
//     const localName = localeKey ? localeObj[localeKey] : name;
//     return (
//       <Link
//         to={{ pathname: path, search }}
//         replace
//         onClick={() => {
//           handleClickLink();
//         }}
//       >
//         {createIcon(icon)}
//         <span
//           className={parentName ? 'RA-antd-menuItem-title' : 'RA-antd-subMenu-title'}
//           title={localName}
//         >
//           {localName}
//         </span>
//       </Link>
//     );
//   }
//
//   const handleOpenMenu = (openKeys: string[]) => {
//     const moreThanOne =
//       openKeys.filter((key) => routeConfig.some((route) => route.path === key)).length > 1;
//     if (collapsed && !openKeys.length) {
//       return;
//     }
//     setOpenKeys(moreThanOne ? [openKeys.pop()] : [...openKeys]);
//   };
//
//   let menuProps: any = {};
//
//   if (!isHorizontalNavigator) {
//     menuProps = {
//       ...menuProps,
//       inlineCollapsed: collapsed
//     };
//     !collapsed && (menuProps.openKeys = openKeys);
//   }
//
//   const RAMenu = props.siderBar || (
//     <Menu
//       className={classNames(
//         'RA-menu',
//         isHorizontalNavigator && 'RA-menu-horizontal',
//         isDarkTheme && 'RA-menu-darkTheme',
//         collapsed && 'RA-menu-collapsed'
//       )}
//       mode={isHorizontalNavigator ? 'horizontal' : 'inline'}
//       selectedKeys={[location.pathname]}
//       onOpenChange={handleOpenMenu}
//       {...menuProps}
//     >
//       {getNavMenuItem(appRoutes.routes || [])}
//     </Menu>
//   );
//
//   const VerticalMenu = (
//     <aside
//       className={classNames(
//         'RA-navigator',
//         fixSiderBar && 'RA-navigator-fixSiderBar',
//         collapsed && 'RA-navigator-collapsed',
//         isInlineLayout ? 'RA-inlineLayout-navigator' : 'RA-splitLayout-navigator',
//         isDarkTheme && 'RA-navigator-darkTheme'
//       )}
//     >
//       {!isInlineLayout && (props.siteLogo || <SiteDetail />)}
//       {RAMenu}
//     </aside>
//   );
//
//   const HorizontalMenu = RAMenu;
//
//   return <>{isHorizontalNavigator ? HorizontalMenu : VerticalMenu}</>;
// };
//
// export default inject('layoutStore', 'userStore', 'localeStore')(observer(SiderMenu));
