import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { localeStore } from '@store/localeStore';
import { Button, Card, Divider, Row } from 'antd';
import { Form } from '@ant-design/compatible';
import { getFormFields, ISelectOptions } from '@utils/form';
import Col from 'antd/es/grid/col';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { IBarcodeClassObj, IBarcodeObj } from '@models/barcode';
import { BarcodeSettingFields } from '@views/Setting/Product/tabs/fields/barcode';
import { delYnOpt, discountApplyTypeOpt, EDelYn } from '@/constants/list';
import { conversionDateTime, conversionEnumValue } from '@utils/conversion';
import moment from 'moment';
import { ColumnProps } from 'antd/lib/table';
import { ICorpTicketClassObj } from '@models/corpTicketClass';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import zdsTips from '@utils/tips';
import StandardTable from '@components/StandardTable';
import DraggableModal from '@components/DraggableModal';
import BarcodeClassModal from '@views/Setting/Product/tabs/modals/BarcodeClassModal';
import { IDiscountClassObj } from '@models/discountClass';

interface IProps extends FormComponentProps {
  discountClasses: IDiscountClassObj[];
  loading: boolean;
  barcode: IBarcodeObj | null;
  onSubmit: (info: IBarcodeObj) => void;
  onClassSubmit: (info: IBarcodeClassObj) => void;
  barcodeClasses: IBarcodeClassObj[];
  discountSelectClasses: ISelectOptions[];
}

interface IState {
  createModal: boolean;
  detailModal: boolean;
  selected?: IBarcodeClassObj;
}

class BarcodeTab extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      detailModal: false,
      createModal: false
    };
  }

  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        fieldsValue.delYn = EDelYn.N;
        fieldsValue.effectDate = conversionDateTime(new Date(), '{y}-{m}-{d} 00:00:00');
        fieldsValue.expireDate = moment(new Date(9999, 11, 31)).format('yyyy-MM-DD 23:59:59');
        this.props.onSubmit(fieldsValue);
      }
    });
  }

  handleBarcodeClassSubmit(info: IBarcodeClassObj) {}

  handleCreateClick = () => {
    this.setState({ createModal: true });
  };

  handleBtnClick = (info: IBarcodeClassObj, key: string) => {
    const { localeObj } = localeStore;
    if (key === 'delete') {
      zdsTips.confirm(localeObj['alert.delete'] || '선택 항목을 삭제(비활성) 하시겠습니까?', () => {
        info.delYn = EDelYn.Y;
        this.props.onClassSubmit(info);
      });
    } else {
      this.setState({ detailModal: true, createModal: false, selected: info });
    }
  };

  render() {
    const { localeObj } = localeStore;
    const { getFieldDecorator } = this.props.form;
    const barcodeSettingField = BarcodeSettingFields(this.props.barcode);
    const columns: ColumnProps<IBarcodeClassObj>[] = [
      {
        title: '사용여부',
        key: 'delYn',
        width: 80,
        align: 'center',
        filters: delYnOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.delYn.indexOf(value as string) === 0,
        render: (text: string, record: IBarcodeClassObj) => {
          const value = conversionEnumValue(record.delYn, delYnOpt);
          return <span style={{ color: value.color }}>{value.label}</span>;
        }
      },
      {
        title: '적용',
        key: 'name',
        width: 110,
        align: 'center',
        render: (text: string, record: IBarcodeClassObj) => record.start + ' ~ ' + record.end
      },
      {
        title: '할인정보',
        // @ts-ignore
        children: [
          {
            title: '할인명',
            key: 'discountNm',
            align: 'center',
            width: 100,
            render: (text: string, record: IBarcodeClassObj) =>
              record.discountClass ? record.discountClass.discountName : ''
          },
          {
            title: '적용타입',
            key: 'discountType',
            align: 'center',
            width: 80,
            render: (text: string, record: IBarcodeClassObj) =>
              record.discountClass
                ? conversionEnumValue(record.discountClass.discountApplyType, discountApplyTypeOpt)
                    .label
                : ''
          },
          {
            title: '적용값',
            key: 'unitTime',
            align: 'center',
            width: 80,
            render: (text: string, record: IBarcodeClassObj) =>
              record.discountClass ? record.discountClass.unit : ''
          }
        ]
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: IBarcodeClassObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'edit');
              }}
            >
              <EditOutlined />
            </a>
            <Divider type="vertical" />
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'delete');
              }}
            >
              <DeleteOutlined />
            </a>
          </div>
        )
      }
    ];

    return (
      <>
        <Card
          hoverable
          title={
            <span style={{ fontWeight: 500 }}>
              {localeObj['menu.setting.barcode' || '바코드할인기본']}
            </span>
          }
          className="thin-card"
          bordered={false}
        >
          <Form
            onSubmit={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              this.handlerSubmit();
            }}
          >
            <Row>{getFormFields(getFieldDecorator, barcodeSettingField, true, 3)}</Row>
            <Col style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: '20px', width: '150px' }}
              >
                수정
              </Button>
            </Col>
          </Form>
        </Card>
        <Card>
          <Row style={{ marginBottom: '1rem' }}>
            <Button
              type="primary"
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleCreateClick();
              }}
            >
              + {localeObj['label.create'] || '신규 등록'}
            </Button>
          </Row>
          <StandardTable
            scroll={{ x: 'max-content' }}
            loading={this.props.loading}
            columns={columns}
            // @ts-ignore
            rowKey={(record: IBarcodeClassObj) => String(record.sn)}
            data={{ list: this.props.barcodeClasses }}
            hidePagination
          />
        </Card>
        {this.state.createModal ? (
          <DraggableModal
            visible={this.state.createModal}
            title={localeObj['label.barcode.create'] || '바코드 할인권 생성'}
            onOk={(): void => {
              this.setState({ createModal: false });
            }}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
            width={800}
            footer={[]}
          >
            <BarcodeClassModal
              onSubmit={(value) => {
                this.setState({ createModal: false }), this.props.onClassSubmit(value);
              }}
              discountClasses={this.props.discountClasses}
              discountSelectClasses={this.props.discountSelectClasses}
            />
          </DraggableModal>
        ) : null}
        {this.state.detailModal ? (
          <DraggableModal
            visible={this.state.detailModal}
            title={localeObj['label.barcode.create'] || '바코드 할인권 생성'}
            onOk={(): void => {
              this.setState({ detailModal: false });
            }}
            onCancel={(): void => {
              this.setState({ detailModal: false });
            }}
            width={800}
            footer={[]}
          >
            <BarcodeClassModal
              barcodeClass={this.state.selected}
              onSubmit={(value) => {
                this.setState({ detailModal: false }), () => this.props.onClassSubmit(value);
              }}
              discountClasses={this.props.discountClasses}
              discountSelectClasses={this.props.discountSelectClasses}
            />
          </DraggableModal>
        ) : null}
      </>
    );
  }
}

const BarcodeTabForm = Form.create<IProps>()(BarcodeTab);
export default BarcodeTabForm;
