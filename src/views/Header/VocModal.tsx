import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Image,
  Input,
  Row,
  Select,
  Space
} from 'antd';
import { Form } from '@ant-design/compatible';
import { parkinglotStore } from '@store/parkinglotStore';
import {
  calcParkinglotInout,
  createInout,
  getInoutDetail,
  getInoutPayment,
  getInoutPayments,
  getInouts,
  transferParkinglotInout
} from '@api/Inout';
import { runInAction } from 'mobx';
import {
  IInoutDiscountApplyObj,
  IInoutObj,
  IInoutPaymentSelectReq,
  IInoutSelectReq
} from '@models/inout';
import { IFacilityObj } from '@models/facility';
import moment from 'moment';
import {
  discountApplyTypeOpt,
  ECategory,
  EDelYn,
  EInoutType,
  ETicketType,
  paymentTypeOpt,
  resultTypeOpt,
  ticketTypeOpt
} from '@/constants/list';
import { IDiscountClassObj } from '@models/discountClass';
import StandardTable from '@components/StandardTable';
import { ColumnProps } from 'antd/lib/table';
import { localeStore } from '@store/localeStore';
import zdsTips from '@utils/tips';
import {
  conversionDateTime,
  conversionEnumValue,
  convertNumberWithCommas,
  convertStringToDateTime,
  toHHMM
} from '@utils/conversion';
import DraggableModal from '@components/DraggableModal';
import FacilityModal from './FacilityModal';
import { actionFacility, getFacilities } from '@api/facility';
import UnRecognizeModal from './UnRecognizeModal';
import InoutListModal from './InoutListModal';
import { IFareObj } from '@models/fare';
import FareModal from './FareModal';
import ProductModal from './ProductModal';
import { IParkinglotObj } from '@models/parkinglot';
import { getDiscountClasses } from '@api/discountClass';
import InoutCreateModal from '@views/Inout/List/Modal/InoutCreateModal';
import { getFares } from '@api/fare';
import { getCorpTicketClasses } from '@api/corpTicketClass';
import { ICorpTicketClassObj } from '@models/corpTicketClass';
import { ITicketClassObj } from '@models/ticketClass';
import { getTicketClasses } from '@api/ticketClass';
import TicketsModal from '@views/Header/TicketsModal';
import { IInoutPaymentObj } from '@models/inoutPayment';
import ReceiptModal from '@views/Header/ReceiptModal';
import InoutPayment from '@views/Inout/Payment';
import ReceiptListModal from '@views/Header/ReceiptListModal';
import { timePickerFormat } from '@/constants';

const { Option } = Select;

interface IProps extends FormComponentProps {}

interface IState {
  searchParam?: IInoutSelectReq;
  facility?: IFacilityObj;
  facilities: IFacilityObj[];
  inGates: any[];
  outGates: any[];
  loading: boolean;
  list: IInoutObj[];
  selected?: IInoutObj | null;
  selectedDiscountClass: IDiscountClassObj[];
  discounts: any[];
  discountClasses: IDiscountClassObj[];
  isCalc: boolean;
  createInoutModal: boolean;
  ticketModal: boolean;
  facilityModal: boolean;
  unRecognizeModal: boolean;
  inoutSelectModal: boolean;
  fareModal: boolean;
  productModal: boolean;
  fare?: IFareObj;
  parkinglot: IParkinglotObj | null;
  corpTicketClasses: ICorpTicketClassObj[];
  ticketClasses: ITicketClassObj[];
  inoutPayment: IInoutPaymentObj[];
  selectedPayment?: IInoutPaymentObj;
  receiptModal: boolean;
  receiptListModal: boolean;
  searchText: string;
}

@inject('parkinglotStore', 'localeStore')
@observer
class VocModal extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      facilities: [],
      inGates: [],
      outGates: [],
      loading: false,
      list: [],
      selectedDiscountClass: [],
      discounts: [],
      discountClasses: [],
      isCalc: false,
      createInoutModal: false,
      ticketModal: false,
      facilityModal: false,
      unRecognizeModal: false,
      inoutSelectModal: false,
      fareModal: false,
      productModal: false,
      parkinglot: null,
      corpTicketClasses: [],
      ticketClasses: [],
      inoutPayment: [],
      receiptModal: false,
      receiptListModal: false,
      searchText: ''
    };
  }
  componentDidMount() {
    this.setState({
      loading: true,
      parkinglot: parkinglotStore.getParkinglot(),
      facilities: parkinglotStore.getFacilities()
    });

    this.setState({ inGates: parkinglotStore.getInGates });
    this.setState({ outGates: parkinglotStore.getOutGates });

    // 주차장 할인권 fetch
    getDiscountClasses().then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        runInAction(() => {
          this.setState({ discountClasses: data });
        });
      }
    });

    // 주차장 요금 정보 fetch
    getFares().then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        runInAction(() => {
          this.setState({ fare: data });
        });
      }
    });

    // 주차장 입주사 할인 상품 정보 fetch
    getCorpTicketClasses().then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        runInAction(() => {
          this.setState({ corpTicketClasses: data });
        });
      }
    });

    // 주차장 입주사 할인 상품 정보 fetch
    getTicketClasses().then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        runInAction(() => {
          this.setState({ ticketClasses: data });
        });
      }
    });
  }

  handleKeyDown = (e: any) => {
    if (e.key === 'Enter') this.handleCarSearch(e.target.value);
  };

  handleCarSearch = (value: any) => {
    if (value === null || value === '') return;
    const createTm = [moment(new Date()).subtract(21, 'days'), moment(new Date())];
    const searchParam: IInoutSelectReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      dateType: EInoutType.IN,
      parkcartype: ETicketType.ALL,
      outSn: ''
    };

    const data: any = {};
    data.startDate = searchParam.startDate;
    data.endDate = searchParam.endDate;
    data.dateType = searchParam.dateType;
    data.vehicleNo = value;
    data.parkcartype = '';
    data.gateId = '';
    data.outSn = '';

    getInouts(data, 1, 20)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          const inouts = data.filter((item: IInoutObj) => item.type === 'IN' && item.outSn !== -1);
          runInAction(() => {
            this.setState({ list: inouts });
            if (inouts.length <= 0) {
              zdsTips.error('차량번호 검색 결과가 없습니다');
              this.setState({ selected: null });
            } else if (inouts.length === 1) {
              this.fetchInout(inouts[0].inSn);
            } else {
              zdsTips.alert('차량번호 선택하시오');
              this.setState({ inoutSelectModal: true, selected: null });
            }
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        this.setState({ loading: false });
      });

    console.log('handleCarSearch', value);
  };

  fetchInout(sn: number) {
    getInoutDetail(sn)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ selected: data });

            const discounts: {
              sn: number;
              discountNm: string;
              discountApplyType: string;
              unitTime: number;
              corpName: string | undefined;
              quantity: number;
              disabled: boolean;
            }[] = [];
            this.state.selected?.aplyDiscountClasses?.map((item) => {
              discounts.push({
                sn: item.discountClass.sn,
                discountNm: item.discountClass.discountName,
                discountApplyType: item.discountClass.discountApplyType,
                unitTime: item.discountClass.unit,
                corpName: item.corp?.corpName,
                quantity: item.quantity,
                disabled: true
              });
            });
            this.setState({ discounts: discounts });

            const createTm = [moment(new Date()).subtract(3, 'months'), moment(new Date())];
            const searchPayment: IInoutPaymentSelectReq = {
              startDate: createTm[0].format('YYYY-MM-DD'),
              endDate: createTm[1].format('YYYY-MM-DD'),
              createTm: [createTm[0].unix(), createTm[1].unix()],
              vehicleNo: this.state.selected?.vehicleNo,
              resultType: 'SUCCESS',
              limit: 5
            };

            getInoutPayments(searchPayment)
              .then((res: any) => {
                const { msg, data } = res;
                if (msg === 'success') {
                  runInAction(() => {
                    this.setState({ inoutPayment: data.filter((l: any) => l.amount > 0) });
                  });
                }
              })
              .catch();
          });
        }
      })
      .catch();
  }

  handleBtnClick = (info: IDiscountClassObj, action: string) => {
    // console.log('handleBtnClick', info);
    if (action === 'CANCEL') {
      const discounts = this.state.discounts.filter(
        (t) => !(t.sn === info.sn && t.disabled === false)
      );
      this.setState({ discounts: discounts });
    }
  };

  handleAddDiscountClass = (info: IDiscountClassObj) => {
    // console.log('handleAddDiscountClass', info);
    const i = this.state.discounts.findIndex(
      (x) => x.discountNm === info.discountName && x.disabled === false
    );
    if (i <= -1) {
      let discounts = [
        ...this.state.discounts,
        {
          sn: info.sn,
          discountNm: info.discountName,
          discountApplyType: info.discountApplyType,
          unitTime: info.unit,
          corpName: '',
          quantity: 1,
          disabled: false
        }
      ];
      this.setState({ discounts: discounts });
    } else {
      const discounts = this.state.discounts.map((t) => {
        if (t.sn === info.sn && t.disabled === false) {
          t.quantity++;
          return { ...t };
        }
        return { ...t };
      });
      this.setState({ discounts: discounts });
    }
  };

  handleCalc = (inout: IInoutObj) => {
    // console.log('handleCalc', inout);
    calcParkinglotInout(inout).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        //console.log('data', data);
        this.setState({ selected: data, isCalc: true });
      }
    });
  };

  // handleSave = (inout: IInoutObj) => {
  //   updateParkinglotInout(this.props.cs.parkinglot.parkinglotId, inout).then((res: any) => {
  //     const { msg, data } = res;
  //     if (msg === 'ok') {
  //       this.setState({ selected: data, isCalc: false }, () => this.fetchInout(inout.inSn!!));
  //     }
  //   });
  // };

  handleTransfer = (inout: IInoutObj) => {
    this.setState({ loading: true });
    transferParkinglotInout(inout)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          zdsTips.success('주차요금 전송 완료했습니다');
          this.setState({ selected: data, isCalc: false }, () => this.fetchInout(inout.inSn!!));
        }
      })
      .catch(() => {
        zdsTips.error('주차요금 전송 실패했습니다');
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleCreateInout = (info: IInoutObj) => {
    // console.log('create', info);
    this.setState({ createInoutModal: false });
    createInout(info)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          zdsTips.success('수동입차 등록 완료했습니다');
          //to-do dfdfdf
        }
      })
      .catch(() => {
        zdsTips.success('수동입차 등록 실패했습니다');
      });
  };

  handlerSubmit = (value: any, gateId?: string) => {
    if (!this.state.selected) return;

    const { localeObj } = localeStore;
    this.props.form.validateFields((err, fieldsValue) => {
      //console.log('handlerSubmit calc', fieldsValue);
      if (fieldsValue.outDate === null || fieldsValue.outDate === '') {
        zdsTips.alert(localeObj['alert.outdate.enter'] || '출차시간 입력하세요', () => {});
        return;
      }
      if (fieldsValue.vehicleNo === null || fieldsValue.vehicleNo === '') {
        zdsTips.alert(localeObj['alert.vehicleno.enter'] || '차량번호 입력하세요', () => {});
        return;
      }
      fieldsValue.inDate = conversionDateTime(fieldsValue.inDate);
      fieldsValue.outDate = conversionDateTime(fieldsValue.outDate);
      fieldsValue.inSn = this.state.selected!!.inSn;
      fieldsValue.type = this.state.selected!!.type;
      fieldsValue.parkoutSn = this.state.selected!!.outSn;
      // fieldsValue.parkoutSn = this.state.selected
      //   ? this.state.selected.parkoutSn === 0
      //     ? null
      //     : this.state.selected.parkoutSn
      //   : null;
      fieldsValue.addDiscountClasses = this.state.discounts
        .filter((t) => t.disabled === false)
        .map((item) => {
          const discount: IInoutDiscountApplyObj = {
            inSn: fieldsValue.inSn,
            discountClassSn: item.sn,
            cnt: item.quantity ? item.quantity : 0
          };
          return discount;
        });
      fieldsValue.inImgBase64Str = this.state.selected!!.inImgBase64Str;
      fieldsValue.outImgBase64Str = this.state.selected!!.outImgBase64Str;

      if (err) return;

      switch (value) {
        case 'calc':
          if (!err) this.handleCalc(fieldsValue);
          break;
        case 'save':
          if (!this.state.isCalc) {
            zdsTips.error('주차요금계산을 먼저 실행해주세요');
          } else {
            fieldsValue.parktime = this.state.selected!!.parkTime;
            fieldsValue.payfee = this.state.selected!!.payFee;
            fieldsValue.parkfee = this.state.selected!!.parkFee;
            fieldsValue.dayDiscountfee = this.state.selected!!.dayDiscountfee;
            fieldsValue.discountfee = this.state.selected!!.discountFee;
            this.handleTransfer(fieldsValue);
          }
          break;
      }
    });
  };

  renderParkinglot() {
    return (
      <Card
        // title={'챠량 정보'}
        // type="inner"
        // headStyle={{ fontSize: 18, fontWeight: 700 }}
        // size="default"
        bordered={true}
      >
        <h3>주차장 기본 정보</h3>
        <Descriptions bordered column={24}>
          <Descriptions.Item span={24} label={'주차장명'}>
            <span>{this.state.parkinglot?.siteName}</span>
          </Descriptions.Item>
          <Descriptions.Item span={24} label={'대표자명'}>
            <span>{this.state.parkinglot?.ceoName}</span>
          </Descriptions.Item>
          <Descriptions.Item span={24} label={'주소'}>
            <span>{this.state.parkinglot?.address}</span>
          </Descriptions.Item>
          <Descriptions.Item span={24} label={'대표전화번호'}>
            <span>{this.state.parkinglot?.tel}</span>
          </Descriptions.Item>
          <Descriptions.Item span={24} label={'주차장ID'}>
            <span>{this.state.parkinglot?.rcsParkId}</span>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  }

  renderCarInfo() {
    const { getFieldDecorator, validateFieldsAndScroll, resetFields } = this.props.form;
    return (
      <Form>
        <Card
          // title={'챠량 정보'}
          // type="inner"
          // headStyle={{ fontSize: 18, fontWeight: 700 }}
          // size="default"
          bordered={true}
          bodyStyle={{ padding: '15px' }}
        >
          <h3>차량정보</h3>
          <Descriptions bordered column={24}>
            <Descriptions.Item span={12} label={'차량번호'} style={{ padding: '10px 16px' }}>
              {getFieldDecorator('vehicleNo', {
                initialValue: this.state.selected ? this.state.selected.vehicleNo : ''
              })(<Input disabled={true} style={{ width: '110px' }} />)}
            </Descriptions.Item>
            <Descriptions.Item span={12} label={'유형'} style={{ padding: '10px 16px' }}>
              {getFieldDecorator('parkcartype', {
                initialValue: this.state.selected ? this.state.selected.parkCarType : ''
              })(
                <Select style={{ width: '120px' }} size="middle">
                  {ticketTypeOpt
                    .filter((t) => t.value !== ETicketType.ALL && t.value !== ETicketType.DISCOUNT)
                    .map(
                      (item) =>
                        item.value && (
                          <Option key={item.value} value={item.value} title={item.label}>
                            {item.label}
                          </Option>
                        )
                    )}
                </Select>
              )}
            </Descriptions.Item>
            <Descriptions.Item span={12} label={'입차시간'} style={{ padding: '10px 16px' }}>
              {getFieldDecorator('inDate', {
                initialValue: this.state.selected
                  ? moment(new Date(this.state.selected.inDate)) //moment(new Date(this.state.selected.inDate))
                  : ''
              })(<DatePicker size="middle" format={'YYYY-MM-DD HH:mm'} showTime={true} />)}
            </Descriptions.Item>
            <Descriptions.Item span={12} label={'입차게이트'} style={{ padding: '10px 16px' }}>
              {getFieldDecorator('inGateId', {
                initialValue: this.state.selected ? this.state.selected.inGateId : ''
              })(
                <Select style={{ width: '120px' }} size="middle">
                  {this.state.inGates.map(
                    (item) =>
                      item.value && (
                        <Option key={item.value} value={item.value} title={item.label}>
                          {item.label}
                        </Option>
                      )
                  )}
                </Select>
              )}
            </Descriptions.Item>
            <Descriptions.Item span={12} label={'출차시간'} style={{ padding: '10px 16px' }}>
              {getFieldDecorator('outDate', {
                initialValue: this.state.selected
                  ? this.state.selected.outDate
                    ? moment(new Date(this.state.selected.outDate))
                    : ''
                  : ''
              })(<DatePicker size="middle" format={'YYYY-MM-DD HH:mm'} showTime={true} />)}
            </Descriptions.Item>
            <Descriptions.Item span={12} label={'출차게이트'} style={{ padding: '10px 16px' }}>
              {getFieldDecorator('outGateId', {
                initialValue: this.state.selected ? this.state.selected.outGateId : ''
              })(
                <Select style={{ width: '120px' }} size="middle">
                  {this.state.outGates.map(
                    (item) =>
                      item.value && (
                        <Option key={item.value} value={item.value} title={item.label}>
                          {item.label}
                        </Option>
                      )
                  )}
                </Select>
              )}
            </Descriptions.Item>
            <Descriptions.Item
              span={12}
              label={'주차시간'}
              style={{ paddingLeft: '16px', paddingRight: '16px' }}
            >
              <span>{this.state.selected ? toHHMM(this.state.selected.parkTime) : ''}</span>
            </Descriptions.Item>
            <Descriptions.Item
              span={12}
              label={'메모'}
              style={{ paddingLeft: '16px', paddingRight: '16px' }}
            >
              <span>{this.state.selected ? this.state.selected.memo : ''}</span>
            </Descriptions.Item>
            {/*<Descriptions.Item*/}
            {/*  span={8}*/}
            {/*  label={'주차요금'}*/}
            {/*  style={{ paddingLeft: '16px', paddingRight: '16px' }}*/}
            {/*>*/}
            {/*  <span>{this.state.selected ? this.state.selected.parktime : ''}</span>*/}
            {/*</Descriptions.Item>*/}
            {/*<Descriptions.Item*/}
            {/*  span={8}*/}
            {/*  label={'할인요금'}*/}
            {/*  style={{ paddingLeft: '16px', paddingRight: '16px' }}*/}
            {/*>*/}
            {/*  <span>{this.state.selected ? this.state.selected.parktime : ''}</span>*/}
            {/*</Descriptions.Item>*/}
            {/*<Descriptions.Item*/}
            {/*  span={8}*/}
            {/*  label={'결제요금'}*/}
            {/*  style={{ paddingLeft: '16px', paddingRight: '16px' }}*/}
            {/*>*/}
            {/*  <span>{this.state.selected ? this.state.selected.parktime : ''}</span>*/}
            {/*</Descriptions.Item>*/}
          </Descriptions>
        </Card>
      </Form>
    );
  }

  handleBreaker = (value: any, type: string) => {
    // console.log('handleBreaker', value);
    const breakers =
      type === 'IN'
        ? this.state.facilities.filter(
            (f) => f.gateId === this.state.selected?.inGateId && f.category === ECategory.BREAKER
          )
        : this.state.facilities.filter(
            (f) => f.gateId === this.state.selected?.outGateId && f.category === ECategory.BREAKER
          );

    breakers.forEach((item) => {
      if (item.status === 'XUPLOCK') {
        zdsTips.error('수동 열림고정은 해제 할 수 없습니다');
      } else {
        actionFacility(item.dtFacilitiesId, value).then();
      }
    });
  };

  renderCarImage() {
    const { Option } = Select;
    return (
      <Card bordered={true} bodyStyle={{ padding: '15px' }}>
        <h3>차량 사진</h3>
        <Row gutter={24}>
          <Col span={12}>
            <Card hoverable style={{ marginBottom: 20 }}>
              <Row gutter={24}>
                <Col span={12}>
                  <span style={{ fontSize: '.8rem', fontWeight: 500 }}>입차사진</span>
                </Col>
                <Col span={12}>
                  <Select
                    //disabled={!this.props.cs.facility.gateType.includes('IN')}
                    placeholder="차단기동작"
                    onChange={(value) => this.handleBreaker(value, 'IN')}
                  >
                    <Option value="UP">{'열림'}</Option>
                    <Option value="DOWN">{'닫힘'}</Option>
                    <Option value="UPLOCK">{'열림고정'}</Option>
                    <Option value="UNLOCK">{'고정해제'}</Option>
                  </Select>
                </Col>
              </Row>
              <Row gutter={24} style={{ paddingTop: '10px' }}>
                <Image
                  alt={this.state.selected ? this.state.selected.vehicleNo : ''}
                  src={this.state.selected ? `${this.state.selected?.inImgBase64Str}` : ''}
                />
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable style={{ marginBottom: 20 }}>
              <Row gutter={24}>
                <Col span={12} style={{ alignSelf: 'center' }}>
                  <span style={{ fontSize: '.8rem', fontWeight: 500 }}>출차사진</span>
                </Col>
                <Col span={12}>
                  <Select
                    //disabled={!this.props.cs.facility.gateType.includes('IN')}
                    placeholder="차단기동작"
                    onChange={(value) => this.handleBreaker(value, 'OUT')}
                  >
                    <Option value="UP">{'열림'}</Option>
                    <Option value="DOWN">{'닫힘'}</Option>
                    <Option value="UPLOCK">{'열림고정'}</Option>
                    <Option value="UNLOCK">{'고정해제'}</Option>
                  </Select>
                </Col>
              </Row>
              <Row gutter={24} style={{ paddingTop: '10px' }}>
                <Image
                  alt={this.state.selected ? this.state.selected.vehicleNo : ''}
                  src={this.state.selected ? `${this.state.selected?.outImgBase64Str}` : ''}
                />
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    );
  }

  sum = (num1: any, num2: any) => {
    return num1 + num2;
  };

  renderPayInfo() {
    return (
      <Card
        id={'pay'}
        // title={'챠량 정보'}
        // type="inner"
        // headStyle={{ fontSize: 18, fontWeight: 700 }}
        // size="default"
        bordered={false}
      >
        <Row gutter={24}>
          <Col span={12}>
            <h3>과금 내역</h3>
          </Col>
          <Col span={12} style={{ textAlignLast: 'right' }}>
            <Button
              // type="primary"
              htmlType="submit"
              style={{ fontWeight: 700, color: 'var(--primary)' }}
              onClick={(e: BaseSyntheticEvent) => {
                e.preventDefault();
                this.handlerSubmit('calc');
              }}
            >
              <span>주차요금계산</span>
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ fontWeight: 700, marginLeft: '30px' }}
              onClick={(e: BaseSyntheticEvent) => {
                e.preventDefault();
                this.handlerSubmit('save');
              }}
            >
              주차요금전송
            </Button>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: '20px' }}>
          <Col span={8}>
            <span>주차요금</span>
            <Input
              disabled
              value={
                this.state.selected ? convertNumberWithCommas(this.state.selected.parkFee) : ''
              }
            />
          </Col>
          <Col span={8}>
            <span>할인요금</span>
            <Input
              disabled
              value={
                this.state.selected
                  ? convertNumberWithCommas(
                      this.sum(this.state.selected.discountFee, this.state.selected.dayDiscountfee)
                    )
                  : ''
              }
            />
          </Col>
          <Col span={8}>
            <span>정산요금</span>
            <Input
              disabled
              value={this.state.selected ? convertNumberWithCommas(this.state.selected.payFee) : ''}
            />
          </Col>
        </Row>
      </Card>
    );
  }

  renderDiscountInfo() {
    const preApply: ColumnProps<any>[] = [
      {
        title: '할인명',
        key: 'discountNm',
        fixed: 'left',
        width: 100,
        align: 'center',
        render: (text: string, record: any) => record.discountNm
      },
      {
        title: '할인률',
        key: 'discountApplyType',
        fixed: 'left',
        width: 100,
        align: 'center',
        render: (text: string, record: any) => {
          const value = discountApplyTypeOpt.find(
            (item) => record.discountApplyType === item.value
          );
          const label = value ? value.label : record.discountApplyType;
          return (
            <div>
              {record.unitTime}
              {label === '시간' ? '분' : label}
            </div>
          );
        }
      },
      {
        title: '입주사명',
        key: 'corpName',
        fixed: 'left',
        width: 100,
        align: 'center',
        render: (text: string, record: any) => record.corpName
      },
      {
        title: '적용수량',
        key: 'aplyCnt',
        fixed: 'left',
        width: 100,
        align: 'center',
        render: (text: string, record: any) => record.quantity
      },
      {
        title: 'Action',
        width: 85,
        align: 'center',
        fixed: 'right',
        render: (record: any) => (
          <div>
            {!record.disabled ? (
              <a
                onClick={(e: any) => {
                  e.stopPropagation();
                  this.handleBtnClick(record, 'CANCEL');
                }}
              >
                삭제
              </a>
            ) : null}
          </div>
        )
      }
    ];

    return (
      <Card
        key="discount"
        bordered={false}
        bodyStyle={{ maxHeight: 350, overflow: 'scroll', whiteSpace: 'nowrap' }}
      >
        <h3>할인 내역</h3>
        <Row gutter={24}>
          {this.state.discountClasses
            .sort((v1: IDiscountClassObj, v2: IDiscountClassObj) =>
              v2.orderNo < v1.orderNo ? 1 : -1
            )
            .filter((d) => d.rcsUse)
            .map((discountClass) => (
              <Col span={4.9} style={{ textAlign: 'center', padding: '3px' }}>
                <Button
                  type={'primary'}
                  style={{ width: '100px' }}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    this.handleAddDiscountClass(discountClass);
                  }}
                >
                  <span style={{ fontWeight: 800 }}>{discountClass.discountName}</span>
                </Button>
              </Col>
            ))}
        </Row>
        <StandardTable
          // @ts-ignore
          rowKey={(record: any) => String(record.sn)}
          columns={preApply}
          data={{
            list: this.state.discounts,
            pagination: false
          }}
          hidePagination={true}
        />
      </Card>
    );
  }

  renderPaymentInfo() {
    const payment: ColumnProps<IInoutPaymentObj>[] = [
      {
        title: '차량번호',
        key: 'vehicleNo',
        fixed: 'left',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => record.vehicleNo
      },
      {
        title: '정산타입',
        key: 'type',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) =>
          conversionEnumValue(record.type, paymentTypeOpt).label
      },
      {
        title: '결제일자',
        key: 'vehicleNo',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) =>
          convertStringToDateTime(record.approveDateTime) || '--'
      },
      {
        title: '결제금액',
        key: 'amount',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => record.amount
      },
      // {
      //   title: '결제방법',
      //   key: 'payType',
      //   width: 110,
      //   align: 'center',
      //   render: (text: string, record: IInoutPaymentObj) => record.payType
      // },
      {
        title: '결제여부',
        key: 'result',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => {
          const result = conversionEnumValue(record.result, resultTypeOpt).label;
          return record.result === 'ERROR' || result === 'FAILURE'
            ? `${result}(${record.failureMessage})`
            : result;
        }
      },
      {
        title: '영수증',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => {
          return (
            <Button
              onClick={(event) => this.setState({ selectedPayment: record, receiptModal: true })}
            >
              영수증
            </Button>
          );
        }
      }
    ];

    return (
      <Card key="payment" bordered={false}>
        <h3>결제 내역</h3>
        <StandardTable
          // @ts-ignore
          rowKey={(record: any) => String(record.sn)}
          columns={payment}
          data={{
            list: this.state.inoutPayment,
            pagination: false
          }}
          hidePagination={true}
        />
      </Card>
    );
  }

  render() {
    const { localeObj } = localeStore;
    return (
      <>
        <Row gutter={24} style={{ paddingBottom: '24px' }}>
          <Col span={3} style={{ textAlign: 'center' }}>
            <Button
              type={'primary'}
              style={{ padding: '0 15px', width: '120px' }}
              onClick={(e: any) => {
                e.stopPropagation();
                this.setState({ fareModal: true });
              }}
            >
              <span style={{ fontWeight: 800 }}>과금정책</span>
            </Button>
          </Col>
          <Col span={3} style={{ textAlign: 'center' }}>
            <Button
              type={'primary'}
              style={{ padding: '0 15px', width: '120px' }}
              onClick={(e: any) => {
                e.stopPropagation();
                this.setState({ facilityModal: true });
              }}
            >
              <span style={{ fontWeight: 800 }}>설비제어</span>
            </Button>
          </Col>
          <Col span={3} style={{ textAlign: 'center' }}>
            <Button
              type={'primary'}
              style={{ padding: '0 15px', width: '120px' }}
              onClick={(e: any) => {
                e.stopPropagation();
                this.setState({ productModal: true });
              }}
            >
              <span style={{ fontWeight: 800 }}>상품정보</span>
            </Button>
          </Col>
          <Col span={3} />
          <Col span={3} style={{ textAlign: 'center' }}>
            <Button
              type={'primary'}
              style={{ padding: '0 15px', width: '120px' }}
              onClick={(e: any) => {
                e.stopPropagation();
                this.setState({ receiptListModal: true });
              }}
            >
              <span style={{ fontWeight: 800 }}>입출차결제</span>
            </Button>
          </Col>
          <Col span={3} style={{ textAlign: 'center' }}>
            <Button
              type={'primary'}
              style={{ padding: '0 15px', width: '120px' }}
              onClick={(e: any) => {
                e.stopPropagation();
                this.setState({ createInoutModal: true });
              }}
            >
              <span style={{ fontWeight: 800 }}>수동입차</span>
            </Button>
          </Col>
          <Col span={3} style={{ textAlign: 'center' }}>
            <Button
              type={'primary'}
              style={{ padding: '0 15px', width: '120px' }}
              onClick={(e: any) => {
                e.stopPropagation();
                this.setState({ ticketModal: true });
              }}
            >
              <span style={{ fontWeight: 800 }}>정기권관리</span>
            </Button>
          </Col>
          <Col span={3} style={{ textAlign: 'center' }}>
            <Button
              type={'primary'}
              style={{ padding: '0 15px', width: '120px' }}
              onClick={(e: any) => {
                e.stopPropagation();
                this.setState({ unRecognizeModal: true });
              }}
            >
              <span style={{ fontWeight: 800 }}>미인식</span>
            </Button>
          </Col>
        </Row>
        <Row gutter={24} style={{ paddingBottom: '24px' }}>
          <Col span={18} />
          <Col span={6} style={{ paddingLeft: '30px' }}>
            <Space>
              <Input.Search
                allowClear
                style={{ width: '120%' }}
                placeholder={'차량번호를 입력하세요'}
                onChange={(e) => this.setState({ searchText: e.target.value })}
                onSearch={(value) => {
                  if (this.state.searchText.length < 4)
                    zdsTips.alert('차량번호 4자리이상 입력하세요');
                  else this.handleCarSearch(this.state.searchText);
                }}
                // onKeyDown={(e) => {
                //   e.stopPropagation();
                //   this.handleKeyDown(e);
                // }}
                enterButton
              />
            </Space>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Row gutter={24}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                {/*{this.renderParkinglot()}*/}
                {this.renderCarImage()}
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={24}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                {this.renderCarInfo()}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={24} style={{ paddingTop: '20px' }}>
          <Col span={12}>
            <Row gutter={24}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                {this.renderDiscountInfo()}
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={24}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                {this.renderPayInfo()}
                {this.renderPaymentInfo()}
              </Col>
            </Row>
          </Col>
        </Row>
        {this.state.createInoutModal ? (
          <DraggableModal
            title={localeObj['label.inout.create'] || '입출차 등록'}
            visible={this.state.createInoutModal}
            width={500}
            onOk={() => this.setState({ createInoutModal: false })}
            onCancel={(): void => {
              this.setState({ createInoutModal: false });
            }}
            footer={[]}
          >
            <InoutCreateModal
              onSubmit={(value) => this.handleCreateInout(value)}
              gates={this.state.inGates}
            />
          </DraggableModal>
        ) : null}
        {this.state.ticketModal ? (
          <DraggableModal
            title={localeObj['label.ticket.info'] || '주차장 정기권 현황'}
            visible={this.state.ticketModal}
            width={1200}
            onOk={() => this.setState({ ticketModal: false })}
            onCancel={(): void => {
              this.setState({ ticketModal: false });
            }}
          >
            <TicketsModal />
          </DraggableModal>
        ) : null}
        {this.state.facilityModal ? (
          <DraggableModal
            title={localeObj['label.parkinglot.info'] || '주차장 정보'}
            visible={this.state.facilityModal}
            width={1000}
            onOk={() => this.setState({ facilityModal: false })}
            onCancel={(): void => {
              this.setState({ facilityModal: false });
            }}
          >
            <FacilityModal />
          </DraggableModal>
        ) : null}
        {this.state.unRecognizeModal ? (
          <DraggableModal
            title={localeObj['label.parkinglot.unrecognize'] || '주차장 정보'}
            visible={this.state.unRecognizeModal}
            width={1000}
            onOk={() => this.setState({ unRecognizeModal: false })}
            onCancel={(): void => {
              this.setState({ unRecognizeModal: false });
            }}
          >
            <UnRecognizeModal />
          </DraggableModal>
        ) : null}
        {this.state.inoutSelectModal ? (
          <DraggableModal
            title={'차량선택'}
            visible={this.state.inoutSelectModal}
            width={600}
            onOk={() => this.setState({ inoutSelectModal: false })}
            onCancel={(): void => {
              this.setState({ inoutSelectModal: false });
            }}
            footer={[]}
          >
            <InoutListModal
              inouts={this.state.list}
              onSelect={(value) => {
                this.setState({ inoutSelectModal: false });
                this.fetchInout(value.inSn ? value.inSn : -1);
              }}
            />
          </DraggableModal>
        ) : null}
        {this.state.fareModal ? (
          <DraggableModal
            title={localeObj['label.parkinglot.fee'] || '주차장 요금 정보'}
            visible={this.state.fareModal}
            width={1000}
            onOk={() => this.setState({ fareModal: false })}
            onCancel={(): void => {
              this.setState({ fareModal: false });
            }}
          >
            <FareModal fare={this.state.fare} />
          </DraggableModal>
        ) : null}
        {this.state.productModal ? (
          <DraggableModal
            title={localeObj['label.parkinglot.product'] || '주차장 상품 정보'}
            visible={this.state.productModal}
            width={1000}
            onOk={() => this.setState({ productModal: false })}
            onCancel={(): void => {
              this.setState({ productModal: false });
            }}
          >
            <ProductModal
              ticketClasses={this.state.ticketClasses}
              corpTiketClasses={this.state.corpTicketClasses}
              loading={this.state.loading}
            />
          </DraggableModal>
        ) : null}
        {this.state.receiptModal && this.state.selectedPayment ? (
          <DraggableModal
            title={'입출차 결제내역'}
            visible={this.state.receiptModal}
            width={500}
            onOk={() => this.setState({ receiptModal: false })}
            onCancel={(): void => {
              this.setState({ receiptModal: false });
            }}
          >
            <ReceiptModal payment={this.state.selectedPayment} />
          </DraggableModal>
        ) : null}
        {this.state.receiptListModal ? (
          <DraggableModal
            title={'결제 정보'}
            visible={this.state.receiptListModal}
            width={1000}
            onOk={() => this.setState({ receiptListModal: false })}
            onCancel={(): void => {
              this.setState({ receiptListModal: false });
            }}
          >
            <ReceiptListModal />
          </DraggableModal>
        ) : null}
      </>
    );
  }
}
export default Form.create<IProps>()(VocModal);
