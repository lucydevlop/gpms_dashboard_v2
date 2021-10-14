import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { IHolidayObj } from '@models/holiday';
import { Button, Card, Col, Row } from 'antd';
import { localeStore } from '@store/localeStore';
import { EDelYn } from '@/constants/list';
import { getFormFields } from '@utils/form';
import HolidayForm from '@views/Setting/Holiday/Modal/HolidayForm';

interface IProps extends FormComponentProps {
  day: string;
  items?: IHolidayObj[];
  onSubmit: (info: IHolidayObj) => void;
}

interface IState {
  items: IHolidayObj[];
}

class HolidayModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.setState({ items: this.props.items ? this.props.items : [] });
  }

  handleCreateClick() {
    const item: IHolidayObj = {
      delYn: EDelYn.N,
      endDate: this.props.day,
      endTime: '2359',
      isWorking: false,
      name: '',
      startDate: this.props.day,
      startTime: '0000',
      type: '',
      working: 'OFF'
    };
    const items = [...this.state.items, item];
    this.setState({ items: items });
  }

  renderItems() {
    const data = this.state.items.map((item) => {
      item.working = item.isWorking ? 'ON' : 'OFF';
      return (
        <>
          <HolidayForm holiday={item} onSubmit={this.props.onSubmit} />
        </>
      );
    });
    return <>{data}</>;
  }

  render() {
    const { localeObj } = localeStore;
    return (
      <>
        <Row>{this.props.day}</Row>
        <Row>
          <Col xs={6}>
            <Button
              type="primary"
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleCreateClick();
              }}
            >
              + {localeObj['label.create'] || '신규 등록'}
            </Button>
          </Col>
        </Row>
        {this.renderItems()}
      </>
    );
  }
}

const HolidayModalForm = Form.create<IProps>({ name: 'fareBasicModalForm' })(HolidayModal);
export default HolidayModalForm;
