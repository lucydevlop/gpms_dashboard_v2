import React from 'react';
import { Col, Modal, Row } from 'antd';
import RowInfoCard from '@views/Dashboard/RowInfoCard';
import { getDashboardGateStatus } from '@api/dashboard';
import { runInAction } from 'mobx';
import { localeStore } from '@store/localeStore';
import { inject, observer } from 'mobx-react';
import { IDashboardObj } from '@models/dashboard';
import { parkinglotStore } from '@store/parkinglotStore';
import { IParkinglotObj } from '@models/parkinglot';
import PageWrapper from '@components/PageWrapper';

interface IDashboardState {
  loading: boolean;
  parkinglot?: IParkinglotObj | null;
  dashboardObjs: IDashboardObj[];
}

@inject('localeStore', 'parkinglotStore')
@observer
class Dashboard extends React.Component<{ history: any }, IDashboardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      dashboardObjs: []
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    parkinglotStore.get().then(() => {
      runInAction(() => {
        this.setState({ parkinglot: parkinglotStore.parkinglot });
      });
    });
    this.pollData().then((r) => this.setState({ loading: false }));
  }

  async pollData() {
    getDashboardGateStatus()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ dashboardObjs: data });
            // console.log(this.state.dashboardObjs);
          });
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });

    setTimeout(() => {
      this.pollData();
    }, 3000);
  }

  renderGate(item: IDashboardObj, index: number) {
    if (item.gateType === 'IN_OUT') {
      return (
        <Col xl={24} lg={24} md={24} sm={24} xs={24} key={index}>
          <RowInfoCard item={item} key={index} />
        </Col>
      );
    }
    return (
      <Col xl={12} lg={12} md={24} sm={24} xs={24} key={index}>
        <RowInfoCard item={item} key={index} />
      </Col>
    );
  }

  render() {
    const { localeObj } = localeStore;
    return (
      <PageWrapper>
        <Row gutter={24}>
          {this.state.dashboardObjs
            .filter((d) => d.gateType !== 'ETC')
            .map((item, index) => this.renderGate(item, index))}
        </Row>
      </PageWrapper>
    );
  }
}

export default Dashboard;
