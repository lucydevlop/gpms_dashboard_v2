import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { Form } from '@ant-design/compatible';
import { Col, Row, Switch, Transfer } from 'antd';
import { TransferDirection, TransferItem, TransferProps } from 'antd/es/transfer';
import { TransferListBodyProps } from 'antd/lib/transfer/ListBody';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { corpStore } from '@store/corpStore';
const FormItem = Form.Item;

interface IProps extends FormComponentProps {}
interface IState {
  checked: boolean;
  taskSelectChosen: string[];
  targetSelectedKeys: string[];
  corpList: [];
}

@inject('corpStore', 'localeStore')
@observer
class CorpTicketAllCreateModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      checked: false,
      taskSelectChosen: [],
      targetSelectedKeys: [],
      corpList: corpStore.corpList
    };
  }

  handlerSubmit() {}

  onSwitchChangeFunc = (value: boolean) => {
    this.setState({ checked: value });
  };

  handleChange = (targetKeys: any) => {
    this.setState({ taskSelectChosen: targetKeys });
  };

  handleSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
    this.setState({ targetSelectedKeys });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        onSubmit={(e: BaseSyntheticEvent) => {
          e.preventDefault();
          this.handlerSubmit();
        }}
      >
        <Row gutter={24}>
          <Col span={12}></Col>
          <Col span={12}>
            <div>
              {/*<TransferHintText>Please add the targeted {columnName} to the column on the right side.</TransferHintText>*/}
              <TransferColumns>
                <TransferColumn>Excluded </TransferColumn>
                <TransferColumn>Selected </TransferColumn>
              </TransferColumns>
              <Transfer
                dataSource={this.state.corpList}
                targetKeys={this.state.taskSelectChosen}
                // @ts-ignore
                render={(item) => item.corpName}
                onChange={this.handleChange}
                // filterOption={onTransferFilter}
                // onSearch={onSearch}
                // selectAllLabels={[selectLabelsLeft, selectLabelsRight]}
                onSelectChange={this.handleSelectChange}
                showSearch
              />
              {/*{(p: TransferListBodyProps<any>) =>*/}
              {/*  children ? (*/}
              {/*    children({*/}
              {/*      ...p,*/}
              {/*      // @ts-ignore*/}
              {/*      onTransferChange: onTransferChangeFunc,*/}
              {/*      fieldKeys,*/}
              {/*      filterValue: p.direction === 'left' ? leftFilterValue : rightFilterValue*/}
              {/*    })*/}
              {/*  ) : (*/}
              {/*    // @ts-ignore*/}
              {/*    <DefaultList*/}
              {/*      {...p}*/}
              {/*      onTransferChange={onTransferChangeFunc}*/}
              {/*      fieldKeys={fieldKeys}*/}
              {/*    />*/}
              {/*  )*/}
              {/*}*/}
              {/*</Transfer>*/}
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}

const CorpTicketAllCreateModalForm = Form.create<IProps>({ name: 'corpTicketAllCCreateModal' })(
  CorpTicketAllCreateModal
);
export default CorpTicketAllCreateModalForm;

export const TransferColumns = styled.div`
  display: block;
  margin: 0 -20px;
  @media (max-width: 1365px) {
    display: none;
  }
`;

export const TransferColumn = styled.div`
  display: inline-block;
  width: 50%;
  max-width: 328px;
  padding: 0 20px;
  text-align: center;
`;
