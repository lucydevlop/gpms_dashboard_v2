import { observable, configure, action } from 'mobx';
import { usei18n } from '@config/setting';

configure({ enforceActions: 'observed' });
class LocaleStore {
  @observable locale: string = window.localStorage.getItem('RCS-locale') || 'kr';
  @observable localeObj: any = {};
  constructor() {
    usei18n && this.initLocaleList();
  }

  async initLocaleList(): Promise<any> {
    const json = await import(`../locales/${this.locale}/mapping.json`);
    this.setLocaleObj(json);
  }

  @action setLocale(key: string): void {
    this.locale = key;
    window.localStorage.setItem('RCS-locale', key);
    window.location.reload();
  }

  @action setLocaleObj(json: any): void {
    this.localeObj = json.default;
  }
}

export const localeStore = new LocaleStore();
export default LocaleStore;
