import {
  createParkinglot,
  getAllDisabilities,
  getGateGroups,
  getGateList,
  getParkinglot,
  getParkinglotStatistist,
  updateParkinglot
} from '@api/parkinglot';
import { action, computed, configure, observable, runInAction } from 'mobx';
import { actionAsync } from 'mobx-utils';
import {
  IParkinglotDailyErrosObj,
  IParkinglotErrorReq,
  IParkinglotErrorSummaryObj,
  IParkinglotObj,
  IParkinglotStatisticsObj,
  IParkinglotUtilzationObj
} from '@models/parkinglot';
import { IFacilityObj, IFacilitySummaryObj } from '@models/facility';
import { IDisabilityObj } from '@models/history';
import { IGateObj } from '@models/gate';
import {
  createFacility,
  createGate,
  getFacilities,
  getGates,
  updateFacility,
  updateGate
} from '@api/facility';
import { ECategory, EDelYn, EGateType } from '@/constants/list';
import zdsTips from '@utils/tips';

configure({ enforceActions: 'observed' });
class ParkinglotStore {
  @observable parkinglot: IParkinglotObj | null = null;

  @observable statistics: any = {};

  @observable utilzation: IParkinglotUtilzationObj = { normal: 0, error: 0, inActive: 0 };

  @observable parkinglotList: Array<IParkinglotObj> = [];

  @observable facilities: Array<IFacilityObj> = [];

  @observable facilitySummary: IFacilitySummaryObj = { total: 0, active: 0, failure: 0 };

  // @observable parkinglotDisabilities: Array<IDisabilityObj> = [];

  @observable disabilities: Array<IDisabilityObj> = [];

  @observable dailyDisabilities: IParkinglotDailyErrosObj = {
    days: [],
    disabilities: [],
    resolves: []
  };

  @observable parkinglotErrorSum: Array<IParkinglotErrorSummaryObj> = [];

  @observable gateList: Array<IGateObj> = [];

  @observable gateGroups: Array<any> = [];

  constructor() {
    this.init();
  }

  @action
  private init() {
    this.parkinglot = null;
    this.facilities = [];
    this.gateList = [];
    this.get().then();
    this.fetchGates().then();
    this.fetchFacilities().then();
  }

  @actionAsync async get() {
    getParkinglot()
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

  @actionAsync async fetchFacilities() {
    await getFacilities()
      .then((res: any) => {
        const { code, msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.facilities = data;
          });
        }
      })
      .catch((err) => {});
  }

  @actionAsync async update(parkinglot: any) {
    updateParkinglot(parkinglot)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setParkinglot(data);
          });
        }
      })
      .catch((err) => {});
  }

  @actionAsync async fetchGates() {
    await getGates()
      .then((res: any) => {
        const { code, msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.gateList = data;
          });
        }
      })
      .catch((err) => {});
  }

  @action getGates(): IGateObj[] {
    if (!this.gateList.length) {
      this.fetchGates()
        .then(() => {
          runInAction(() => {
            return this.gateList;
          });
        })
        .catch(() => {
          return [];
        });
    }
    return this.gateList;
  }

  @action async updateGate(gate: any): Promise<IGateObj[]> {
    await updateGate(gate)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          zdsTips.success('게이트 정보 변경 완료');
          runInAction(() => {
            this.gateList = this.gateList.map((e) => {
              if (e.sn === data.sn) {
                return { ...data };
              }
              return { ...e };
            });
            return this.gateList;
          });
        }
      })
      .catch((err) => {
        zdsTips.error('게이트 정보 변경 실패');
      })
      .finally(() => {});

    return this.gateList;
  }

  @actionAsync async createGate(gate: any): Promise<IGateObj[]> {
    await createGate(gate)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          zdsTips.success('게이트 정보 변경 완료');
          runInAction(() => {
            this.gateList = [...this.gateList, data];
            return this.gateList;
          });
        }
      })
      .catch((err) => {
        zdsTips.error('게이트 정보 변경 실패');
      })
      .finally(() => {});
    return this.gateList;
  }

  @computed
  get getInGates(): any[] {
    const inUnique: { value: string; label: string }[] = [];
    this.gateList
      .filter((g) => g.delYn === EDelYn.N && g.gateType.includes('IN'))
      .forEach((gate) => {
        inUnique.push({ value: gate.gateId, label: gate.gateName });
      });
    return inUnique;
  }

  @computed
  get getOutGates(): any[] {
    const outUnique: { value: string; label: string }[] = [];
    this.gateList
      .filter((g) => g.delYn === EDelYn.N && g.gateType.includes('OUT'))
      .forEach((gate) => {
        outUnique.push({ value: gate.gateId, label: gate.gateName });
      });
    return outUnique;
  }

  @action setParkinglot(data: IParkinglotObj): void {
    this.parkinglot = data;
  }

  @action getParkinglot(): IParkinglotObj | null {
    if (this.parkinglot !== null) {
      return this.parkinglot;
    }

    getParkinglot().then((res: any) => {
      const { code, msg, data } = res;
      if (msg === 'success') {
        runInAction(() => {
          this.setParkinglot(data);
          return this.parkinglot;
        });
      }
    });

    return null;
  }

  @action getFacilities(): IFacilityObj[] {
    if (!this.facilities.length) {
      this.fetchFacilities()
        .then(() => {
          runInAction(() => {
            return this.facilities;
          });
        })
        .catch(() => {
          return [];
        });
    }
    return this.facilities;
  }

  @action async updateFacilities(facility: any): Promise<IFacilityObj[]> {
    await updateFacility(facility)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          zdsTips.success('시설 정보 변경 완료');
          runInAction(() => {
            this.facilities = this.facilities.map((e) => {
              if (e.sn === data.sn) {
                return { ...data };
              }
              return { ...e };
            });
            return this.facilities;
          });
        }
      })
      .catch((err) => {
        zdsTips.error('시설 정보 변경 실패');
      })
      .finally(() => {});

    return this.facilities;
  }

  @action async createFacilities(facility: any): Promise<IFacilityObj[]> {
    await createFacility(facility)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          zdsTips.success('시설 정보 변경 완료');
          runInAction(() => {
            this.facilities = [...this.facilities, data];
            return this.facilities;
          });
        }
      })
      .catch((err) => {
        zdsTips.error('시설 정보 변경 실패');
      })
      .finally(() => {});

    return this.facilities;
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

  // @action getParkinglotDisabilities(sn: number) {
  //   return getParkinglotActions(sn)
  //     .then((res: any) => {
  //       const { msg, data } = res;
  //       if (msg === 'ok') {
  //         runInAction(() => {
  //           this.setParkinglotActionDetails(data);
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       runInAction(() => {});
  //     });
  // }

  // @action setParkinglotActionDetails(list: Array<IDisabilityObj>): void {
  //   this.parkinglotDisabilities = list;
  // }

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

  @action setGateList(list: Array<any>) {
    this.gateList = list;
  }

  @action initGateList() {
    return getGateList().then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        runInAction(() => {
          this.gateList = data;
        });
      }
    });
  }

  @action initGateGroups() {
    return getGateGroups().then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        runInAction(() => {
          this.gateGroups = data;
        });
      }
    });
  }

  @computed
  get parkinglotName() {
    return this.parkinglot ? this.parkinglot.siteName : '';
  }

  @computed
  get getPayStations() {
    return this.facilities.filter((f) => f.category === ECategory.PAYSTATION);
  }
}
export const parkinglotStore = new ParkinglotStore();
export default ParkinglotStore;
