import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { IFacilityObj } from '@models/facility';
import { Badge, Row, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { categoryOpt, EBreakerStatus, ECategory } from '@/constants/list';
import zdsTips from '@utils/tips';
import { localeStore } from '@store/localeStore';
import { actionFacility, getActiveFacilities } from '@api/facility';
import { runInAction } from 'mobx';
import { conversionEnumValue } from '@utils/conversion';
import DraggableModal from '@components/DraggableModal';
import ControlModal from '@views/Header/ControlModal';

interface IProps {}
interface IState {
  facilities: IFacilityObj[];
  selected?: IFacilityObj;
  breakerShowModal: boolean;
}

@inject('localeStore')
@observer
class FacilityModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      facilities: [],
      breakerShowModal: false
    };
  }

  componentDidMount() {
    getActiveFacilities()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ facilities: data });
          });
        }
      })
      .catch(() => {});
  }

  handleBtnClick = (info: IFacilityObj, type: string) => {
    const { localeObj } = localeStore;
    switch (type) {
      case 'breaker':
        this.setState({ selected: info, breakerShowModal: true });
        // console.log('handleBtnClick breaker');
        break;
      case 'reset':
        zdsTips.confirm(localeObj['alert.reset'] || '리셋 하시겠습니까?', () => {
          actionFacility(info.dtFacilitiesId, 'RESET').then();
        });
        break;
      default:
        break;
    }
  };

  handleBreakerAction = (facility: IFacilityObj, status: EBreakerStatus) => {
    // console.log('handleBreakerAction', facility.facilityId, status);
    actionFacility(facility.dtFacilitiesId, status).then();
    this.setState({ breakerShowModal: false });
  };

  renderStatus(item: IFacilityObj) {
    if (item.health === 'NORMAL') {
      return <Badge color="#87d068" />;
    }
    if (item.health === 'ERROR') {
      return <Badge color="#f50" />;
    }
    return <Badge color="#d9d9d9" />;
  }

  renderFacilityAction(item: IFacilityObj) {
    if (item.category === ECategory.BREAKER) {
      return (
        <div>
          <a
            onClick={(e: any) => {
              e.stopPropagation();
              this.handleBtnClick(item, 'breaker');
            }}
          >
            Action
          </a>
        </div>
      );
    }
    return null;
  }

  render() {
    const { localeObj } = localeStore;
    const { facilities } = this.state;
    const columns: ColumnProps<IFacilityObj>[] = [
      {
        title: 'No',
        width: 20,
        dataIndex: '',
        fixed: 'left',
        render: (text: string, record: IFacilityObj, index: number) => index + 1
      },
      {
        title: '게이트ID',
        dataIndex: 'gateId',
        width: 100,
        fixed: 'left',
        align: 'center'
      },
      {
        title: '카테고리',
        // dataIndex: 'category',
        width: 100,
        fixed: 'left',
        align: 'center',
        render: (item: IFacilityObj) => conversionEnumValue(item.category, categoryOpt).label
      },
      {
        title: '시설ID',
        dataIndex: 'dtFacilitiesId',
        width: 100,
        fixed: 'left',
        align: 'center'
      },
      {
        title: '시설명',
        dataIndex: 'fname',
        width: 120,
        fixed: 'left',
        align: 'center'
      },
      {
        title: '상태',
        width: 70,
        fixed: 'right',
        align: 'center',
        render: (item: IFacilityObj) => this.renderStatus(item)
      },
      {
        title: 'Reset',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: IFacilityObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'reset');
              }}
            >
              Reset
            </a>
          </div>
        )
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: IFacilityObj) => this.renderFacilityAction(item)
      }
    ];
    return (
      <>
        <Row>
          <Table columns={columns} dataSource={facilities} pagination={false} />
        </Row>
        {this.state.breakerShowModal && this.state.selected ? (
          <DraggableModal
            title={localeObj['label.breaker.control'] || '차단기 제어'}
            visible={this.state.breakerShowModal}
            width={400}
            onOk={() => this.setState({ breakerShowModal: false })}
            onCancel={(): void => {
              this.setState({ breakerShowModal: false });
            }}
            footer={[]}
          >
            <ControlModal
              facility={this.state.selected}
              onExecute={(facility, status) => this.handleBreakerAction(facility, status)}
            />
          </DraggableModal>
        ) : null}
      </>
    );
  }
}

export default FacilityModal;
