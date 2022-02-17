import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import { inject, observer } from 'mobx-react';
import { layoutStore } from '@store/layoutStore';
import { Col, Row, Collapse, Form, Input, Card, Descriptions, Button, Divider, Tabs } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { IFareBasicObj, IFareInfoObj, IFarePolicyObj } from '@models/fare';
import {
  createFareBasic,
  createFareInfo,
  createFarePolicy,
  getFareReference,
  updateFareInfo,
  updateFarePolicy
} from '@/api/fare';
import { runInAction } from 'mobx';
import StandardDescription, { Attribute } from '@components/StandardDescription';
import { conversionDate, conversionEnumValue, convertWeekDay } from '@utils/conversion';
import { ColumnProps } from 'antd/lib/table';
import StandardTable from '@components/StandardTable';
import DraggableModal from '@components/DraggableModal';
import { localeStore } from '@store/localeStore';
import FareBasicModal from '@views/Setting/Fee/Modal/FareBasicModal';
import FarePolicyModal from '@views/Setting/Fee/Modal/FarePolicyModal';
import FareInfoModal from '@views/Setting/Fee/Modal/FareInfoModal';
import { v4 as generateUUID } from 'uuid';
import { EDelYn, fareTypeOpt } from '@/constants/list';
import zdsTips from '@utils/tips';
import moment from 'moment';

interface IState {
  loading: boolean;
  fareInfos: IFareInfoObj[];
  fareBasic?: IFareBasicObj | null;
  farePolicies: IFarePolicyObj[];
  fareBasicModal: boolean;
  farePolicyModal: boolean;
  selectedFarePolicy?: IFarePolicyObj;
  fareInfoModal: boolean;
  selectedFareInfo?: IFareInfoObj;
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
      farePolicyModal: false,
      fareInfoModal: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getFareReference()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({
              fareInfos: data.fareInfos,
              farePolicies: data.farePolicies,
              fareBasic: data.fareBasic
            });
          });
        }
      })
      .catch(() => {});

    // getFareBasic()
    //   .then((res: any) => {
    //     const { msg, data } = res;
    //     if (msg === 'success') {
    //       runInAction(() => {
    //         this.setState({ fareBasic: data });
    //       });
    //     }
    //   })
    //   .catch(() => {});
    //
    // getFarePolicies()
    //   .then((res: any) => {
    //     const { msg, data } = res;
    //     if (msg === 'success') {
    //       runInAction(() => {
    //         this.setState({ farePolicies: data });
    //         console.log(this.state.farePolicies);
    //       });
    //     }
    //   })
    //   .catch(() => {});

    this.setState({ loading: false });
  }

  handleFareBasicClick(key: string) {
    this.setState({ fareBasicModal: true });
  }

  handleFareBasicSubmit = (info: IFareBasicObj) => {
    // console.log('handleFareBasicSubmit', info);
    this.setState({ fareBasicModal: false });
    createFareBasic(info)
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
    const { localeObj } = localeStore;
    // console.log('handleFarePolicyClick', key);
    if (key === 'delete') {
      zdsTips.confirm(localeObj['alert.delete'] || '선택 항목을 삭제(비활성) 하시겠습니까?', () => {
        info !== null || true ? (info!!.delYn = EDelYn.Y) : null;
        updateFarePolicy(info).then((res: any) => {
          const { msg, data } = res;
          runInAction(() => {
            if (msg === 'success') {
              runInAction(() => {
                this.setState({
                  farePolicies: this.state.farePolicies.filter((e) => {
                    return data.sn !== e.sn;
                  })
                });
              });
            }
          });
        });
      });
    } else {
      this.setState({ selectedFarePolicy: info, farePolicyModal: true });
    }
  }

  handleFarePolicySubmit = (info: IFarePolicyObj) => {
    // console.log('handleFarePolicySubmit', info);
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
    // console.log('handleFarePolicyClick', key);
    if (key === 'delete') {
      info!!.delYn = EDelYn.Y;
      updateFareInfo(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const fareInfos = this.state.fareInfos.filter((p) => p.sn !== data.sn);
              this.setState({ fareInfos: fareInfos });
            });
          }
        })
        .catch(() => {});
    } else {
      this.setState({ selectedFareInfo: info, fareInfoModal: true });
    }
  }

  handleFareInfoSubmit = (info: IFareInfoObj) => {
    console.log('handleFareInfoSubmit', info);
    if (info.sn === null) {
      createFareInfo(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const fareInfos = this.state.fareInfos;
              this.setState({ fareInfos: [...fareInfos, data] });
            });
          }
        })
        .catch(() => {});
    } else {
      updateFareInfo(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const fareInfos = this.state.fareInfos.map((p) => {
                if (p.sn === data.sn) {
                  return { ...data };
                }
                return { ...p };
              });
              this.setState({ fareInfos: fareInfos });
            });
          }
        })
        .catch(() => {});
    }
    this.setState({ fareInfoModal: false });
  };

  renderFareBasic() {
    const attibutes: Attribute[] = [
      {
        name: '서비스타임(분)',
        value: this.state.fareBasic ? this.state.fareBasic.serviceTime : ''
      },
      {
        name: '레그타임(분)',
        value: this.state.fareBasic ? this.state.fareBasic.legTime : ''
      },
      {
        name: '할인권타임(분)',
        value: this.state.fareBasic ? this.state.fareBasic.ticketTime : ''
      },
      {
        name: '일최대요금',
        value: this.state.fareBasic ? this.state.fareBasic.dayMaxAmt : ''
      }
    ];
    return (
      <StandardDescription
        key={generateUUID()}
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
        render: (text: string, record: IFareInfoObj) =>
          conversionEnumValue(record.type, fareTypeOpt).label
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
        render: (text: string, record: IFareInfoObj) => {
          return record.count >= 9999 ? '무제한' : record.count;
        }
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
            <Divider type="vertical" />
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleFareInfoClick('delete', item);
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
          name: '적용일',
          value: f ? `${convertWeekDay(f.week)}` : ''
        },
        {
          name: '적용시점',
          value: f
            ? `${moment(f.effectDate!!).format('YYYY-MM-DD')} ~ ${moment(f.expireDate!!).format(
                'YYYY-MM-DD'
              )}`
            : ''
        },
        {
          name: '우선적용순위(낮은순)',
          value: f ? `${f.orderNo}` : '0'
        }
      ];
      return (
        <StandardDescription
          key={generateUUID()}
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
              <Divider type="vertical" />
              <a
                onClick={(e: any) => {
                  e.stopPropagation();
                  this.handleFarePolicyClick('delete', f);
                }}
              >
                <DeleteOutlined />
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
    const { TabPane } = Tabs;
    return (
      <PageWrapper>
        <Tabs type="card">
          <TabPane tab="요금 기본 정보" key="1">
            <Row gutter={24}>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Row style={{ marginBottom: '12px', width: '100%' }}>
                  <Col style={{ width: '100%' }}>
                    <Form className="action-error-modal-form">
                      <Form.Item>{this.renderFareBasic()}</Form.Item>
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
          </TabPane>
          <TabPane tab="요금 블록 정보" key="2">
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
                              this.handleFareInfoClick('add');
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
          </TabPane>
        </Tabs>
        {this.state.fareBasicModal ? (
          <DraggableModal
            title={localeObj['label.fareBasic.info'] || '요금 정책 기본'}
            visible={this.state.fareBasicModal}
            onOk={(): void => {
              this.setState({ fareBasicModal: false });
            }}
            onCancel={(): void => {
              this.setState({ fareBasicModal: false });
            }}
            width={800}
            footer={[]}
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
            title={localeObj['label.farePolicy.info'] || '요금제 상세'}
            visible={this.state.farePolicyModal}
            onOk={(): void => {
              this.setState({ farePolicyModal: false });
            }}
            onCancel={(): void => {
              this.setState({ farePolicyModal: false });
            }}
            width={800}
            footer={[]}
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
        {this.state.fareInfoModal ? (
          <DraggableModal
            title={localeObj['label.fareInfo.info'] || '요금 블록'}
            visible={this.state.fareInfoModal}
            onOk={(): void => {
              this.setState({ fareInfoModal: false });
            }}
            onCancel={(): void => {
              this.setState({ fareInfoModal: false });
            }}
            width={800}
            footer={[]}
          >
            <FareInfoModal
              onSubmit={(value) => {
                this.handleFareInfoSubmit(value);
              }}
              fareInfo={this.state.selectedFareInfo}
            />
          </DraggableModal>
        ) : null}
      </PageWrapper>
    );
  }
}

export default FeeSetting;
