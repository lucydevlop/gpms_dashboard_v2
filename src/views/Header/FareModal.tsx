import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Card, Descriptions, Input } from 'antd';
import { IFareObj, IFarePolicyObj } from '@models/fare';
import StandardTable from '@components/StandardTable';
import { ColumnProps } from 'antd/lib/table';
import { convertWeekDay } from '@utils/conversion';
import moment from 'moment';
import { EDelYn } from '@/constants/list';

interface IProps {
  fare?: IFareObj;
}

interface IState {
  loading: boolean;
}

@inject('parkinglotStore', 'localeStore')
@observer
class FareModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    const columns: ColumnProps<IFarePolicyObj>[] = [
      {
        title: '요금제명',
        key: 'fareName',
        width: 110,
        align: 'center',
        render: (text: string, record: IFarePolicyObj) => record.fareName
      },
      {
        title: '반영시간',
        key: 'time',
        width: 110,
        align: 'center',
        render: (text: string, record: IFarePolicyObj) => `${record.startTime} ~ ${record.endTime}`
      },
      {
        title: '적용일',
        key: 'time',
        width: 110,
        align: 'center',
        render: (text: string, record: IFarePolicyObj) => `${convertWeekDay(record.week)}`
      },
      {
        title: '반영시점',
        key: 'time',
        width: 110,
        align: 'center',
        render: (text: string, record: IFarePolicyObj) =>
          `${moment(record.effectDate!!).format('YYYY-MM-DD')} ~ ${moment(
            record.expireDate!!
          ).format('YYYY-MM-DD')}`
      },
      {
        title: '기본요금',
        // @ts-ignore
        children: [
          {
            title: '시간 / 금액',
            key: 'timeAmt',
            align: 'center',
            width: 100,
            render: (text: string, record: IFarePolicyObj) =>
              `${record.basicFare?.time1} / ${record.basicFare?.won1}`
          },
          {
            title: '반복',
            key: 'count1',
            align: 'center',
            width: 80,
            render: (text: string, record: IFarePolicyObj) => record.basicFare?.count1
          }
        ]
      },
      {
        title: '추가요금',
        // @ts-ignore
        children: [
          {
            title: '시간 / 금액',
            key: 'timeAmt',
            align: 'center',
            width: 100,
            render: (text: string, record: IFarePolicyObj) =>
              `${record.addFare?.time1} / ${record.addFare?.won1}`
          },
          {
            title: '반복',
            key: 'count1',
            align: 'center',
            width: 80,
            render: (text: string, record: IFarePolicyObj) => record.addFare?.count1
          }
        ]
      }
    ];
    return (
      <>
        <Descriptions bordered column={24}>
          <Descriptions.Item span={8} label={'서비스타임'} style={{ padding: '10px 16px' }}>
            {this.props.fare?.fareBasic.serviceTime}
          </Descriptions.Item>
          <Descriptions.Item span={8} label={'레그타임'} style={{ padding: '10px 16px' }}>
            {this.props.fare?.fareBasic.legTime}
          </Descriptions.Item>
          <Descriptions.Item span={8} label={'일최대요금'} style={{ padding: '10px 16px' }}>
            {this.props.fare?.fareBasic.dayMaxAmt}
          </Descriptions.Item>
        </Descriptions>
        <Card
          style={{ marginTop: '1rem' }}
          title="요금 정보"
          type="inner"
          headStyle={{ fontSize: 18, fontWeight: 700 }}
          size="default"
          bordered={false}
        >
          <StandardTable
            scroll={{ x: 'max-content' }}
            //loading={false}
            columns={columns}
            // @ts-ignore
            rowKey={(record: IFarePolicyObj) => String(record.sn)}
            data={{
              list: this.props.fare
                ? this.props.fare.farePolicies.filter((f) => f.delYn === EDelYn.N)
                : []
            }}
            hidePagination
          />
        </Card>
      </>
    );
  }
}

export default FareModal;
