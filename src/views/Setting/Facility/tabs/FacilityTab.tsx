import React, { PureComponent } from 'react';
import { IFacilityObj } from '@models/facility';
import { EditableList } from '@components/EditTable';
import { ColumnsType } from 'antd/lib/table';
import {
  getActionsColumn,
  getColumn,
  getEditableColumn
} from '@components/EditTable/columnHelpers';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface IProps {
  facilities: IFacilityObj[];
}

interface IState {}

class FacilityTab extends PureComponent<IProps, IState> {
  handleSave = async (record: IFacilityObj) => {
    console.log('handleSave', record);
  };

  handleDelete = async (record: IFacilityObj) => {
    console.log('handleSave', record);
  };

  render() {
    const renderActions = (info: IFacilityObj): JSX.Element => {
      return (
        <Button
          type={'default'}
          icon={<DeleteOutlined />}
          onClick={() => this.handleDelete(info)}
        />
      );
    };
    const columns: ColumnsType<IFacilityObj> = [
      getColumn('장비ID', 'dtFacilitiesId'),
      getEditableColumn('징비명', 'fname', this.handleSave, 'text'),
      getEditableColumn('게이트', 'gateId', this.handleSave, 'text'),
      getColumn('IP', 'ip'),
      getActionsColumn(renderActions)
    ];
    return (
      <>
        <EditableList<IFacilityObj>
          columns={columns}
          entries={this.props.facilities}
          rowKeySelector={(row: IFacilityObj) => row.dtFacilitiesId}
        />
      </>
    );
  }
}

export default FacilityTab;
