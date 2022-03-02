import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { IVoipCallObj } from '@models/voip';
import { Form, Icon } from '@ant-design/compatible';
import moment from 'moment';
import { IInoutObj, IInoutSelectReq } from '@models/inout';
import { EInoutType, ETicketType, ticketTypeOpt } from '@/constants/list';
import { deleteParkinglotInout, getInouts, updateParkinglotInout } from '@api/Inout';
import { runInAction } from 'mobx';
import { ColumnProps } from 'antd/lib/table';
import { conversionDateTime, conversionEnumValue } from '@utils/conversion';
import { Divider, Image, Input, Popconfirm, Table } from 'antd';

interface IProps extends FormComponentProps {}

interface IState {
  loading: boolean;
  current: number;
  pageSize: number;
  searchParam?: IInoutSelectReq;
  selected?: IInoutObj;
  list: IInoutObj[];
  total: number;
  editingKey: string;
}

@inject('parkinglotStore', 'localeStore')
@observer
class UnRecognizeModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      current: 1,
      pageSize: 10,
      list: [],
      total: 0,
      editingKey: ''
    };
  }

  private columns: any[] = [
    {
      dataIndex: 'parkcartype',
      title: '차량상태',
      key: 'parkcartype',
      width: 90,
      align: 'center',
      render: (text: string, record: IInoutObj) => {
        const type = conversionEnumValue(record.parkcartype, ticketTypeOpt);
        return {
          props: {
            style: {
              color: type.color
            }
          },
          children: <div>{type.label}</div>
        };
      }
    },
    {
      dataIndex: 'vehicleNo',
      title: '차량번호',
      key: 'vehicleNo',
      width: 90,
      align: 'center',
      editable: true,
      render: (text: string, record: IInoutObj) => (record.vehicleNo ? record.vehicleNo : '-')
    },
    {
      dataIndex: 'inDate',
      title: '입차',
      key: 'inDate',
      width: 120,
      align: 'center',
      render: (text: string, record: IInoutObj) =>
        conversionDateTime(record.inDate, '{y}-{m}-{d} {h}:{i}') || '--'
    },
    {
      dataIndex: 'inImgBase64Str',
      key: 'inImgBase64Str',
      title: '입차사진',
      width: 130,
      align: 'center',
      render: (text: any, record: IInoutObj) => <Image src={`${record.inImgBase64Str}`} />
    },
    {
      key: 'action',
      align: 'center',
      render: (text: any, record: IInoutObj, index: number) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {(form) => (
                <a
                  href="javascript:;"
                  onClick={() => this.handleSave(form, record.parkinSn ? record.parkinSn : -1)}
                  style={{ marginRight: 8 }}
                >
                  저장
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="취소하시겠습니까？" onConfirm={() => this.handleCancel()}>
              <a>취소</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <a
              aria-disabled={editingKey !== ''}
              onClick={() => this.handleEdit(record.parkinSn ? record.parkinSn.toString() : '')}
            >
              수정
            </a>
            <Divider type="vertical" />
            <a
              aria-disabled={editingKey !== ''}
              onClick={() => this.handleDelete(record.parkinSn ? record.parkinSn.toString() : '')}
            >
              강제출차
            </a>
          </span>
        );
        // return (
        //   <div>
        //     <Popconfirm
        //       title="确定要删除吗?"
        //       // onConfirm={this.uiAction.deleteClick.bind(undefined, `delete_${record.id}`)}
        //       okText="确认"
        //       cancelText="取消"
        //     >
        //       <a id={`delete_${record.parkinSn}`} href={'##'} title="删除">
        //         <Icon type="delete" />
        //       </a>
        //     </Popconfirm>
        //   </div>
        // );
      },
      width: 100,
      title: 'Action'
    }
  ];

  componentDidMount() {
    const createTm = [moment(new Date()).subtract(1, 'days'), moment(new Date())];
    const searchParam: IInoutSelectReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      dateType: EInoutType.IN,
      outSn: ''
    };
    this.setState(
      {
        searchParam: searchParam,
        loading: false
      },
      () => this.pollData()
    );
  }

  pollData = () => {
    const data: any = {};
    data.startDate = this.state.searchParam?.startDate;
    data.endDate = this.state.searchParam?.endDate;
    data.dateType = this.state.searchParam?.dateType;
    data.vehicleNo = '';
    data.parkcartype = 'RECOGNIZED';
    data.outSn = '';
    //console.log('pollData', data);

    getInouts(data, this.state.current, this.state.pageSize)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ list: data, total: data.length, loading: false });
          });
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  isEditing = (record: IInoutObj) =>
    record.parkinSn ? record.parkinSn.toString() === this.state.editingKey : false;

  handleSave = (form: any, key: number) => {
    this.props.form.validateFields((error: any, row: any) => {
      if (error) {
        return;
      }
      form.parkcartype = ETicketType.NORMAL;
      updateParkinglotInout(form).then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          this.pollData();
        }
      });
    });
  };

  handleCancel = () => {
    this.setState({ editingKey: '' });
  };

  handleEdit = (key: string) => {
    this.setState({ editingKey: key });
  };

  handleDelete = (key: string) => {
    // console.log('handleDelete', key);
    const newData = this.state.list.filter((item) => item.parkinSn !== Number(key));
    if (newData == null) return;
    deleteParkinglotInout(key)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          this.pollData();
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return { ...col };
      }
      return {
        ...col,
        onCell: (record: any, rowindex: number) => {
          return {
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            index: rowindex,
            handleSave: this.handleSave
          };
        }
      };
    });
    return (
      <>
        <Table
          columns={columns}
          components={components}
          className={'ori-table ori-table-fixed'}
          dataSource={this.state.list}
          pagination={{
            total: this.state.total,
            current: this.state.current,
            pageSize: 5,
            onChange: this.handleCancel
          }}
          rowKey={(record: IInoutObj) => String(record.parkinSn)}
        />
      </>
    );
  }
}

export default Form.create<IProps>()(UnRecognizeModal);

const EditableContext = React.createContext({});

const EditableRow = ({ form, index, ...props }: any) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

interface IEditableCellProps extends FormComponentProps {
  // GlobalStepsViewDomainStore?: FirstRestaurantDoMainStore;
  editable: boolean;
  dataIndex: string;
  title: string;
  record: any;
  index: number;
  handleSave: (value: any) => void;
}
interface IEditableCellState {
  editing: boolean;
}

class EditableCell extends React.Component<IEditableCellProps, IEditableCellState> {
  private form: any;

  private input: Input;

  constructor(props: IEditableCellProps) {
    super(props);
    this.form = this.props.form;
    this.renderCell = this.renderCell.bind(this);
    this.save = this.save.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = {
      editing: false
    };
  }

  public render() {
    const { editable, dataIndex, title, record, index, handleSave, children, ...restProps } =
      this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }

  public toggleEdit() {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  public async save(e: any) {
    const { record, handleSave } = this.props;

    this.form.validateFields((error: any, values: any) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  public renderCell(form: any) {
    this.form = form;
    const { children, dataIndex, record } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item>
        {form.getFieldDecorator(dataIndex, {
          initialValue: record[dataIndex]
        })(
          <Input ref={(node) => (this.input = node!)} onPressEnter={this.save} onBlur={this.save} />
        )}
      </Form.Item>
    ) : (
      <div
        className={'ori-table ori-table-fixed'}
        // className="editable-cell-value-wrap"
        // style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  }
}
