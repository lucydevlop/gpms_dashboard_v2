import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import { createDisplay, getDisplayMessages, updateDisplay } from '@api/facility';
import { IGateObj } from '@models/gate';
import { runInAction } from 'mobx';
import { Tabs } from 'antd';
import { IFacilityObj } from '@models/facility';
import FacilityTab from '@views/Setting/Facility/tabs/FacilityTab';
import DisplayTab from '@views/Setting/Facility/tabs/DisplayTab';
import { IDisplayMsgObj } from '@models/display';
import GateTab from '@views/Setting/Facility/tabs/GateTab';
import { mac } from 'address';
import { inject, observer } from 'mobx-react';
import { parkinglotStore } from '@store/parkinglotStore';

interface IState {
  loading: boolean;
  gates: IGateObj[];
  facilities: IFacilityObj[];
  displayMessages: IDisplayMsgObj[];
}
@inject('localeStore', 'parkinglotStore')
@observer
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
    this.pollData();
  }

  pollData = async () => {
    this.setState({ loading: true });

    //this.setState({ gates: parkinglotStore.gateList });
    parkinglotStore
      .fetchGates()
      .then((res: any) => {
        runInAction(() => {
          this.setState({ gates: parkinglotStore.gateList });
        });
      })
      .catch(() => {});

    parkinglotStore
      .fetchFacilities()
      .then((res: any) => {
        runInAction(() => {
          this.setState({ facilities: parkinglotStore.facilities });
        });
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
  };

  handleGateUpdate = async (record: IGateObj) => {
    parkinglotStore.updateGate(record).then((res: IGateObj[]) => {
      this.setState({ gates: res });
    });
  };

  handleGateCreate = async (record: IGateObj) => {
    parkinglotStore.createGate(record).then((res: any) => {
      runInAction(() => {
        this.setState({ gates: res });
      });
    });
  };

  handleFacilityUpdate = async (record: IFacilityObj) => {
    parkinglotStore.updateFacilities(record).then((res: IFacilityObj[]) => {
      this.setState({ facilities: res });
    });
  };

  handleFacilityCreate = async (record: IFacilityObj) => {
    parkinglotStore.createFacilities(record).then((res: IFacilityObj[]) => {
      this.setState({ facilities: res });
    });
  };

  handleDisplayCreate = async (record: IDisplayMsgObj) => {
    createDisplay(record)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const displayMessages = [...this.state.displayMessages, data];
            this.setState({ displayMessages: displayMessages });
          });
        }
      })
      .catch(() => {});
  };

  handleDisplayUpdate = async (record: IDisplayMsgObj) => {
    updateDisplay(record)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const displayMessages = this.state.displayMessages.map((e) => {
              if (e.sn === data.sn) {
                return { ...data };
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
