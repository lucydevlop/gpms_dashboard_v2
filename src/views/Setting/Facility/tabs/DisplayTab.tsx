import React, { PureComponent } from 'react';
import { IDisplayMsgObj } from '@models/display';
import { IFacilityObj } from '@models/facility';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import {
  getActionsColumn,
  getColumn,
  getEditableColumn
} from '@components/EditTable/columnHelpers';
import { messageClassTypeOpt, messageTypeTypeOpt } from '@/constants/list';
import { EditableList } from '@components/EditTable';

interface IProps {
  displayMsgs: IDisplayMsgObj[];
}

interface IState {}

class DisplayTab extends PureComponent<IProps, IState> {
  handleSave = async (record: IDisplayMsgObj) => {
    console.log('handleSave', record);
  };

  handleDelete = async (record: IDisplayMsgObj) => {
    console.log('handleSave', record);
  };

  render() {
    const renderActions = (info: IDisplayMsgObj): JSX.Element => {
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
    ];
    return (
      <>
        <EditableList<IDisplayMsgObj>
          columns={columns}
          entries={this.props.displayMsgs}
          rowKeySelector={(row: IDisplayMsgObj) => row.sn!!.toString()}
        />
      </>
    );
  }
}

export default DisplayTab;
