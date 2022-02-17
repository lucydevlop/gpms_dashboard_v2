import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import { ColumnProps } from 'antd/lib/table';
import { ISetting } from '@models/setting';
import { Divider, Switch } from 'antd';
import { getSettings } from '@api/setting';
import { IUserObj } from '@models/user';
import StandardTable from '@components/StandardTable';
import { IInoutObj } from '@models/inout';

type IState = {
  loading: boolean;
  list: ISetting[];
  detailModal: boolean;
  selected?: ISetting;
};
type IProps = {};

class Setting extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      list: [],
      detailModal: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getSettings().then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        this.setState({ list: data });
      }
    });

    this.setState({ loading: false });
  }

  handleClick = (item: ISetting) => {
    this.setState({ detailModal: true, selected: item });
  };

  render() {
    const columns: ColumnProps<ISetting>[] = [
      {
        title: 'KEY',
        width: 100,
        key: 'key',
        align: 'center',
        render: (text: string, record: ISetting) => record.key
      },
      {
        title: 'KEY Name',
        width: 100,
        key: 'keyName',
        align: 'center',
        render: (text: string, record: ISetting) => record.keyName
      },
      {
        title: '활성',
        width: 100,
        key: 'enabled',
        align: 'center',
        render: (text: string, record: ISetting) => {
          return <Switch disabled={true} defaultChecked={record.enabled} />;
        }
      },
      {
        title: '설정',
        width: 300,
        key: 'enabled',
        align: 'center',
        render: (text: string, record: ISetting) => {
          return record.value ? (
            <pre style={{ maxWidth: '450px', textAlign: 'left' }}>
              {JSON.stringify(record.value, null, '  ')}
            </pre>
          ) : null;
        }
      },
      // {
      //   title: '예시',
      //   width: 100,
      //   key: 'enabled',
      //   align: 'center',
      //   render: (text: string, record: ISetting) => {
      //     return record.description ? (
      //       <pre style={{ maxWidth: '150px', textAlign: 'left' }}>
      //         {JSON.stringify(record.description.replaceAll('\\', ''), null, 2)}
      //       </pre>
      //     ) : null;
      //   }
      // },
      {
        title: 'Action',
        width: 110,
        align: 'center',
        fixed: 'right',
        render: (item: ISetting) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleClick(item);
              }}
            >
              수정
            </a>
          </div>
        )
      }
    ];
    const { list } = this.state;
    return (
      <PageWrapper>
        <StandardTable
          scroll={{ x: 'max-content' }}
          columns={columns}
          loading={this.state.loading}
          // @ts-ignore
          rowKey={(record: ISetting) => String(record.sn)}
          data={{
            list
          }}
        />
      </PageWrapper>
    );
  }
}

export default Setting;
