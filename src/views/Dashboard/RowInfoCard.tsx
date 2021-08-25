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

class RowInfoCard extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      parkingLots: []
    };

    this.initializeState = this.initializeState.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.initializeState();
  }

  initializeState = () => {
    let image = 24;
    for (let index = 1; index < 26; index++) {
      // @ts-ignore
      import(`../../assets/images/gallery/24.webp`).then((res) => {
        this.setState((parkingLots: any) => ({ ...parkingLots, [index]: res.default }));
      });
    }
  };

  componentDidMount() {
    this.setState(() => ({
      loading: false
    }));
  }

  handleResetClick(name: string) {
    const { localeObj } = localeStore;
    zdsTips.confirm(localeObj['alert.cs.complete'] || name + ' 리셋 하시겠습니까?', () => {
      actionReset(this.props.item.gateId, name).then((res: any) => {
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
          onClick={() => this.handleResetClick(category)}
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
              <span style={{ fontSize: '1.1vw' }}>{this.props.item.gateName}</span>
              <span style={{ fontSize: '1vw', color: gateType.color }}>({gateType.label})</span>
            </Row>
            <Row>
              <span style={{ fontSize: '1vw', color: breakerStatus.color }}>
                {breakerStatus.label}
              </span>
            </Row>
          </Col>
          <Col span={16}>
            <Row style={{ backgroundColor: '#EBECEC', justifyContent: 'center' }}>
              <Card
                style={{ padding: 0, backgroundColor: '#EBECEC', fontSize: '.9vw' }}
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
                        '차단기',
                        this.props.item.paystationStatus ? this.props.item.paystationStatus : 'NONE'
                      )
                    : null}
                </Row>
              </Card>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
              <Button
                size="large"
                style={{
                  backgroundColor: '#5C9AD2',
                  letterSpacing: '1px',
                  fontWeight: 700,
                  color: '#fff',
                  borderRadius: '5px'
                }}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  this.handleGateActionClick(e, 'open');
                }}
              >
                열 림
              </Button>
              <Button
                size="large"
                style={{
                  backgroundColor: '#A7A7A7',
                  letterSpacing: '1px',
                  fontWeight: 700,
                  color: '#fff',
                  borderRadius: '5px'
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
                size="large"
                style={{
                  backgroundColor: '#FF7C86',
                  letterSpacing: '1px',
                  fontWeight: 700,
                  color: '#fff',
                  borderRadius: '5px'
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
          cover={
            this.props.item.image ? (
              <Image
                src={`${process.env.REACT_APP_IMAGE_URL}/${this.props.item.image}`}
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
            )
          }
        >
          <Descriptions
            layout="vertical"
            bordered
            labelStyle={{ fontWeight: 600, textAlign: 'center' }}
            style={{ textAlign: 'center' }}
          >
            <Descriptions.Item label="차량구분">
              {
                conversionEnumValue(
                  this.props.item.carType ? this.props.item.carType : 'NONE',
                  ticketTypeOpt
                ).label
              }
            </Descriptions.Item>
            <Descriptions.Item label="차량번호">{this.props.item.vehicleNo}</Descriptions.Item>
            <Descriptions.Item label="시간">
              {conversionDateTime(this.props.item.date, '{y}-{m}-{d} {h}:{i}') || '--'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </>
    );
  }
}
export default RowInfoCard;
