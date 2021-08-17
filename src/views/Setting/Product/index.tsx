import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import PageWrapper from '@components/PageWrapper';
import TimePassTab from '@views/Setting/Product/tabs/TimePassTab';
import DiscountTab from '@views/Setting/Product/tabs/DiscountTab';
import TenantDiscountTab from '@views/Setting/Product/tabs/TenantDiscountTab';
import TermPassTab from '@views/Setting/Product/tabs/TermPassTab';
import { IDiscountClassObj } from '@models/discountClass';
import { getDiscountClasses } from '@api/discountClass';
import { runInAction } from 'mobx';

interface IProps {}
interface IState {
  loading: boolean;
  discountClasses: IDiscountClassObj[];
}

class ProductSetting extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      discountClasses: []
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
    this.setState({ loading: false });
  }

  render() {
    const { TabPane } = Tabs;
    const { discountClasses } = this.state;
    return (
      <PageWrapper>
        <Tabs type="card">
          <TabPane tab="기간정기권" key="1">
            <TermPassTab />
          </TabPane>
          <TabPane tab="시간정기권" key="2">
            <TimePassTab />
          </TabPane>
          <TabPane tab="할인/감면" key="3">
            <DiscountTab discountClasses={discountClasses} loading={this.state.loading} />
          </TabPane>
          <TabPane tab="입주사할인권" key="4">
            <TenantDiscountTab />
          </TabPane>
        </Tabs>
      </PageWrapper>
    );
  }
}

export default ProductSetting;
