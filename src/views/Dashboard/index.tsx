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

interface IDashboardState {
  loading: boolean;
  parkinglot?: IParkinglotObj | null;
  dashboardObjs: IDashboardObj[];
}

@inject('localeStore', 'parkinglotStore')
@observer
class Dashboard extends React.Component<any, IDashboardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      dashboardObjs: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    parkinglotStore.get().then(() => {
      runInAction(() => {
        this.setState({ parkinglot: parkinglotStore.parkinglot });
      });
    });
    this.pollData();
  }

  async pollData() {
    getDashboardGateStatus()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ dashboardObjs: data });
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

  render() {
    const { localeObj } = localeStore;
    return (
      <div className="dashboard">
        <Row gutter={24}>
          {this.state.dashboardObjs.map((item, index) => (
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <RowInfoCard item={item} key={index} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Dashboard;
