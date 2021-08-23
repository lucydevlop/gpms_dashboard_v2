import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import PageWrapper from '@components/PageWrapper';
import TimePassTab from '@views/Setting/Product/tabs/TimePassTab';
import DiscountTab from '@views/Setting/Product/tabs/DiscountTab';
import TenantDiscountTab from '@views/Setting/Product/tabs/TenantDiscountTab';
import TicketClassTab from '@views/Setting/Product/tabs/TicketClassTab';
import { IDiscountClassObj } from '@models/discountClass';
import { getDiscountClasses } from '@api/discountClass';
import { createTicketClasses, getTicketClasses, updateTicketClasses } from '@api/ticketClass';
import { runInAction } from 'mobx';
import { ITicketClassObj } from '@models/ticketClass';

interface IProps {}
interface IState {
  loading: boolean;
  discountClasses: IDiscountClassObj[];
  ticketClasses: ITicketClassObj[];
}

class ProductSetting extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      discountClasses: [],
      ticketClasses: []
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

  render() {
    const { TabPane } = Tabs;
    const { discountClasses, ticketClasses } = this.state;
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
            <TenantDiscountTab />
          </TabPane>
          <TabPane tab="바코드할인권" key="5">
            <TenantDiscountTab />
          </TabPane>
        </Tabs>
      </PageWrapper>
    );
  }
}

export default ProductSetting;
