import React, { BaseSyntheticEvent, ReactNode } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Row, Button } from 'antd';
import { IFormProps } from './fieldsConfig';
import './search.less';
import { IParkinglotListReq } from '@models/parkinglot';
import { getQueryRangeDate } from '@/utils';
import { getFormFields, IFormFieldConfig } from '@utils/form';
import { localeStore } from '@store/localeStore';

interface ISearchFormProps extends FormComponentProps {
  submit: (param: any) => void;
  location?: any;
  footerRender?: () => ReactNode;
  fieldConfig: IFormFieldConfig[];
}

interface ISearchFormState {
  putAway: boolean;
  cityList: any[];
}
class BaseSearch extends React.Component<ISearchFormProps, ISearchFormState> {
  constructor(props: ISearchFormProps) {
    super(props);
    this.state = {
      putAway: true,
      cityList: []
    };
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset = () => {
    this.props.form.resetFields();
  };

  handlerSubmit = () => {
    this.props.form.validateFields((err, values: IFormProps) => {
      if (!err) {
        let timeList: number[] = [];
        if (values.createTm && values.createTm.length) {
          timeList = getQueryRangeDate(values.createTm);
        }

        this.props.submit({
          ...values,
          // @ts-ignore
          createTm: timeList
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const newFieldsConfig = this.props.fieldConfig;
    const { localeObj } = localeStore;
    return (
      <div className={'RCS-searchForm'}>
        <Form
          onSubmit={(e: BaseSyntheticEvent) => {
            e.preventDefault();
            this.handlerSubmit();
          }}
        >
          <Row gutter={24} className={'RCS-formContainer'}>
            {getFormFields(getFieldDecorator, newFieldsConfig, this.state.putAway, 7)}
          </Row>
        </Form>
        <div
          className={`searchBtnList topRow${newFieldsConfig.length} putAway${this.state.putAway}`}
        >
          <div className="RCS-searchBtnMain">
            <Button key="back" onClick={() => this.handleReset()}>
              {localeObj['label.reset'] || '초기화'}
            </Button>
            <Button key="submit" type="primary" onClick={() => this.handlerSubmit()}>
              {localeObj['label.search'] || '검색'}
            </Button>
            {/*<a*/}
            {/*  onClick={() => {*/}
            {/*    this.setState({ putAway: !this.state.putAway });*/}
            {/*  }}*/}
            {/*>*/}
            {/*  {this.state.putAway ? '展开' : '收起'}*/}
            {/*  {this.state.putAway ? <DownOutlined /> : <UpOutlined />}*/}
            {/*</a>*/}
          </div>
        </div>
        <Row className={'RCS-searchFormFooter'}>
          {this.props.footerRender ? this.props.footerRender() : <div />}
        </Row>
      </div>
    );
  }
}

const BaseSearchForm = Form.create<ISearchFormProps>({ name: 'searchOutboundInvoice' })(BaseSearch);

export default BaseSearchForm;
