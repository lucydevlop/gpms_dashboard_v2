import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { layoutStore } from '@store/layoutStore';
import { Col, Row, Collapse, Form, Input, Card, Descriptions, Button } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { IFareBasicObj, IFareInfoObj, IFarePolicyObj } from '@models/fare';
import {
  createFarePolicy,
  getFareBasic,
  getFareInfo,
  getFarePolicies,
  updateFareBasic,
  updateFarePolicy
} from '@/api/fare';
import { runInAction } from 'mobx';
import StandardDescription, { Attribute } from '@components/StandardDescription';
import { conversionDate } from '@utils/conversion';
import { ColumnProps } from 'antd/lib/table';
import StandardTable from '@components/StandardTable';
import DraggableModal from '@components/DraggableModal';
import { localeStore } from '@store/localeStore';
import FareBasicModal from '@views/Setting/Fee/Modal/FareBasicModal';
import FarePolicyModal from '@views/Setting/Fee/Modal/FarePolicyModal';

interface IState {
  loading: boolean;
  fareInfos: IFareInfoObj[];
  fareBasic?: IFareBasicObj | null;
  farePolicies: IFarePolicyObj[];
  fareBasicModal: boolean;
  farePolicyModal: boolean;
  selectedFarePolicy?: IFarePolicyObj;
}
@inject('layoutStore')
@observer
class FeeSetting extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      fareInfos: [],
      farePolicies: [],
      fareBasicModal: false,
      farePolicyModal: false
    };
  }

  handleFareBasicClick(key: string) {
    this.setState({ fareBasicModal: true });
  }

  handleFareBasicSubmit = (info: IFareBasicObj) => {
    // console.log('handleFareBasicSubmit', info);
    this.setState({ fareBasicModal: false });
    updateFareBasic(info)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ fareBasic: data });
          });
        }
      })
      .catch(() => {});
  };

  handleFarePolicyClick(key: string, info?: IFarePolicyObj) {
    console.log('handleFarePolicyClick', key);
    this.setState({ selectedFarePolicy: info, farePolicyModal: true });
  }

  handleFarePolicySubmit = (info: IFarePolicyObj) => {
    console.log('handleFarePolicySubmit', info);
    if (info.sn === null) {
      createFarePolicy(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const farePolicies = this.state.farePolicies;
              this.setState({ farePolicies: [...farePolicies, data] });
            });
          }
        })
        .catch(() => {});
    } else {
      updateFarePolicy(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const farePolicies = this.state.farePolicies.map((p) => {
                if (p.sn === data.sn) {
                  return { ...data };
                }
                return { ...p };
              });
              this.setState({ farePolicies: farePolicies });
            });
          }
        })
        .catch(() => {});
    }
    this.setState({ farePolicyModal: false });
  };

  handleFareInfoClick(key: string, info?: IFareInfoObj) {
    console.log('handleFarePolicyClick', key);
  }

  componentDidMount() {
    this.setState({ loading: true });
    getFareInfo()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ fareInfos: data });
          });
        }
      })
      .catch(() => {});

    getFareBasic()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ fareBasic: data });
          });
        }
      })
      .catch(() => {});

    getFarePolicies()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ farePolicies: data });
          });
        }
      })
      .catch(() => {});

    this.setState({ loading: false });
  }

  renderFareBasic() {
    const attibutes: Attribute[] = [
      {
        name: '서비스타임(분)',
        value: this.state.fareBasic ? this.state.fareBasic.serviceTime : ''
      },
      {
        name: '레그타임(분)',
        value: this.state.fareBasic ? this.state.fareBasic.regTime : ''
      },
      {
        name: '일최대요금',
        value: this.state.fareBasic ? this.state.fareBasic.dayMaxAmt : ''
      }
    ];
    return (
      <StandardDescription
        attributes={attibutes}
        header={'정책 기본 정보'}
        icon={
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleFareBasicClick('edit');
              }}
            >
              <EditOutlined />
            </a>
          </div>
        }
      />
    );
  }

  renderFareInfos() {
    const columns: ColumnProps<IFareInfoObj>[] = [
      {
        title: '요금명',
        key: 'fareName',
        width: 100,
        align: 'center',
        render: (text: string, record: IFareInfoObj) => record.fareName
      },
      {
        title: '요금타입',
        key: 'type',
        width: 100,
        align: 'center',
        render: (text: string, record: IFareInfoObj) => record.type
      },
      {
        title: '시간 / 금액',
        key: 'time',
        width: 100,
        align: 'center',
        render: (text: string, record: IFareInfoObj) => `${record.time1} / ${record.won1}`
      },
      {
        title: '반복',
        key: 'count',
        width: 100,
        align: 'center',
        render: (text: string, record: IFareInfoObj) => record.count
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: IFareInfoObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleFareInfoClick('edit', item);
              }}
            >
              <EditOutlined />
            </a>
          </div>
        )
      }
    ];

    return (
      <>
        <StandardTable
          scroll={{ x: 'max-content' }}
          loading={this.props.loading}
          columns={columns}
          // @ts-ignore
          rowKey={(record: IFareInfoObj) => String(record.sn)}
          data={{ list: this.state.fareInfos }}
          hidePagination
        />
      </>
    );
  }

  renderFarePolicies() {
    const result = this.state.farePolicies.map((f) => {
      const attibutes: Attribute[] = [
        {
          name: '요금반영시간',
          value: f ? `${f.startTime} ~ ${f.endTime}` : ''
        },
        {
          name: '기본요금정보',
          value: f
            ? `${f.basicFare!!.fareName} ( ${f.basicFare!!.time1}분 / ${f.basicFare!!.won1}원 )`
            : ''
        },
        {
          name: '추가요금정보',
          value: f
            ? `${f.addFare!!.fareName} ( ${f.addFare!!.time1}분 / ${f.addFare!!.won1}원 )`
            : ''
        },
        {
          name: '적용시점',
          value: f
            ? `${conversionDate(f.effectDate!!, '{y}-{m}-{d}')} ~ ${conversionDate(
                f.expireDate!!,
                '{y}-{m}-{d}'
              )}`
            : ''
        }
      ];
      return (
        <StandardDescription
          attributes={attibutes}
          header={f.fareName}
          icon={
            <div>
              <a
                onClick={(e: any) => {
                  e.stopPropagation();
                  this.handleFarePolicyClick('edit', f);
                }}
              >
                <EditOutlined />
              </a>
            </div>
          }
        />
      );
    });
    return <>{result}</>;
  }

  render() {
    const { isDarkTheme } = layoutStore;
    const { localeObj } = localeStore;
    return (
      <PageWrapper>
        <Row gutter={24}>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Row style={{ marginBottom: '12px', width: '100%' }}>
              <Col style={{ width: '100%' }}>
                <Form className="action-error-modal-form">
                  <Form.Item>{this.renderFareBasic()}</Form.Item>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col style={{ width: '100%' }}>
                <Form className="action-error-modal-form">
                  <Form.Item>
                    <Card
                      title="요금 블록 정보"
                      type="inner"
                      headStyle={{ fontSize: 18, fontWeight: 700 }}
                      size="default"
                      bordered={false}
                      extra={
                        <div>
                          <a
                            onClick={(e: any) => {
                              e.stopPropagation();
                              this.handleFarePolicyClick('add');
                            }}
                          >
                            <PlusCircleOutlined />
                          </a>
                        </div>
                      }
                    >
                      {this.renderFareInfos()}
                    </Card>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Form className="action-error-modal-form">
              <Form.Item>
                <Card
                  title="요금제 정보"
                  type="inner"
                  headStyle={{ fontSize: 18, fontWeight: 700 }}
                  size="default"
                  bordered={false}
                  extra={
                    <div>
                      <a
                        onClick={(e: any) => {
                          e.stopPropagation();
                          this.handleFarePolicyClick('add');
                        }}
                      >
                        <PlusCircleOutlined />
                      </a>
                    </div>
                  }
                >
                  {this.renderFarePolicies()}
                </Card>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        {this.state.fareBasicModal ? (
          <DraggableModal
            title={localeObj['label.gate.info'] || '게이트 상세'}
            visible={this.state.fareBasicModal}
            onOk={(): void => {
              this.setState({ fareBasicModal: false });
            }}
            onCancel={(): void => {
              this.setState({ fareBasicModal: false });
            }}
          >
            <FareBasicModal
              onSubmit={(value) => {
                this.handleFareBasicSubmit(value);
              }}
              farebasic={this.state.fareBasic}
            />
          </DraggableModal>
        ) : null}
        {this.state.farePolicyModal ? (
          <DraggableModal
            title={localeObj['label.gate.info'] || '게이트 상세'}
            visible={this.state.farePolicyModal}
            onOk={(): void => {
              this.setState({ farePolicyModal: false });
            }}
            onCancel={(): void => {
              this.setState({ farePolicyModal: false });
            }}
            width={550}
          >
            <FarePolicyModal
              onSubmit={(value) => {
                this.handleFarePolicySubmit(value);
              }}
              fareInfos={this.state.fareInfos}
              farePolicy={this.state.selectedFarePolicy}
            />
          </DraggableModal>
        ) : null}
      </PageWrapper>
    );
  }
}

export default FeeSetting;
