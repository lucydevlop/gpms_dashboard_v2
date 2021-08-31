import React, { PureComponent } from 'react';
import { IDisplayMsgObj } from '@models/display';
import { Button, Row } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnProps, ColumnsType } from 'antd/lib/table';
import {
  getActionsColumn,
  getColumn,
  getEditableColumn
} from '@components/EditableTable/columnHelpers';
import {
  colorTypeOpt,
  ELineStatus,
  EMessageClassType,
  EMessageTypeType,
  lineOpt,
  messageClassTypeOpt,
  messageTypeTypeOpt,
  orderOpt
} from '@/constants/list';
import { localeStore } from '@store/localeStore';
import { conversionEnumValue } from '@utils/conversion';
import zdsTips from '@utils/tips';
import StandardTable from '@components/StandardTable';
import DraggableModal from '@components/DraggableModal';
import DisplayModal from '@views/Setting/Facility/tabs/modals/DisplayModal';
import { displayflowSetting, getDisplayFlowSetting } from '@api/facility';
import { runInAction } from 'mobx';

interface IProps {
  displayMsgs: IDisplayMsgObj[];
  loading: boolean;
  onCreate: (info: IDisplayMsgObj) => void;
  onUpdate: (info: IDisplayMsgObj) => void;
}

interface IState {
  detailModal: boolean;
  createModal: boolean;
  flowSettingModal: boolean;
  selected?: IDisplayMsgObj;
  line1Status: ELineStatus;
  line2Status: ELineStatus;
}

class DisplayTab extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      createModal: false,
      detailModal: false,
      flowSettingModal: false,
      line1Status: ELineStatus.FIX,
      line2Status: ELineStatus.FIX
    };
  }

  componentDidMount() {
    getDisplayFlowSetting().then((res: any) => {
      const { msg, data } = res;
      this.setState({ line1Status: data.line1Status, line2Status: data.line2Status });
    });
  }

  handleUpdateFlowSettingClick = () => {
    this.setState({ flowSettingModal: true });
  };

  handleCreateClick() {
    this.setState({ detailModal: false, createModal: true });
  }

  handleBtnClick = (info: IDisplayMsgObj) => {
    const { localeObj } = localeStore;
    this.setState({ detailModal: true, createModal: false, selected: info });
  };

  updateFlowSetting = (req: any) => {
    displayflowSetting(req).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        runInAction(() => {
          this.setState({ line1Status: data.line1Status });
          this.setState({ line2Status: data.line2Status });
        });
      }
    });
  };

  /*
  render() {
    /!*const renderActions = (info: IDisplayMsgObj): JSX.Element => {
      return (
        <Button
          type={'default'}
          icon={<DeleteOutlined />}
          onClick={() => this.handleDelete(info)}
        />
      );
    };
    const columns: ColumnsType<IDisplayMsgObj> = [
      getEditableColumn(
        '메세지구분',
        'messageClass',
        this.handleSave,
        'select',
        messageClassTypeOpt
      ),
      getEditableColumn('메세지타입', 'messageType', this.handleSave, 'select', messageTypeTypeOpt),
      getEditableColumn('순서', 'order', this.handleSave, 'number'),
      getEditableColumn('라인', 'lineNumber', this.handleSave, 'number'),
      getEditableColumn('메세지', 'messageDesc', this.handleSave, 'text'),
      getActionsColumn(renderActions)
    ];*!/
    return (
      <>
        {/!*<EditableList<IDisplayMsgObj>*!/}
        {/!*  columns={columns}*!/}
        {/!*  entries={this.props.displayMsgs}*!/}
        {/!*  rowKeySelector={(row: IDisplayMsgObj) => row.sn!!.toString()}*!/}
        {/!*!/>*!/}
      </>
    );
  }*/
  render() {
    const { localeObj } = localeStore;
    const columns: ColumnProps<IDisplayMsgObj>[] = [
      {
        title: '메세지그룹',
        key: 'messageClass',
        width: 100,
        align: 'center',
        filters: messageClassTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.messageClass.indexOf(value as string) === 0,
        render: (text: string, record: IDisplayMsgObj) => {
          const value = conversionEnumValue(record.messageClass, messageClassTypeOpt);
          return <div style={{ color: value.color }}>{value.label}</div>;
        }
      },
      {
        title: '메세지타입',
        key: 'messageType',
        width: 100,
        align: 'center',
        filters: messageTypeTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.messageType.indexOf(value as string) === 0,
        render: (text: string, record: IDisplayMsgObj) => {
          const value = conversionEnumValue(record.messageType, messageTypeTypeOpt);
          return <div style={{ color: value.color }}>{value.label}</div>;
        }
      },
      {
        title: '컬러',
        key: 'colorCode',
        width: 100,
        align: 'center',
        render: (text: string, record: IDisplayMsgObj) => {
          const value = conversionEnumValue(record.colorCode, colorTypeOpt);
          return <div style={{ color: value.color }}>{value.label}</div>;
        }
      },
      {
        title: '라인',
        key: 'lineNumber',
        width: 100,
        align: 'center',
        render: (text: string, record: IDisplayMsgObj) => {
          const value = conversionEnumValue(String(record.lineNumber), lineOpt);
          return <div style={{ color: value.color }}>{value.label}</div>;
        }
      },
      {
        title: '순서',
        key: 'order',
        width: 100,
        align: 'center',
        render: (text: string, record: IDisplayMsgObj) => {
          const value = conversionEnumValue(String(record.order), orderOpt);
          return <div style={{ color: value.color }}>{value.label}</div>;
        }
      },
      {
        title: '문구',
        key: 'messageDesc',
        width: 100,
        align: 'center',
        render: (text: string, record: IDisplayMsgObj) => record.messageDesc
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: IDisplayMsgObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item);
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
        <Row style={{ marginBottom: '1rem' }}>
          <Button
            type="primary"
            onClick={(e: any) => {
              e.stopPropagation();
              this.handleCreateClick();
            }}
          >
            + {localeObj['label.create'] || '신규등록'}
          </Button>
          <Button
            type="primary"
            onClick={(e: any) => {
              e.stopPropagation();
              this.handleUpdateFlowSettingClick();
            }}
            style={{ marginLeft: '1rem' }}
          >
            {localeObj['label.display.flowSetting'] || '전광판 흐름설정'}
          </Button>
        </Row>
        <StandardTable
          scroll={{ x: 'max-content' }}
          columns={columns}
          loading={this.props.loading}
          // @ts-ignore
          rowKey={(record: IDisplayMsgObj) => String(record.sn)}
          data={{ list: this.props.displayMsgs }}
          hidePagination
        />
        {this.state.createModal ? (
          <DraggableModal
            title={localeObj['label.display.info' || '전광판 상세']}
            visible={this.state.createModal}
            onOk={(): void => {
              this.setState({ createModal: false });
            }}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
            width={800}
          >
            <DisplayModal
              onSubmit={(value) => {
                this.setState({ createModal: false });
                this.props.onCreate(value);
              }}
            />
          </DraggableModal>
        ) : null}
        {this.state.detailModal ? (
          <DraggableModal
            title={localeObj['label.display.info' || '전광판 상세']}
            visible={this.state.detailModal}
            onOk={(): void => {
              this.setState({ detailModal: false });
            }}
            onCancel={(): void => {
              this.setState({ detailModal: false });
            }}
            width={800}
          >
            <DisplayModal
              onSubmit={(value) => {
                this.props.onUpdate(value);
                this.setState({ detailModal: false });
              }}
              display={this.state.selected}
            />
          </DraggableModal>
        ) : null}
        {this.state.flowSettingModal ? (
          <DraggableModal
            visible={this.state.flowSettingModal}
            title={localeObj['label.display.flowSetting' || '전광판 흐름설정']}
            onOk={(): void => {
              this.setState({ flowSettingModal: false });
            }}
            onCancel={(): void => {
              this.setState({ flowSettingModal: false });
            }}
            width={800}
          >
            <DisplayModal
              onSubmit={(value) => {
                this.setState({ flowSettingModal: false });
                this.updateFlowSetting(value);
              }}
              flowSettingModal={true}
              line1Status={this.state.line1Status}
              line2Status={this.state.line2Status}
            ></DisplayModal>
          </DraggableModal>
        ) : null}
      </>
    );
  }
}

export default DisplayTab;
