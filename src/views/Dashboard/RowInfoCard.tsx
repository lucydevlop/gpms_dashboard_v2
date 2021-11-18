import React from 'react';
import { Row, Col, Card, Badge, Button, Descriptions } from 'antd';
import { IDashboardObj } from '@models/dashboard';
import Image from '@/components/ImageWrapper';
import emptyImage from './images/empty.svg';
import { conversionDateTime, conversionEnumValue } from '@utils/conversion';
import { breakerStatusOpt, EGateType, gateTypeOpt, ticketTypeOpt } from '@/constants/list';
import zdsTips from '@utils/tips';
import { localeStore } from '@store/localeStore';
import { actionGate, actionReset } from '@api/dashboard';
import { ICorpTicketObj } from '@models/corpTicket';

interface InfoCardProps {
  icon: any;
  title: string;
  num: string | number;
  index?: string | number;
}

interface IProps {
  item: IDashboardObj;
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

  UNSAFE_componentWillMount() {
    this.setState({ item: this.props.item });
  }

  UNSAFE_componentWillReceiveProps(props: IProps) {
    if (props.item !== this.props.item) {
      this.setState({ item: this.props.item });
    }
  }

  // componentDidUpdate() {
  //   this.setState({ item: this.props.item });
  // }

  // componentDidUpdate(prevProps: { item: IDashboardObj }, prevState: any) {
  //   if (this.props.item !== prevProps.item) {
  //     this.setState({ item: this.props.item });
  //   }
  // }

  handleResetClick(name: string, category: string) {
    if (name === '전광판') return;
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

  titleStatus() {
    if (!this.state.item) return;

    const { item } = this.state;

    if (item?.gateType == EGateType.INOUT) {
      return (
        <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
          {this.renderFacilityStatus('입구LPR', item.inLprStatus ? item.inLprStatus : 'NONE')}
          {this.renderFacilityStatus('출구LPR', item.outLprStatus ? item.outLprStatus : 'NONE')}
          {this.renderFacilityStatus(
            '입구전광판',
            item.inDisplayStatus ? item.inDisplayStatus : 'NONE'
          )}
          {this.renderFacilityStatus(
            '출구전광판',
            item.outDisplayStatus ? item.outDisplayStatus : 'NONE'
          )}
          {this.renderFacilityStatus('차단기', item.breakerStatus ? item.breakerStatus : 'NONE')}
          {item.paystationStatus !== 'NONE'
            ? this.renderFacilityStatus(
                '정산기',
                item.paystationStatus ? item.paystationStatus : 'NONE'
              )
            : null}
        </Row>
      );
    }
    return (
      <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
        {this.renderFacilityStatus('LPR', item.lprStatus ? item.lprStatus : 'NONE')}
        {this.renderFacilityStatus('전광판', item.displayStatus ? item.displayStatus : 'NONE')}
        {this.renderFacilityStatus('차단기', item.breakerStatus ? item.breakerStatus : 'NONE')}
        {item.paystationStatus !== 'NONE' && item.gateType !== 'IN'
          ? this.renderFacilityStatus(
              '정산기',
              item.paystationStatus ? item.paystationStatus : 'NONE'
            )
          : null}
      </Row>
    );
  }
  renderTitle() {
    if (!this.state.item) return;

    const { item } = this.state;

    const gateType = conversionEnumValue(item.gateType, gateTypeOpt);
    const breakerStatus = conversionEnumValue(
      item.breakerAction ? item.breakerAction : 'NONE',
      breakerStatusOpt
    );
    return (
      <>
        <Row gutter={24}>
          <Col span={8}>
            <Row>
              <span style={{ fontSize: '18px' }}>{item.gateName}</span>
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
                {this.titleStatus()}
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
                    item.breakerAction === 'UPLOCK' ? 'unlock' : 'uplock'
                  );
                }}
              >
                {item.breakerAction === 'UPLOCK' ? '고정해제' : '열림고정'}
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
    if (!this.state.item) return;

    return (
      <>
        <Card
          headStyle={{ padding: '0 2vw 20px 2vw' }}
          title={this.renderTitle()}
          className="fat-card monitor-list-card"
          bordered={false}
          hoverable
        >
          {this.state.item.gateType === 'IN_OUT' ? (
            <Row>
              <Col span={12} style={{ padding: '5px 15px' }}>
                <div>
                  {'입차'}
                  {/*{this.state.item ? (*/}
                  {this.state.item.image ? (
                    <Image
                      src={`${this.state.item.image}`}
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
                        this.state.item.carType ? this.state.item.carType : 'NONE',
                        ticketTypeOpt
                      ).label
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label="차량번호" style={{ textAlign: 'center' }}>
                    {this.state.item.vehicleNo}
                  </Descriptions.Item>
                  <Descriptions.Item label="시간" style={{ textAlign: 'center' }}>
                    {conversionDateTime(this.state.item.date, '{y}-{m}-{d} {h}:{i}') || '--'}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={12} style={{ padding: '5px 15px' }}>
                <div>
                  {'출차'}
                  {/*{this.state.item ? (*/}
                  {this.state.item.outImage ? (
                    <Image
                      src={`${this.state.item.outImage}`}
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
                        this.state.item.outCarType ? this.state.item.outCarType : 'NONE',
                        ticketTypeOpt
                      ).label
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label="차량번호" style={{ textAlign: 'center' }}>
                    {this.state.item.outVehicleNo}
                  </Descriptions.Item>
                  <Descriptions.Item label="시간" style={{ textAlign: 'center' }}>
                    {conversionDateTime(
                      this.state.item.outDate ? this.state.item.outDate : 0,
                      '{y}-{m}-{d} {h}:{i}'
                    ) || '--'}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          ) : (
            <>
              <div>
                {/*{this.state.item ? (*/}
                {this.state.item.image ? (
                  <Image
                    src={`${this.state.item.image}`}
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
                      this.state.item.carType ? this.state.item.carType : 'NONE',
                      ticketTypeOpt
                    ).label
                  }
                </Descriptions.Item>
                <Descriptions.Item label="차량번호" style={{ textAlign: 'center' }}>
                  {this.state.item.vehicleNo}
                </Descriptions.Item>
                <Descriptions.Item label="시간" style={{ textAlign: 'center' }}>
                  {conversionDateTime(this.state.item.date, '{y}-{m}-{d} {h}:{i}') || '--'}
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
        </Card>
      </>
    );
  }
}
export default RowInfoCard;
