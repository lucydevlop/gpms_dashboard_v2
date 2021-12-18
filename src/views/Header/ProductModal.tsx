import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Tabs } from 'antd';
import TicketClassTab from './tabs/TicketClassTab';
import CorpTicketClassTab from './tabs/CorpTicketClassTab';
import { ITicketClassObj } from '@models/ticketClass';
import { ICorpTicketClassObj } from '@models/corpTicketClass';

interface IProps {
  ticketClasses: ITicketClassObj[];
  corpTiketClasses: ICorpTicketClassObj[];
  loading: boolean;
}

interface IState {
  loading: boolean;
}

@inject('parkinglotStore', 'localeStore')
@observer
class ProductModal extends PureComponent<IProps, IState> {
  render() {
    const { TabPane } = Tabs;
    return (
      <>
        <Tabs type="card">
          <TabPane tab="기간정기권" key="1">
            <TicketClassTab loading={this.props.loading} ticketClasses={this.props.ticketClasses} />
          </TabPane>
          <TabPane tab="입주사할인권" key="4">
            <CorpTicketClassTab
              //discountSelectClasses={this.state.discountSelectClasses}
              corpTicketClasses={this.props.corpTiketClasses}
              //discountClasses={discountClasses}
              loading={this.props.loading}
              //onSubmit={this.handleCorpTicketClasses}
            />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default ProductModal;
