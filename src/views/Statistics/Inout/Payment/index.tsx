import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import { Tabs } from 'antd';
import InoutPaymentByDay from '@views/Statistics/Inout/Payment/tabs/InoutPaymentByDay';
import InoutPaymentByMonth from '@views/Statistics/Inout/Payment/tabs/InoutPaymentByMonth';

interface IProps {}
interface IState {}

class StatisticsInout extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { TabPane } = Tabs;
    return (
      <PageWrapper>
        <Tabs type="card">
          <TabPane tab="일자별" key="1">
            <InoutPaymentByDay />
          </TabPane>
          <TabPane tab="월별" key="2">
            <InoutPaymentByMonth />
          </TabPane>
        </Tabs>
      </PageWrapper>
    );
  }
}

export default StatisticsInout;
