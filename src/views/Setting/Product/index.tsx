import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import PageWrapper from '@components/PageWrapper';
import DiscountTab from '@views/Setting/Product/tabs/DiscountTab';
import CorpTicketClassTab from '@views/Setting/Product/tabs/CorpTicketClassTab';
import TicketClassTab from '@views/Setting/Product/tabs/TicketClassTab';
import { IDiscountClassObj } from '@models/discountClass';
import { getDiscountClasses } from '@api/discountClass';
import { getCorpTicketClasses } from '@api/corpTicketClass';
import { createTicketClasses, getTicketClasses, updateTicketClasses } from '@api/ticketClass';
import { runInAction } from 'mobx';
import { ITicketClassObj } from '@models/ticketClass';
import { ICorpTicketClassObj } from '@models/corpTicketClass';

interface IProps {}
interface IState {
  loading: boolean;
  discountClasses: IDiscountClassObj[];
  ticketClasses: ITicketClassObj[];
  corpTicketClasses: ICorpTicketClassObj[];
}

class ProductSetting extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      discountClasses: [],
      ticketClasses: [],
      corpTicketClasses: []
    };
  }
  componentDidMount() {
    this.setState({ loading: true });

    getDiscountClasses()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ discountClasses: data });
          });
        }
      })
      .catch(() => {});

    getTicketClasses()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ ticketClasses: data });
          });
        }
      })
      .catch(() => {});

    getCorpTicketClasses()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ corpTicketClasses: data });
          });
        }
      })
      .catch(() => {});

    this.setState({ loading: false });
  }

  handleTicketClass = (info: ITicketClassObj) => {
    console.log('handleTicketClass', info);
    if (info.sn === null) {
      createTicketClasses(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const ticketClasses = [...this.state.ticketClasses, data];
              this.setState({ ticketClasses: ticketClasses });
            });
          }
        })
        .catch(() => {});
    } else {
      updateTicketClasses(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const ticketClasses = this.state.ticketClasses.map((t) => {
                if (t.sn === data.sn) {
                  return { ...data };
                }
                return { ...t };
              });
              this.setState({ ticketClasses: ticketClasses });
            });
          }
        })
        .catch(() => {});
    }
  };

  handleCorpTicketClasses = (info: ICorpTicketClassObj) => {
    console.log('handleCorpTicketClasses', info);
  };

  render() {
    const { TabPane } = Tabs;
    const { discountClasses, ticketClasses, corpTicketClasses } = this.state;
    return (
      <PageWrapper>
        <Tabs type="card">
          <TabPane tab="기간정기권" key="1">
            <TicketClassTab
              loading={this.state.loading}
              ticketClasses={ticketClasses}
              onSubmit={this.handleTicketClass}
            />
          </TabPane>
          {/*<TabPane tab="시간정기권" key="2">*/}
          {/*  <TimePassTab />*/}
          {/*</TabPane>*/}
          <TabPane tab="할인/감면" key="3">
            <DiscountTab discountClasses={discountClasses} loading={this.state.loading} />
          </TabPane>
          <TabPane tab="입주사할인권" key="4">
            <CorpTicketClassTab
              corpTicketClasses={corpTicketClasses}
              loading={this.state.loading}
              onSubmit={this.handleCorpTicketClasses}
            />
          </TabPane>
          <TabPane tab="바코드할인권" key="5">
            <CorpTicketClassTab
              corpTicketClasses={corpTicketClasses}
              loading={this.state.loading}
              onSubmit={this.handleCorpTicketClasses}
            />
          </TabPane>
        </Tabs>
      </PageWrapper>
    );
  }
}

export default ProductSetting;
