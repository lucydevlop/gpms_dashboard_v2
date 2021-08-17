import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import { getDisplayMessages, getFacilities, getGates, updateGate } from '@api/facility';
import { IGateObj } from '@models/gate';
import { runInAction } from 'mobx';
import { Tabs } from 'antd';
import { IFacilityObj } from '@models/facility';
import FacilityTab from '@views/Setting/Facility/tabs/FacilityTab';
import DisplayTab from '@views/Setting/Facility/tabs/DisplayTab';
import { IDisplayMsgObj } from '@models/display';
import GateTab from '@views/Setting/Facility/tabs/GateTab';

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

  handleUpdate = async (record: IGateObj) => {
    console.log('handleUpdate', record);
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

  handleDelete = async (record: IGateObj) => {
    console.log('handleSave', record);
  };

  render() {
    const { gates, facilities, displayMessages } = this.state;
    const { TabPane } = Tabs;

    return (
      <PageWrapper>
        <Tabs type="card">
          <TabPane tab="게이트" key="1">
            <GateTab gates={gates} loading={this.state.loading} onUpdate={this.handleUpdate} />
          </TabPane>
          <TabPane tab="시설" key="2">
            <FacilityTab facilities={facilities} gates={gates} loading={this.state.loading} />
          </TabPane>
          <TabPane tab="전광판" key="3">
            <DisplayTab displayMsgs={displayMessages} />
          </TabPane>
        </Tabs>
      </PageWrapper>
    );
  }
}

export default FacilitySetting;
