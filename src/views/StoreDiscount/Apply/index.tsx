import React from 'react';
import { inject, observer } from 'mobx-react';
import PageWrapper from '@components/PageWrapper';
import { Card, Col, Input, Row } from 'antd';
import { Form } from '@ant-design/compatible';
import VehicleSearch from '@views/StoreDiscount/Apply/VehicleSearch';
import { applyCorpDiscountTicket, getCorpAllTickets, getVehicleSearch } from '@api/corp';
import { runInAction } from 'mobx';
import { ICorpTicketObj, ICorpSearchVehicleObj } from '@models/corp';
import TicketSummary from '@views/StoreDiscount/Apply/TicketSummary';
import VehicleList from '@views/StoreDiscount/Apply/VehicleList';
import DraggableModal from '@components/DraggableModal';
import { localeStore } from '@store/localeStore';
import TicketAplyModal from '@views/StoreDiscount/Apply/TicketAplyModal';
import { userStore } from '@store/userStore';
import zdsTips from '@utils/tips';

interface IState {
  loading: boolean;
  vehicleNo?: string;
  display: string;
  ticketsSummary: ICorpTicketObj[];
  searchResult: ICorpSearchVehicleObj[];
  resultMessage?: string;
  selecteTicket: ICorpTicketObj[];
  selectModal: boolean;
  selected?: ICorpSearchVehicleObj | null;
  corpSn: number;
}

@inject('localeStore', 'userStore')
@observer
class StoreDiscountAply extends React.PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      display: 'default',
      ticketsSummary: [],
      searchResult: [],
      selectModal: false,
      selecteTicket: [],
      corpSn: 0
    };
  }

  componentDidMount() {
    const { userInfo } = userStore;
    console.log('user', userInfo);
    this.setState({ corpSn: userInfo.corpSn }, () => this.pollCorpTickets('ALL'));
    this.pollCorpTickets('ALL');
  }

  pollCorpTickets(mode: string) {
    this.setState({ loading: true });
    getCorpAllTickets(this.state.corpSn, mode)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            if (mode === 'ALL') {
              this.setState({ ticketsSummary: data });
            } else {
              this.setState({ selecteTicket: data });
            }
          });
        }
      })
      .catch(() => {});

    this.setState({ loading: false });
  }

  handleSearhVehicleNo = (value: string) => {
    // console.log('Ticket', value);
    getVehicleSearch(value)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({
              searchResult: data,
              display: 'search',
              resultMessage: data.length === 0 ? '입차 정보가 없습니다' : ''
            });
          });
        }
      })
      .catch(() => {});
  };

  handleSelected = (value: ICorpSearchVehicleObj) => {
    // console.log('handleSelected', value.sn);
    this.setState({ display: 'selected', selectModal: true, selected: value }, () =>
      this.pollCorpTickets(value.sn.toString())
    );
  };

  handleDiscountAply = (values: ICorpTicketObj[]) => {
    console.log('handleDiscountAply', values);
    const data = values
      .filter((v) => v.applyCnt !== undefined && v.applyCnt > 0)
      .map((v) => {
        return {
          inSn: this.state.selected ? this.state.selected.sn : 0,
          cnt: v.applyCnt,
          discountClassSn: v.discountClassSn,
          corpSn: this.state.corpSn
        };
      });
    applyCorpDiscountTicket(data)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState(
              {
                selected: null,
                selecteTicket: [],
                ticketsSummary: [],
                display: 'default'
              },
              () => {
                zdsTips.success('주차 할인 등록 완료'), this.pollCorpTickets('ALL');
              }
            );
          });
        }
      })
      .catch(() => {
        this.setState(
          {
            selected: null,
            selecteTicket: [],
            ticketsSummary: [],
            display: 'default'
          },
          () => {
            zdsTips.error('방문권 등록 오류'), this.pollCorpTickets('ALL');
          }
        );
      })
      .finally(() => {
        this.setState({ selectModal: false });
      });
  };

  render() {
    const { localeObj } = localeStore;
    return (
      <PageWrapper>
        <Row gutter={24}>
          <Col xl={12} lg={12} md={24} sm={24} xs={24} style={{ marginBottom: '1rem' }}>
            <div>
              <VehicleSearch
                onSubmit={(value) => this.handleSearhVehicleNo(value)}
                message={this.state.resultMessage}
              />
            </div>
            {this.state.display === 'search' ? (
              <div>
                <VehicleList
                  vehicles={this.state.searchResult}
                  onSelected={(value) => this.handleSelected(value)}
                />
              </div>
            ) : null}
          </Col>
          <Col xl={12} lg={12} md={24} sm={24} xs={24} style={{ marginBottom: '1rem' }}>
            {this.state.display === 'default' ? (
              <TicketSummary ableTickets={this.state.ticketsSummary} />
            ) : null}
          </Col>
        </Row>
        {this.state.selectModal ? (
          <DraggableModal
            title={localeObj['label.ticket.create'] || '정기권 등록'}
            visible={this.state.selectModal}
            width={800}
            onOk={() => this.setState({ selectModal: false, display: 'default' })}
            onCancel={(): void => {
              this.setState({ selectModal: false, display: 'default' });
            }}
          >
            <TicketAplyModal
              ableTickets={this.state.selecteTicket}
              image={this.state.selected ? this.state.selected.imImagePath!! : null}
              onSubmit={(value) => this.handleDiscountAply(value)}
            />
          </DraggableModal>
        ) : null}
      </PageWrapper>
    );
  }
}

export default StoreDiscountAply;
