import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { Button, Card, Col, InputNumber, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { conversionDateTime, conversionEnumValue } from '@utils/conversion';
import { IInoutDiscountApplyObj, IInoutObj } from '@models/inout';
import { newInoutDetailFileds } from '../FormFields/FormFields';
import Meta from 'antd/lib/card/Meta';
import { dayRangeTypeOpt, discountApplyTypeOpt, EInoutType } from '@/constants/list';
import emptyImage from '@views/Dashboard/images/empty.svg';
import { IDiscountClassObj } from '@models/discountClass';
import StandardTable from '@components/StandardTable';
import { ColumnProps } from 'antd/es/table';
import zdsTips from '@utils/tips';

interface IInoutDetailModalProps extends FormComponentProps {
  inout: IInoutObj;
  inGates: any[];
  outGates: any[];
  onSubmit: (inout: IInoutObj) => void;
  discountClasses: IDiscountClassObj[];
  onCalc: (inout: IInoutObj) => void;
  onTransfer: (inout: IInoutObj) => void;
}
interface IState {
  isCalc: boolean;
  selectedDiscountClass: IDiscountClassObj[];
  applyInoutDiscount: IInoutDiscountApplyObj[];
}

@inject('localeStore')
@observer
class InoutDetailModal extends PureComponent<IInoutDetailModalProps, IState> {
  constructor(props: IInoutDetailModalProps) {
    super(props);
    this.state = {
      isCalc: false,
      applyInoutDiscount: [],
      selectedDiscountClass: this.props.inout.aplyDiscountClasses
        ? this.props.inout.aplyDiscountClasses?.map((item) => {
            return { ...item.discountClass, disable: true, aplyCnt: item.quantity };
          })
        : []
    };
  }
  handlerSubmit(value: any) {
    switch (value) {
      case 'calc':
        this.props.form.validateFields((err, fieldsValue) => {
          fieldsValue.inDate = conversionDateTime(fieldsValue.inDate);
          fieldsValue.outDate
            ? ((fieldsValue.outDate = conversionDateTime(fieldsValue.outDate)),
              (fieldsValue.type = EInoutType.OUT))
            : (fieldsValue.type = EInoutType.IN);
          // fieldsValue.type = this.props.inout.type;
          this.setState({ isCalc: true });
          fieldsValue.addDiscountClasses = this.state.selectedDiscountClass.map((item) => {
            const discount: IInoutDiscountApplyObj = {
              inSn: fieldsValue.parkinSn,
              discountClassSn: item.sn,
              cnt: item.aplyCnt ? item.aplyCnt : 0
            };
            return discount;
          });
          console.log('calc', fieldsValue);
          if (!err) this.props.onCalc(fieldsValue);
        });
        break;
      case 'save':
        if (!this.state.isCalc) {
          zdsTips.error('주차요금계산을 먼저 실행해주세요');
        } else {
          this.props.form.validateFields((err, fieldsValue) => {
            fieldsValue.inDate = conversionDateTime(fieldsValue.inDate);
            fieldsValue.outDate = conversionDateTime(fieldsValue.outDate);
            fieldsValue.parkinSn = this.props.inout.parkinSn;
            fieldsValue.parkoutSn = this.props.inout.parkoutSn;
            fieldsValue.type = this.props.inout.type;
            fieldsValue.parktime = this.props.inout.parktime;
            fieldsValue.payfee = this.props.inout.payfee;
            fieldsValue.parkfee = this.props.inout.parkfee;
            fieldsValue.dayDiscountfee = this.props.inout.dayDiscountfee;
            fieldsValue.discountfee = this.props.inout.discountfee;
            fieldsValue.addDiscountClasses = this.state.selectedDiscountClass
              .filter((d) => !d.disable)
              .map((item) => {
                const discount: IInoutDiscountApplyObj = {
                  inSn: fieldsValue.parkinSn,
                  discountClassSn: item.sn,
                  cnt: item.aplyCnt ? item.aplyCnt : 0
                };
                return discount;
              });
            // console.log('save', fieldsValue);
            this.props.onTransfer(fieldsValue);
          });
        }
        break;
      case 'update':
        if (this.state.isCalc) {
          zdsTips.error('주차요금전송을 실행해주세요');
        } else {
          this.props.form.validateFields((err, fieldsValue) => {
            // console.log(
            //   'update',
            //   conversionDateTime(fieldsValue.inDate),
            //   conversionDateTime(this.props.inout.inDate)
            // );

            fieldsValue.addDiscountClasses = this.state.selectedDiscountClass.map((item) => {
              const discount: IInoutDiscountApplyObj = {
                inSn: fieldsValue.parkinSn,
                discountClassSn: item.sn,
                cnt: item.aplyCnt ? item.aplyCnt : 0
              };
              return discount;
            });

            if (
              this.props.inout.outDate !== null &&
              (conversionDateTime(fieldsValue.inDate) !==
                conversionDateTime(this.props.inout.inDate) ||
                conversionDateTime(fieldsValue.outDate) !==
                  conversionDateTime(this.props.inout.outDate ? this.props.inout.outDate : 0))
            ) {
              return zdsTips.error('주차요금계산을 실행해주세요');
            }

            fieldsValue.inDate = conversionDateTime(fieldsValue.inDate);
            fieldsValue.outDate = fieldsValue.outDate
              ? conversionDateTime(fieldsValue.outDate)
              : '';
            fieldsValue.parkoutSn = this.props.inout.parkoutSn;
            this.props.onSubmit(fieldsValue);
          });
        }
        break;
      // case 'apply':
      //   this.props.form.validateFields((err, fieldsValue) => {
      //     fieldsValue.addDiscountClasses = this.state.selectedDiscountClass.map((item) => {
      //       const discount: IInoutDiscountApplyObj = {
      //         inSn: fieldsValue.parkinSn,
      //         discountClassSn: item.sn,
      //         cnt: item.aplyCnt ? item.aplyCnt : 0
      //       };
      //       return discount;
      //     });
      //     fieldsValue.inDate = conversionDateTime(fieldsValue.inDate);
      //     fieldsValue.outDate = '';
      //     fieldsValue.parkoutSn = this.props.inout.parkoutSn;
      //     this.props.onSubmit(fieldsValue);
      //   });
      //   break;
    }
  }

  handleBtnClick = (info: IDiscountClassObj, action: string) => {
    switch (action) {
      case 'APPLY':
        {
          this.setState((prevState) => ({
            selectedDiscountClass: [...prevState.selectedDiscountClass, { ...info, disable: false }]
          }));
          // console.log('handleBtnClick', this.state.selectedDiscountClass);
        }
        break;
      case 'CANCEL':
        {
          let filteredArray = this.state.selectedDiscountClass.filter((item) => item !== info);
          this.setState({ selectedDiscountClass: filteredArray });
        }
        break;
    }
  };

  handleAplyCnt = (info: IDiscountClassObj, cnt: number) => {
    const update = this.state.selectedDiscountClass.map((e) => {
      if (e.sn === info.sn) {
        info.aplyCnt = cnt;
        return { ...info };
      } else return { ...e };
    });
    this.setState({ selectedDiscountClass: update });
    // console.log('handleAplyCnt', info, cnt, this.state.selectedDiscountClass);
  };

  renderDiscountClass() {
    const columns: ColumnProps<IDiscountClassObj>[] = [
      {
        title: '할인명',
        key: 'discountNm',
        fixed: 'left',
        width: 100,
        align: 'center',
        render: (text: string, record: IDiscountClassObj) => record.discountNm
      },
      {
        title: '적용요일',
        key: 'dayRange',
        fixed: 'left',
        width: 90,
        align: 'center',
        render: (text: string, record: IDiscountClassObj) =>
          conversionEnumValue(record.dayRange, dayRangeTypeOpt).label
      },
      {
        title: '할인률',
        fixed: 'left',
        width: 80,
        align: 'center',
        render: (text: string, record: IDiscountClassObj) => {
          const value = conversionEnumValue(record.discountApplyType, discountApplyTypeOpt);
          return (
            <div>
              {record.unitTime}
              {value.label === '시간' ? '분' : value.label}
            </div>
          );
        }
      },
      {
        title: 'Action',
        width: 85,
        align: 'center',
        fixed: 'right',
        render: (item: IDiscountClassObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'APPLY');
              }}
            >
              적용
            </a>
          </div>
        )
      }
    ];

    const aplyColumns: ColumnProps<IDiscountClassObj>[] = [
      {
        title: '할인명',
        key: 'discountNm',
        fixed: 'left',
        width: 100,
        align: 'center',
        render: (text: string, record: IDiscountClassObj) => record.discountNm
      },
      {
        title: '할인률',
        fixed: 'left',
        width: 80,
        align: 'center',
        render: (text: string, record: IDiscountClassObj) => {
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
        title: '적용수량',
        key: 'aplyCnt',
        width: 80,
        align: 'center',
        fixed: 'right',
        render: (item: IDiscountClassObj) => (
          <div>
            {/*<PlusCircleTwoTone />*/}
            <InputNumber
              value={item.aplyCnt}
              min={0}
              style={{ width: '60px' }}
              onChange={(value) => this.handleAplyCnt(item, value)}
              disabled={item.disable}
            />
            {/*<MinusCircleTwoTone />*/}
          </div>
        )
      },
      {
        title: 'Action',
        width: 85,
        align: 'center',
        fixed: 'right',
        render: (item: IDiscountClassObj) => (
          <div>
            {!item.disable ? (
              <a
                onClick={(e: any) => {
                  e.stopPropagation();
                  this.handleBtnClick(item, 'CANCEL');
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
      <Row gutter={24} className="discount-class" style={{ margin: '10px 0' }}>
        <Col md={12} xs={24}>
          <Card
            title="주차장 할인권 리스트"
            style={{ maxHeight: '100%' }}
            bodyStyle={{ padding: '0', maxHeight: 250, overflow: 'auto' }}
            className="discount-class-card"
          >
            <StandardTable
              columns={columns}
              data={{
                list: this.props.discountClasses,
                pagination: false
              }}
              hidePagination={true}
            />
          </Card>
        </Col>
        <Col md={12} xs={24}>
          <Card
            title="할인권 적용"
            style={{ maxHeight: '100%' }}
            bodyStyle={{ padding: '0', maxHeight: 250, overflow: 'auto' }}
            className="discount-class-card"
          >
            <StandardTable
              columns={aplyColumns}
              data={{
                list: this.state.selectedDiscountClass,
                pagination: false
              }}
              hidePagination={true}
            />
          </Card>
        </Col>
      </Row>
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const inoutDetailFields = newInoutDetailFileds(
      this.props.inout,
      this.props.inGates,
      this.props.outGates
    );
    return (
      <>
        <Row style={{ marginTop: '10px' }}>
          <Form
          // onSubmit={(e: BaseSyntheticEvent) => {
          //   e.preventDefault();
          //   this.handlerSubmit();
          // }}
          >
            <Row gutter={24}>{getFormFields(getFieldDecorator, inoutDetailFields, true, 12)}</Row>
            {this.props.discountClasses.length > 0 ? this.renderDiscountClass() : null}
            <Row style={{ placeContent: 'center', margin: '20px 0' }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ fontWeight: 700 }}
                onClick={(e: BaseSyntheticEvent) => {
                  e.preventDefault();
                  this.handlerSubmit('update');
                }}
              >
                수정내역반영
              </Button>
              {/*<Button*/}
              {/*  type="primary"*/}
              {/*  htmlType="submit"*/}
              {/*  style={{ fontWeight: 700, marginLeft: '30px' }}*/}
              {/*  onClick={(e: BaseSyntheticEvent) => {*/}
              {/*    e.preventDefault();*/}
              {/*    this.handlerSubmit('apply');*/}
              {/*  }}*/}
              {/*>*/}
              {/*  할인권적용*/}
              {/*</Button>*/}
              <Button
                type="primary"
                htmlType="submit"
                style={{ fontWeight: 700, marginLeft: '30px' }}
                onClick={(e: BaseSyntheticEvent) => {
                  e.preventDefault();
                  this.handlerSubmit('calc');
                }}
              >
                주차요금계산
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
            </Row>
            <Row gutter={24} className="rowInfo-card">
              <Col xs={24} sm={12} md={12} lg={12}>
                <Card
                  hoverable
                  style={{ padding: 20, marginBottom: 20 }}
                  cover={
                    <img
                      alt={this.props.inout.vehicleNo}
                      // @ts-ignore
                      src={
                        this.props.inout.inImgBase64Str
                          ? `${this.props.inout.inImgBase64Str}`
                          : emptyImage
                      }
                    />
                  }
                >
                  <Meta title={'입차사진'} />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Card
                  hoverable
                  style={{ padding: 20, marginBottom: 20 }}
                  cover={
                    <img
                      alt={this.props.inout.vehicleNo}
                      // @ts-ignore
                      src={
                        this.props.inout.outImgBase64Str
                          ? `${this.props.inout.outImgBase64Str}`
                          : emptyImage
                      }
                    />
                  }
                >
                  <Meta title={'출차사진'} />
                </Card>
              </Col>
            </Row>
          </Form>
        </Row>
      </>
    );
  }
}

const InoutDetailModalForm = Form.create<IInoutDetailModalProps>({ name: 'inoutDetailModal' })(
  InoutDetailModal
);

export default InoutDetailModalForm;
