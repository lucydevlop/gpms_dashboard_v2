import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import {
  createDisplay,
  createFacility,
  createGate,
  getDisplayMessages,
  getFacilities,
  getGates,
  updateDisplay,
  updateFacility,
  updateGate
} from '@api/facility';
import { IGateObj } from '@models/gate';
import { runInAction } from 'mobx';
import { Tabs } from 'antd';
import { IFacilityObj } from '@models/facility';
import FacilityTab from '@views/Setting/Facility/tabs/FacilityTab';
import DisplayTab from '@views/Setting/Facility/tabs/DisplayTab';
import { IDisplayMsgObj } from '@models/display';
import GateTab from '@views/Setting/Facility/tabs/GateTab';
import { mac } from 'address';

interface IState {
  loading: boolean;
  gates: IGateObj[];
  facilities: IFacilityObj[];
  displayMessages: IDisplayMsgObj[];
}
class FacilitySetting extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      gates: [],
      facilities: [],
      displayMessages: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    getGates()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ gates: data });
          });
        }
      })
      .catch(() => {});

    getFacilities()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ facilities: data });
          });
        }
      })
      .catch(() => {});

    getDisplayMessages()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ displayMessages: data });
          });
        }
      })
      .catch(() => {});

    this.setState({ loading: false });
  }

  handleGateUpdate = async (record: IGateObj) => {
    updateGate(record)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const update = data;
            const gates = this.state.gates.map((e) => {
              if (e.sn === update.sn) {
                return { ...update };
              }
              return { ...e };
            });
            this.setState({ gates: gates });
          });
        }
      })
      .catch(() => {});
  };

  handleGateCreate = async (record: IGateObj) => {
    createGate(record)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const gates = [...this.state.gates, data];
            this.setState({ gates: gates });
          });
        }
      })
      .catch(() => {});
  };

  handleFacilityUpdate = async (record: IFacilityObj) => {
    const wrapper: Array<IFacilityObj> = [];
    wrapper.push(record);
    const requsetData = { facilities: wrapper };
    updateFacility(requsetData)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const recive = data;
            const changeData = recive.filter((x: IFacilityObj) => {
              return x.sn === record.sn;
            })[0];
            const facilities = this.state.facilities.map((e) => {
              if (e.sn === changeData.sn) {
                return { ...changeData };
              }
              return { ...e };
            });
            this.setState({ facilities: facilities });
          });
        }
      })
      .catch(() => {});
  };

  handleFacilityCreate = async (record: IFacilityObj) => {
    createFacility(record)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const add = data;
            const facilities = [...this.state.facilities, add];
            this.setState({ facilities: facilities });
          });
        }
      })
      .catch(() => {});
  };

  handleDisplayCreate = async (record: IDisplayMsgObj) => {
    createDisplay(record)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const add = data[0];
            const displayMessages = [...this.state.displayMessages, add];
            this.setState({ displayMessages: displayMessages });
          });
        }
      })
      .catch(() => {});
  };

  handleDisplayUpdate = async (record: IDisplayMsgObj) => {
    const wrapper: Array<IDisplayMsgObj> = [];
    wrapper.push(record);
    updateDisplay(wrapper)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const changeData = record;
            const displayMessages = this.state.displayMessages.map((e) => {
              if (e.sn === changeData.sn) {
                return { ...changeData };
              } else {
                return { ...e };
              }
            });
            this.setState({ displayMessages: displayMessages });
          });
        }
      })
      .catch(() => {});
  };

  render() {
    const { gates, facilities, displayMessages } = this.state;
    const { TabPane } = Tabs;

    return (
      <PageWrapper>
        <Tabs type="card">
          <TabPane tab="게이트" key="1">
            <GateTab
              gates={gates}
              loading={this.state.loading}
              onUpdate={this.handleGateUpdate}
              onCreate={this.handleGateCreate}
            />
          </TabPane>
          <TabPane tab="시설" key="2">
            <FacilityTab
              facilities={facilities}
              gates={gates}
              loading={this.state.loading}
              onUpdate={this.handleFacilityUpdate}
              onCreate={this.handleFacilityCreate}
            />
          </TabPane>
          <TabPane tab="전광판" key="3">
            <DisplayTab
              displayMsgs={displayMessages}
              loading={this.state.loading}
              onUpdate={this.handleDisplayUpdate}
              onCreate={this.handleDisplayCreate}
            />
          </TabPane>
        </Tabs>
      </PageWrapper>
    );
  }
}

export default FacilitySetting;
