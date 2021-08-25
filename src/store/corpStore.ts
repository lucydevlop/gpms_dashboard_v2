import { action, configure, observable, runInAction, toJS } from 'mobx';
import { getCorpList } from '@/api/ticket';
import { getCorps } from '@api/corp';
import { ISelectOptions } from '@/utils/form';
import { EDelYn } from '@/constants/list';
configure({ enforceActions: 'observed' });
class CorpStore {
  @observable corpList: any = {};

  @observable corpSelectList: ISelectOptions[] = [{ value: -1, label: '선택안함' }];

  @observable deleteList: any = {};

  @observable corpAllList: any = {};

  constructor() {
    this.initCorp();
  }

  async initCorp(): Promise<any> {
    const corpRequestData = {
      sn: '',
      corpName: '',
      corpId: '',
      tel: ''
    };
    // const data = await getCorpList(corpRequestData);
    getCorps(corpRequestData)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setCorpAllList(data);
            this.setCorpList(data.filter((v1: any) => v1.delYn === 'N'));
          });
        }
      })
      .catch(() => {});
  }

  @action setCorpList(data: any) {
    this.corpList = data;
    data.forEach((element: any) => {
      this.corpSelectList.push({ value: element.sn, label: element.corpName });
    });
  }

  @action setCorpAllList(data: any) {
    this.corpAllList = data;
  }
}

export const corpStore = new CorpStore();
export default CorpStore;
