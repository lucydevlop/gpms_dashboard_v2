import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import {
  createDisplay,
  deleteDisplayMessage,
  getDisplay,
  updateDisplay,
  updateDisplayInfo
} from '@api/facility';
import { IGateObj } from '@models/gate';
import { runInAction } from 'mobx';
import { Tabs } from 'antd';
import { IFacilityObj } from '@models/facility';
import FacilityTab from '@views/Setting/Facility/tabs/FacilityTab';
import DisplayTab from '@views/Setting/Facility/tabs/DisplayTab';
import { IDisplayColorObj, IDisplayInfoObj, IDisplayMsgObj } from '@models/display';
import GateTab from '@views/Setting/Facility/tabs/GateTab';
import { inject, observer } from 'mobx-react';
import { parkinglotStore } from '@store/parkinglotStore';

interface IState {
  loading: boolean;
  gates: IGateObj[];
  facilities: IFacilityObj[];
  displayInfo?: IDisplayInfoObj | null;
  displayMessage: IDisplayMsgObj[];
  displayColor: IDisplayColorObj[];
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
      displayMessage: [],
      displayColor: []
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

    getDisplay()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({
              displayColor: data.colors,
              displayMessage: data.messages,
              displayInfo: data.info
            });
          });
        }
      })
      .catch(() => {});

    this.setState({ loading: false });
  };

  handleGateUpdate = async (record: IGateObj) => {
    parkinglotStore.updateGate(record).then((res: IGateObj[]) => {
      this.setState({ gates: res }, () => this.pollData());
    });
  };

  handleGateDelete = async (sn: number) => {
    parkinglotStore.deleteGate(sn).then((res: IGateObj[]) => {
      this.setState({ gates: res }, () => this.pollData());
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

  handleFacilityDelete = async (sn: number) => {
    parkinglotStore.deleteFacilities(sn).then((res: IFacilityObj[]) => {
      this.setState({ facilities: res });
    });
  };

  handleFacilityCreate = async (record: IFacilityObj) => {
    record.facilitiesId = record.dtFacilitiesId;
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
            const displayMessages = [...this.state.displayMessage, data];
            this.setState({ displayMessage: displayMessages });
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
            const displayMessages = this.state.displayMessage.map((e) => {
              if (e.sn === data.sn) {
                return { ...data };
              } else {
                return { ...e };
              }
            });
            this.setState({ displayMessage: displayMessages });
          });
        }
      })
      .catch(() => {});
  };

  handleDisplayDelete = async (record: IDisplayMsgObj) => {
    deleteDisplayMessage(record)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const displayMessages = this.state.displayMessage.map((e) => {
              if (e.sn === data.sn) {
                return { ...data };
              } else {
                return { ...e };
              }
            });
            this.setState({ displayMessage: displayMessages });
          });
        }
      })
      .catch(() => {});
  };

  handleDisplayInfo = async (record: IDisplayInfoObj) => {
    updateDisplayInfo(record)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ displayInfo: data });
          });
        }
      })
      .catch(() => {});
  };

  render() {
    const { gates, facilities, displayMessage, displayInfo } = this.state;
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
              onDelete={this.handleGateDelete}
            />
          </TabPane>
          <TabPane tab="시설" key="2">
            <FacilityTab
              facilities={facilities}
              gates={gates}
              loading={this.state.loading}
              onUpdate={this.handleFacilityUpdate}
              onCreate={this.handleFacilityCreate}
              onDelete={this.handleFacilityDelete}
            />
          </TabPane>
          <TabPane tab="전광판" key="3">
            <DisplayTab
              displayMsgs={displayMessage}
              displayInfo={displayInfo ? displayInfo : null}
              loading={this.state.loading}
              onUpdate={this.handleDisplayUpdate}
              onCreate={this.handleDisplayCreate}
              onDelete={this.handleDisplayDelete}
              onDisplayInfo={this.handleDisplayInfo}
            />
          </TabPane>
        </Tabs>
      </PageWrapper>
    );
  }
}

export default FacilitySetting;
