import {
  createParkinglot,
  getAllDisabilities,
  getParkinglot,
  getParkinglotActions,
  getParkinglotStatistist,
  updateParkinglot
} from '@api/parkinglot';
import { getFacilities } from '@api/facility';
import { action, configure, observable, runInAction, toJS } from 'mobx';
import {
  IParkinglotDailyErrosObj,
  IParkinglotErrorReq,
  IParkinglotErrorSummaryObj,
  IParkinglotObj,
  IParkinglotStatisticsObj,
  IParkinglotUtilzationObj
} from '@models/parkinglot';
import { IFacilityObj, IFacilitySummaryObj } from '@models/facility';
import { rules } from '@typescript-eslint/eslint-plugin';
import { IActionsHistoryObj, IDisabilityObj } from '@models/history';

configure({ enforceActions: 'observed' });
class ParkinglotStore {
  @observable parkinglot: IParkinglotObj | null = null;

  @observable statistics: any = {};

  @observable utilzation: IParkinglotUtilzationObj = { normal: 0, error: 0, inActive: 0 };

  @observable parkinglotList: Array<IParkinglotObj> = [];

  @observable facilities: Array<IFacilityObj> = [];

  @observable facilitySummary: IFacilitySummaryObj = { total: 0, active: 0, failure: 0 };

  @observable parkinglotDisabilities: Array<IDisabilityObj> = [];

  @observable disabilities: Array<IDisabilityObj> = [];

  @observable dailyDisabilities: IParkinglotDailyErrosObj = {
    days: [],
    disabilities: [],
    resolves: []
  };

  @observable parkinglotErrorSum: Array<IParkinglotErrorSummaryObj> = [];

  @action get() {
    return getParkinglot()
      .then((res: any) => {
        const { code, msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setParkinglot(data);
          });
        }
      })
      .catch((err) => {});
  }

  @action setParkinglot(data: IParkinglotObj): void {
    this.parkinglot = data;
  }

  @action getTotalParkinglotStatistist() {
    return getParkinglotStatistist()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'ok') {
          runInAction(() => {
            this.setStatistist(data);
            // this.utilzation = toJS(utilzation);
            // console.log('getParkinglotStatistist', toJS(this.utilzation));
          });
        }
      })
      .catch((err) => {});
  }

  @action setStatistist(data: IParkinglotStatisticsObj): void {
    // console.log('getParkinglotStatistist utilzation', data.utilzation);
    this.statistics = data;
    this.utilzation = data.utilzation;
    this.dailyDisabilities = data.dailyDisabilities;
    this.parkinglotErrorSum = data.parkinglotErrorSum;
  }

  @action getParkinglotList() {
    return getParkinglot()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'ok') {
          runInAction(() => {
            this.setParkinglotList(data);
            // console.log('getParkinglotList', this.parkinglotList);
          });
        }
      })
      .catch((err) => {
        runInAction(() => {});
      });
  }

  @action setParkinglotList(list: Array<IParkinglotObj>): void {
    this.parkinglotList = list;
  }

  @action setFacilityList(list: Array<IFacilityObj>): void {
    this.facilities = list;
  }

  @action setFacilitySummary(data: IFacilitySummaryObj): void {
    this.facilitySummary = data;
  }

  @action getParkinglotDisabilities(sn: number) {
    return getParkinglotActions(sn)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'ok') {
          runInAction(() => {
            this.setParkinglotActionDetails(data);
          });
        }
      })
      .catch((err) => {
        runInAction(() => {});
      });
  }

  @action setParkinglotActionDetails(list: Array<IDisabilityObj>): void {
    this.parkinglotDisabilities = list;
  }

  @action create(data: IParkinglotObj) {
    return createParkinglot(data).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'ok') {
        runInAction(() => {
          this.getParkinglotList();
        });
      }
    });
  }

  @action update(data: IParkinglotObj) {
    return updateParkinglot(data).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'ok') {
        runInAction(() => {
          this.getParkinglotList();
        });
      }
    });
  }

  @action getDisabilities(param: IParkinglotErrorReq) {
    return getAllDisabilities(param).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'ok') {
        runInAction(() => {
          this.setDisabilities(data);
        });
      }
    });
  }

  @action setDisabilities(list: Array<IDisabilityObj>) {
    this.disabilities = list;
  }
}
export const parkinglotStore = new ParkinglotStore();
export default ParkinglotStore;
