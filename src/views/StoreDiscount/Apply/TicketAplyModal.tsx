import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { ICorpTicketObj, ICorpSearchVehicleObj } from '@models/corp';
import { Button, Col, Row, Table } from 'antd';
import { getFormFields } from '@utils/form';
import Image from '@components/ImageWrapper';
import { ColumnProps } from 'antd/es/table';
import { conversionDateTime } from '@utils/conversion';
import { ITicketObj } from '@models/ticket';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

interface IProps extends FormComponentProps {
  ableTickets: ICorpTicketObj[];
  image: string | null;
  onSubmit: (values: ICorpTicketObj[]) => void;
}

interface IState {
  ableTickets: ICorpTicketObj[];
  total: number;
}

class TicketAplyModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ableTickets: [],
      total: 0
    };
  }

  componentDidMount() {
    this.setState({ ableTickets: this.props.ableTickets });
  }

  componentDidUpdate(prevProps: { ableTickets: ICorpTicketObj[] }, prevState: any) {
    if (this.props.ableTickets !== prevProps.ableTickets) {
      this.setState({ ableTickets: this.props.ableTickets });
    }
  }

  handlerSubmit(e: any) {
    e.stopPropagation();
    this.props.onSubmit(this.state.ableTickets);
    // console.log('TicketAplyModal', this.state.ableTickets);
  }

  onClickMinusButton = async (info: ICorpTicketObj) => {
    if (info.applyCnt === undefined || info.applyCnt === 0) return;
    info.applyCnt = info.applyCnt - 1;
    const tickets = this.state.ableTickets.map((t) => {
      if (t.sn === info.sn) return { ...info };
      return { ...t };
    });
    this.setState({
      ableTickets: tickets,
      total: this.state.total + info.corpTicketClass.discountClass.unitTime * -1
    });
  };

  onClickPlusButton = async (info: ICorpTicketObj) => {
    const cnt = info.ableCnt > info.totalCnt ? info.totalCnt : info.ableCnt;
    if (cnt === info.applyCnt) return;
    info.applyCnt = info.applyCnt ? info.applyCnt : 0;
    info.applyCnt++;
    const tickets = this.state.ableTickets.map((t) => {
      if (t.sn === info.sn) return { ...info };
      return { ...t };
    });
    this.setState({
      ableTickets: tickets,
      total: this.state.total + info.corpTicketClass.discountClass.unitTime
    });
  };

  render() {
    const columns: ColumnProps<ICorpTicketObj>[] = [
      {
        title: '할인권명',
        key: 'discountName',
        width: 100,
        align: 'center',
        render: (text: string, record: ICorpTicketObj) => record.corpTicketClass.name
      },
      {
        title: '사용가능/잔여',
        key: 'inDate',
        width: 100,
        align: 'center',
        render: (text: string, record: ICorpTicketObj) => {
          const cnt = record.ableCnt > record.totalCnt ? record.totalCnt : record.ableCnt;
          return {
            props: {
              style: {}
            },
            children: (
              <div>
                {cnt}&nbsp;/&nbsp;{record.totalCnt}
              </div>
            )
          };
        }
      },
      {
        title: '적용',
        width: 100,
        align: 'center',
        render: (record: ICorpTicketObj) => (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              shape="circle"
              icon={<PlusCircleOutlined />}
              size="small"
              onClick={() => {
                this.onClickPlusButton(record);
              }}
            />
            &nbsp;&nbsp;{record.applyCnt ? record.applyCnt : 0}&nbsp;&nbsp;
            <Button
              type="primary"
              shape="circle"
              icon={<MinusCircleOutlined />}
              size="small"
              danger
              onClick={() => {
                this.onClickMinusButton(record);
              }}
            />
          </div>
        )
      }
    ];
    return (
      <>
        <Row style={{ marginTop: '10px', display: 'block' }}>
          <Row gutter={24}>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <Image
                // src={`${process.env.REACT_APP_IMAGE_URL}/${this.props.image}`}
                ratio={1.8}
                src={
                  'http://192.168.20.201:3000/park/save/2021-08-06/GLNT001_FCL0000003_83263%EB%9D%BC3206.jpg'
                }
              />
            </Col>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <Table
                scroll={{ x: 'max-content' }}
                columns={columns}
                loading={false}
                // @ts-ignore
                rowKey={(record: ICorpTicketObj) => String(record.sn)}
                dataSource={this.state.ableTickets}
                pagination={false}
                summary={() => (
                  <Table.Summary fixed>
                    <Table.Summary.Row style={{ textAlign: 'center' }}>
                      <Table.Summary.Cell index={0}>
                        <span style={{ color: '#212677' }}>{'총 적용 시간(분)'}</span>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} />
                      <Table.Summary.Cell index={2}>
                        <span style={{ color: '#FC2328' }}>{this.state.total}</span>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                )}
              />
            </Col>
          </Row>
          <Button
            type="primary"
            onClick={(e) => this.handlerSubmit(e)}
            style={{ marginTop: '10px', width: '20%', left: '40%' }}
          >
            적용
          </Button>
        </Row>
      </>
    );
  }
}

const TicketAplyModalForm = Form.create<IProps>({ name: 'ticketAplyModal' })(TicketAplyModal);
export default TicketAplyModalForm;
