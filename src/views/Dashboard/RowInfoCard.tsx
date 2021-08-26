import React from 'react';
import { Row, Col, Card, Badge, Button, Descriptions } from 'antd';
import { IDashboardObj } from '@models/dashboard';
import Image from '@/components/ImageWrapper';
import emptyImage from './images/empty.svg';
import { conversionDateTime, conversionEnumValue } from '@utils/conversion';
import { breakerStatusOpt, gateTypeOpt, ticketTypeOpt } from '@/constants/list';
import zdsTips from '@utils/tips';
import { localeStore } from '@store/localeStore';
import { actionGate, actionReset } from '@api/dashboard';
import { ICorpTicketObj } from '@models/corp';

interface InfoCardProps {
  icon: any;
  title: string;
  num: string | number;
  index?: string | number;
}

interface IProps {
  item: IDashboardObj;
  key: number;
}

interface IState {
  item?: IDashboardObj;
}

class RowInfoCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({ item: this.props.item });
  }

  componentDidUpdate(prevProps: { item: IDashboardObj }, prevState: any) {
    if (this.props.item !== prevProps.item) {
      this.setState({ item: this.props.item });
    }
  }

  handleResetClick(name: string, category: string) {
    const { localeObj } = localeStore;
    zdsTips.confirm(localeObj['alert.cs.complete'] || name + ' 리셋 하시겠습니까?', () => {
      actionReset(this.props.item.gateId, category).then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
        }
      });
    });
  }

  handleGateActionClick(e: React.MouseEvent<HTMLDivElement>, action: string) {
    if (e && e.stopPropagation) e.stopPropagation();
    if (this.props.item.breakerAction === 'XUPLOCK') {
      zdsTips.error('수동 열림고정은 해제 할 수 없습니다');
      return;
    }

    actionGate(this.props.item.gateId, action).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
      }
    });
  }

  renderFacilityStatus(name: string, status: string) {
    let category: string;
    switch (name) {
      case '차단기':
        category = 'BREAKER';
        break;
      case '정산기':
        category = 'PAYSTATION';
        break;
      case '전광판':
        category = 'DISPLAY';
        break;
      default:
        category = 'LPR';
        break;
    }
    return (
      <div style={{ display: 'flex', margin: '0 5px' }}>
        <h5>
          <Badge
            color={status === 'NORMAL' ? '#33CA65' : '#FE1100'}
            style={{ paddingLeft: '5px' }}
          />
        </h5>
        <span
          style={{ paddingRight: '2px', color: '#85868A' }}
          onClick={() => this.handleResetClick(name, category)}
        >
          {name}
        </span>
      </div>
    );
  }

  renderTitle() {
    const gateType = conversionEnumValue(this.props.item.gateType, gateTypeOpt);
    const breakerStatus = conversionEnumValue(
      this.props.item.breakerAction ? this.props.item.breakerAction : 'NONE',
      breakerStatusOpt
    );
    return (
      <>
        <Row gutter={24}>
          <Col span={8}>
            <Row>
              <span style={{ fontSize: '18px' }}>{this.props.item.gateName}</span>
              <span style={{ fontSize: '17px', color: gateType.color }}>({gateType.label})</span>
            </Row>
            <Row>
              <span style={{ fontSize: '15px', color: breakerStatus.color }}>
                {breakerStatus.label}
              </span>
            </Row>
          </Col>
          <Col span={16}>
            <Row style={{ backgroundColor: '#EBECEC', justifyContent: 'center' }}>
              <Card
                style={{ padding: 0, backgroundColor: '#EBECEC', fontSize: '14px' }}
                bodyStyle={{ padding: '0.2vw 0.4vw' }}
                bordered={false}
              >
                <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                  {this.renderFacilityStatus(
                    'LPR',
                    this.props.item.lprStatus ? this.props.item.lprStatus : 'NONE'
                  )}
                  {this.renderFacilityStatus(
                    '전광판',
                    this.props.item.displayStatus ? this.props.item.displayStatus : 'NONE'
                  )}
                  {this.renderFacilityStatus(
                    '차단기',
                    this.props.item.breakerStatus ? this.props.item.breakerStatus : 'NONE'
                  )}
                  {this.props.item.paystationStatus && this.props.item.gateType !== 'IN'
                    ? this.renderFacilityStatus(
                        '정산기',
                        this.props.item.paystationStatus ? this.props.item.paystationStatus : 'NONE'
                      )
                    : null}
                </Row>
              </Card>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
              <Button
                size="middle"
                style={{
                  backgroundColor: '#5C9AD2',
                  letterSpacing: '1px',
                  fontWeight: 700,
                  color: '#fff',
                  borderRadius: '3px'
                }}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  this.handleGateActionClick(e, 'open');
                }}
              >
                열 림
              </Button>
              <Button
                size="middle"
                style={{
                  backgroundColor: '#A7A7A7',
                  letterSpacing: '1px',
                  fontWeight: 700,
                  color: '#fff',
                  borderRadius: '3px'
                }}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  this.handleGateActionClick(
                    e,
                    this.props.item.breakerAction === 'UPLOCK' ? 'unlock' : 'uplock'
                  );
                }}
              >
                {this.props.item.breakerAction === 'UPLOCK' ? '고정해제' : '열림고정'}
              </Button>
              <Button
                size="middle"
                style={{
                  backgroundColor: '#FF7C86',
                  letterSpacing: '1px',
                  fontWeight: 700,
                  color: '#fff',
                  borderRadius: '3px'
                }}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  this.handleGateActionClick(e, 'close');
                }}
              >
                닫 힘
              </Button>
            </Row>
          </Col>
        </Row>
      </>
    );
  }

  render() {
    if (!this.props.item) return;

    return (
      <>
        <Card
          headStyle={{ padding: '0 2vw 20px 2vw' }}
          title={this.renderTitle()}
          className="fat-card monitor-list-card"
          bordered={false}
          hoverable
        >
          <div>
            {/*{this.state.item ? (*/}
            {this.props.item.image ? (
              <Image
                src={`${this.props.item.image}`}
                ratio={1.8}
                // src={
                //   'http://192.168.20.201:3000/park/save/2021-08-06/GLNT001_FCL0000003_83263%EB%9D%BC3206.jpg'
                // }
              />
            ) : (
              <Image
                ratio={1.8}
                // @ts-ignore
                src={emptyImage}
              />
            )}
            {/*// ) : null}*/}
          </div>
          <Descriptions
            layout="vertical"
            bordered
            labelStyle={{ fontWeight: 600, textAlign: 'center' }}
            style={{ textAlign: 'center' }}
          >
            <Descriptions.Item label="차량구분" style={{ textAlign: 'center' }}>
              {
                conversionEnumValue(
                  this.props.item.carType ? this.props.item.carType : 'NONE',
                  ticketTypeOpt
                ).label
              }
            </Descriptions.Item>
            <Descriptions.Item label="차량번호" style={{ textAlign: 'center' }}>
              {this.props.item.vehicleNo}
            </Descriptions.Item>
            <Descriptions.Item label="시간" style={{ textAlign: 'center' }}>
              {conversionDateTime(this.props.item.date, '{y}-{m}-{d} {h}:{i}') || '--'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </>
    );
  }
}
export default RowInfoCard;
