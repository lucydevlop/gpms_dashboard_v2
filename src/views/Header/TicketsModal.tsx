import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Tabs } from 'antd';
import SeasonTicketTab from '@views/Header/tabs/SeasonTicketTab';
import FreeTicketTab from '@views/Header/tabs/FreeTicketTab';
import VisitorTicketTab from '@views/Header/tabs/VisitorTicketTab';

interface IProps {}
interface IState {}

@inject('localeStore')
@observer
class TicketsModal extends PureComponent<IProps, IState> {
  render() {
    const { TabPane } = Tabs;
    return (
      <>
        <Tabs type="card">
          <TabPane tab="유료정기권" key="1">
            <SeasonTicketTab />
          </TabPane>
          <TabPane tab="무료정기권" key="2">
            <FreeTicketTab />
          </TabPane>
          <TabPane tab="방문권" key="3">
            <VisitorTicketTab />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default TicketsModal;
