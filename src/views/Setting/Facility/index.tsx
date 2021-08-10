import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import { getDisplayMessages, getFacilities, getGates } from '@api/facility';
import { IGateObj } from '@models/gate';
import { runInAction } from 'mobx';
import { EditableList } from '@components/EditTable';
import { IInoutObj } from '@models/inout';
import StandardTable from '@components/StandardTable';
import { Button, Divider, Tabs } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import {
  getActionsColumn,
  getColumn,
  getEditableColumn
} from '@components/EditTable/columnHelpers';
import { DeleteOutlined } from '@ant-design/icons';
import { IFacilityObj } from '@models/facility';
import FacilityTab from '@views/Setting/Facility/tabs/FacilityTab';
import DisplayTab from '@views/Setting/Facility/tabs/DisplayTab';
import { IDisplayMsgObj } from '@models/display';

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
  }

  handleSave = async (record: IGateObj) => {
    console.log('handleSave', record);
  };

  handleDelete = async (record: IGateObj) => {
    console.log('handleSave', record);
  };

  render() {
    const renderActions = (info: IGateObj): JSX.Element => {
      return (
        <Button
          type={'default'}
          icon={<DeleteOutlined />}
          onClick={() => this.handleDelete(info)}
        />
      );
    };
    const columns: ColumnsType<IGateObj> = [
      getColumn('게이트 ID', 'gateId'),
      getEditableColumn('게이트이름', 'gateName', this.handleSave, 'text'),
      getEditableColumn('게이트타입', 'gateType', this.handleSave, 'text'),
      getColumn('Relay', 'relaySvr'),
      getActionsColumn(renderActions)
    ];
    const { gates, facilities, displayMessages } = this.state;
    const { TabPane } = Tabs;

    return (
      <PageWrapper>
        <Tabs type="card">
          <TabPane tab="게이트" key="1">
            <EditableList<IGateObj>
              columns={columns}
              entries={gates}
              rowKeySelector={(row: IGateObj) => row.gateId}
            />
          </TabPane>
          <TabPane tab="시설" key="2">
            <FacilityTab facilities={facilities} />
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
