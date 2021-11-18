import { adminLogin, getAdminList, userLogin } from '@api/user';
import { action, configure, observable, runInAction, toJS } from 'mobx';
import io from '@utils/io';

type IdentifyStatus = 'identifying' | 'identifyPass' | 'unauthorized';

configure({ enforceActions: 'observed' });
class UserStore {
  @observable userInfo: any = {};
  @observable authority: string[] = [];
  @observable authorization: string;
  @observable identifyStatus: IdentifyStatus = 'identifying';
  @observable adminList: any = [];

  constructor() {
    this.initUserInfo();
  }

  // 获取用户权限
  getAuthority = (str?: undefined | string): string[] => {
    const authorityString: string | null =
      typeof str === 'undefined' ? window.localStorage.getItem('RCS-authority') : str;
    let authority: string[];
    authority = authorityString ? JSON.parse(authorityString) : [];
    return authority;
  };

  // 设置用户权限
  @action setAuthority = (authority: string | string[]): void => {
    const raAuthority: string[] = typeof authority === 'string' ? [authority] : authority;
    window.localStorage.setItem('RCS-authority', JSON.stringify(raAuthority));
    this.authority = raAuthority;
  };

  @action setAuthorization = (authorization: string): void => {
    window.localStorage.setItem('RCS-authorization', authorization);
    this.authorization = authorization;
  };

  // 用户登录事件
  @action handleAdminLogin(name: string, password: number): Promise<boolean> {
    this.identifyStatus = 'identifying';
    return adminLogin(name, password)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          this.setUserInfo(data.userInfo);
          this.setAuthority(data.userInfo.role);
          this.setAuthorization(data.token);
          runInAction(() => {
            this.identifyStatus = 'identifyPass';
          });
          return true;
        }
        return false;
      })
      .catch((err) => {
        runInAction(() => {
          this.identifyStatus = 'unauthorized';
        });
        this.setAuthority([]);
        return false;
      });
  }

  @action handleUserLogin(name: string, password: number): Promise<boolean> {
    this.identifyStatus = 'identifying';
    return userLogin(name, password)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          this.setUserInfo(data.userInfo);
          this.setAuthority(data.userInfo.role);
          this.setAuthorization(data.token);
          runInAction(() => {
            this.identifyStatus = 'identifyPass';
          });
          return true;
        }
        return false;
      })
      .catch((err) => {
        runInAction(() => {
          this.identifyStatus = 'unauthorized';
        });
        this.setAuthority([]);
        return false;
      });
  }

  // 设置用户信息
  @action setUserInfo(userInfo: object): void {
    this.userInfo = userInfo;
    window.localStorage.setItem('RCS-user', JSON.stringify(userInfo));
  }

  // 用户登出，重置信息
  @action userLogout = (): void => {
    this.userInfo = {};
    this.authority = [];
    window.localStorage.removeItem('RCS-authority');
    window.localStorage.removeItem('RCS-user');
  };

  // 重新拉取用户信息
  @action initUserInfo = async (): Promise<any> => {
    const localUserInfo: string | null = window.localStorage.getItem('RCS-user');
    const userAuthority: string[] = this.getAuthority();
    // 存在权限和用户信息
    if (userAuthority.length && localUserInfo) {
      this.setUserInfo(JSON.parse(localUserInfo));
      this.identifyStatus = 'identifyPass';
      this.setAuthority(userAuthority);
    } else {
      this.identifyStatus = 'unauthorized';
      this.setAuthority([]);
    }
  };

  @action loadAdminList = (req?: any): Promise<any> => {
    return getAdminList(req).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        data.forEach((user: any) => {
          if (user.role !== 'SUPER_ADMIN') {
            this.adminList.push(user);
          }
        });
      }
    });
  };

  @action isAuthenticated = () => {
    return localStorage.getItem('RCS-authorization') !== null;
  };
}

export const userStore = new UserStore();
export default UserStore;
