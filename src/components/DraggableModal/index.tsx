import React from 'react';
import { Modal } from 'antd';
import ModalTitle from '@components/DraggableModal/ModalTitle';

interface IModalProps {
  visible: boolean;
  title: string;
  width?: number;
  confirmLoading?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  footer?: React.ReactNode;
  style?: any;
}

class DraggableModal extends React.Component<IModalProps, any> {
  constructor(props: IModalProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        {...this.props}
        destroyOnClose
        maskClosable={false}
        title={<ModalTitle title={this.props.title} />}
      >
        {React.Children.map(this.props.children, (child: any): React.ReactElement => child)}
      </Modal>
    );
  }
}

export default DraggableModal;
