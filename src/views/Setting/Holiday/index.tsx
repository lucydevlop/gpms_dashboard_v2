import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import { IHolidayObj } from '@models/holiday';
import { Badge, Calendar } from 'antd';
import locale from 'antd/es/calendar/locale/ko_KR';
import moment from 'moment';
import { createHoliday, getHolidays, updateHoliday } from '@api/holiday';
import { runInAction } from 'mobx';
import DraggableModal from '@components/DraggableModal';
import { localeStore } from '@store/localeStore';
import HolidayModal from '@views/Setting/Holiday/Modal/HolidayModal';
import { EDelYn } from '@/constants/list';

interface IState {
  loading: boolean;
  days: IHolidayObj[];
  startDate: string;
  endDate: string;
  selected?: string;
  selectDays?: IHolidayObj[];
  showModal: boolean;
}

const styles = {
  events: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  }
};

export const getBadge = (status: any, text: string) => <Badge status={status} text={text} />;

class SpecialDay extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    const today = new Date();
    this.state = {
      loading: true,
      days: [],
      showModal: false,
      startDate: moment(new Date(today.getFullYear(), today.getMonth(), 1)).format('YYYY-MM-DD'),
      endDate: moment(new Date(today.getFullYear(), today.getMonth() + 1, 0)).format('YYYY-MM-DD'),
      selected: moment(today).format('YYYY-MM-DD')
    };
  }

  componentDidMount() {
    this.pollData();
  }

  pollData() {
    this.setState({ loading: true });
    const data = { startDate: this.state.startDate, endDate: this.state.endDate };
    getHolidays(data)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ days: data });
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  getList(items: IHolidayObj[], showTotal?: boolean) {
    return items.length ? (
      <div>
        {showTotal && `(${items.length}) Events`}
        <ul style={styles.events}>
          {items.map((item) => (
            <li key={item.name}>
              {getBadge(item.isWorking ? 'success' : 'error', item.name)}
              {showTotal && `(${item.startDate})`}
            </li>
          ))}
        </ul>
      </div>
    ) : null;
  }

  submit = (info: IHolidayObj) => {
    this.setState({ loading: true });
    if (info.sn === undefined || info.sn === null) {
      info.delYn = EDelYn.N;
      createHoliday(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const days = [...this.state.days, data];
              this.setState({ days: days });
            });
          }
        })
        .catch(() => {})
        .finally(() => {
          this.setState({ loading: false, showModal: false });
        });
    } else {
      updateHoliday(info)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              const days =
                info.delYn === EDelYn.Y
                  ? this.state.days.filter((d) => d.sn != data.sn)
                  : this.state.days.map((e) => {
                      return e.sn === data.sn ? { ...data } : { ...e };
                    });
              this.setState({ days: days });
            });
          }
        })
        .catch(() => {})
        .finally(() => {
          this.setState({ loading: false, showModal: false });
        });
    }
  };

  onSelectDateCell = async (value: moment.Moment) => {
    if (!value.isSame(this.state.selected, 'month')) {
      this.setState(
        {
          startDate: moment(new Date(value.year(), value.month(), 1)).format('YYYY-MM-DD'),
          endDate: moment(new Date(value.year(), value.month() + 1, 0)).format('YYYY-MM-DD')
        },
        () => this.pollData()
      );
    }
    const selectDays = this.state.days.filter(
      (d) => d.startDate.substring(0, 10) === value.format('YYYY-MM-DD')
    );
    this.setState({
      selected: value.format('YYYY-MM-DD'),
      showModal: true,
      selectDays: selectDays
    });
  };

  dateCellRender(date: moment.MomentInput, days: IHolidayObj[]) {
    const dayEvents = days.filter((day) => moment(day.startDate).isSame(date, 'day'));
    return this.getList(dayEvents);
  }

  monthCellRender(date: moment.MomentInput, days: IHolidayObj[]) {
    const monthEvents = days.filter((event) => moment(event.startDate).isSame(date, 'month'));
    return this.getList(monthEvents, true);
  }

  render() {
    const { localeObj } = localeStore;
    const selectItems = this.state.days.filter((d) => d.startDate === this.state.selected);
    return (
      <PageWrapper>
        <Calendar
          locale={locale}
          onSelect={this.onSelectDateCell}
          dateCellRender={(date) => this.dateCellRender(date, this.state.days)}
          monthCellRender={(date) => this.monthCellRender(date, this.state.days)}
        />
        {this.state.showModal ? (
          <DraggableModal
            title={localeObj['label.holiday.info'] || '휴일/특근일 상세'}
            visible={this.state.showModal}
            onOk={(): void => {
              this.setState({ showModal: false });
            }}
            onCancel={(): void => {
              this.setState({ showModal: false });
            }}
            width={900}
            footer={[]}
          >
            <HolidayModal
              day={
                this.state.selected ? this.state.selected : moment(new Date()).format('YYYY-MM-DD')
              }
              items={this.state.selectDays}
              onSubmit={this.submit}
            />
          </DraggableModal>
        ) : null}
      </PageWrapper>
    );
  }
}

export default SpecialDay;
