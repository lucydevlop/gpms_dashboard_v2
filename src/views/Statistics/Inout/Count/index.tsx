import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import { Tabs } from 'antd';
import InoutByDay from './tabs/InoutByDay';
import InoutByMonth from '@views/Statistics/Inout/Count/tabs/InoutByMonth';

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
            <InoutByDay />
          </TabPane>
          <TabPane tab="월별" key="2">
            <InoutByMonth />
          </TabPane>
        </Tabs>
      </PageWrapper>
    );
  }
}

export default StatisticsInout;
