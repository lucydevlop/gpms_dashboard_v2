import React, { PureComponent } from 'react';
import { ICorpTicketObj } from '@models/corp';
import { Card, Row } from 'antd';
import moment from 'moment';

interface IProps {
  ableTickets: ICorpTicketObj[];
}
interface IState {}

class TicketSummary extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
  }
  renderTicketList() {
    const rows = this.props.ableTickets.map((t) => {
      return (
        <Row style={{ marginBottom: '7px' }}>
          <Card style={{ width: '100%' }} title={t.discountClass.discountNm}>
            <Row style={{ justifyContent: 'space-between', display: 'flex', marginBottom: '5px' }}>
              <div>금일 사용</div>
              <div>{t.todayUse}</div>
            </Row>
            <Row style={{ justifyContent: 'space-between', display: 'flex' }}>
              <div>잔여</div>
              <div>
                <span style={{ color: '#0050AD' }}>{t.ableCnt}</span>&nbsp;/&nbsp;{t.totalCnt}
              </div>
            </Row>
          </Card>
        </Row>
      );
    });

    return <>{rows}</>;
  }

  render() {
    const date = moment(new Date()).format('yyyy-MM-DD HH:mm');
    const title = (
      <div style={{ justifyContent: 'space-between', display: 'flex' }}>
        <div style={{ color: '#294365', fontWeight: 600 }}>할인 현황</div>
        <div style={{ color: '#606060', fontWeight: 600, fontSize: '.8rem' }}>{date}</div>
      </div>
    );
    return (
      <Row
        style={{
          marginTop: '10px',
          border: '1px solid #777A8B',
          backgroundColor: '#fff',
          justifyContent: 'center',
          borderRadius: '3px',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)'
        }}
      >
        <Card style={{ width: '100%' }} title={title}>
          {this.renderTicketList()}
        </Card>
      </Row>
    );
  }
}

export default TicketSummary;
