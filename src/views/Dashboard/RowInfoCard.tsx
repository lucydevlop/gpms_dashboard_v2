import React from 'react';
import { Row, Col, Card, Badge, Button } from 'antd';
import { IDashboardObj } from '@models/dashboard';
import { IMAGE_SIZES, ImageWrapper } from '@/components/ImageWrapper';
import emptyImage from './images/empty.svg';
import { conversionEnumValue } from '@utils/conversion';
import { breakerStatusOpt, gateTypeOpt } from '@/constants/list';
import zdsTips from '@utils/tips';
import { localeStore } from '@store/localeStore';
import { actionReset } from '@api/dashboard';

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
      <>
        <Badge color={status === 'NORMAL' ? '#33CA65' : '#FE1100'} style={{ paddingLeft: '5px' }} />
        <span
          style={{ paddingRight: '2px', color: '#85868A' }}
          onClick={() => this.handleResetClick(category)}
        >
          {name}
        </span>
      </>
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
            <Row style={{ backgroundColor: '#EBECEC' }}>
              <Card
                style={{ padding: 0, backgroundColor: '#EBECEC' }}
                bodyStyle={{ padding: '0.2vw 0.4vw' }}
                bordered={false}
              >
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
              </Card>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
              <Button>열 림</Button>
              <Button>열림고정</Button>
              <Button>닫 힘</Button>
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
          headStyle={{ padding: '0 2vw' }}
          title={this.renderTitle()}
          className="fat-card monitor-list-card"
          bordered={false}
          hoverable
          cover={
            this.props.item.image ? (
              <ImageWrapper
                size={IMAGE_SIZES.SMALL}
                style={{ width: '200px' }}
                url={`${process.env.REACT_APP_BACKEND_URL}/${this.props.item.image}`}
              />
            ) : // <ImageWrapper size={IMAGE_SIZES.SMALL} style={{ width: '200px' }} url={emptyImage} />
            null
          }
        />
      </>
    );
  }
}
export default RowInfoCard;
