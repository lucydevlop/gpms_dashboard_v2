import { action, configure, observable, toJS } from 'mobx';
import { getCorpList } from '@/api/ticket';
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
      searchLabel: '',
      searchText: '',
      useStatus: null
    };
    const data = await getCorpList(corpRequestData);
    this.setCorpAllList(data.data);
    this.setCorpList(data.data.filter((v1: any) => v1.delYn === 'N'));
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
