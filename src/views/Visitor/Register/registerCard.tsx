import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { IVisitorObj } from '@models/visitor';
import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { EDelYn } from '@/constants/list';
import { VisitorRegisterFields } from '@views/Visitor/fields/visitor';
import { Card, Row } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getFormFields } from '@utils/form';
import { Form } from '@ant-design/compatible';
import { FormInstance } from 'antd/lib/form';

interface IProps extends FormComponentProps {
  index: number;
  handleDeleteVisitorCard: (value: number) => void;
  handleValue: (value: IVisitorObj, index: number) => void;
  visitor?: IVisitorObj;
  length: number;
}
interface IState {
  loading: boolean;
  visitor?: IVisitorObj;
}

class VisitorRegisterCard extends PureComponent<IProps, IState> {
  formRef = React.createRef<Form>();
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      visitor: this.props.visitor
    };
  }

  UNSAFE_componentWillReceiveProps(props: IProps) {
    this.setState({
      visitor: props.visitor
    });
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  handlerValue() {
    this.props.form.validateFields((err, fieldsValue) => {
      this.props.handleValue(fieldsValue, this.props.index);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const visitorFieldsConfig = VisitorRegisterFields(
      this.state.visitor ? this.state.visitor : undefined
    );
    return (
      <Card
        title="방문권"
        size="default"
        headStyle={{ fontSize: 18, fontWeight: 700 }}
        bordered={false}
        extra={
          this.props.index === this.props.length - 1 && this.props.index != 0 ? (
            <div>
              <a
                onClick={(e: any) => {
                  e.stopPropagation();
                  this.props.handleDeleteVisitorCard(this.props.index);
                }}
              >
                <DeleteOutlined />
              </a>
            </div>
          ) : null
        }
        hoverable
      >
        <Row style={{ marginTop: '10px' }}>
          <Form
            ref={this.formRef}
            onChange={(e) => {
              this.handlerValue();
            }}
          >
            <Row gutter={24}>{getFormFields(getFieldDecorator, visitorFieldsConfig, true, 3)}</Row>
          </Form>
        </Row>
      </Card>
    );
  }
}
const VisitorRegisterCardForm = Form.create<IProps>()(VisitorRegisterCard);
export default VisitorRegisterCardForm;
