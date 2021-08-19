import React, { PureComponent } from 'react';
import { Button, message, Modal, Upload } from 'antd';
import { Form } from '@ant-design/compatible';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

interface IProps {
  visiable: boolean;
  onCancel: () => void;
  onOk: () => void;
  onChange?: (files: any) => boolean;
  onAction?: (files: any) => void;
}
interface IState {
  file?: any;
  uploading: boolean;
}

class UploadModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      file: null,
      uploading: false
    };
  }

  handleChange = async (info: UploadChangeParam) => {
    // const file: UploadFile[] = fileList.slice(-1);
    // if (file.length > 0 && file[0].response) {
    //   const formData = new FormData();
    //   this.setState({ file: file[0] });
    // }
    if (info.file.status === 'done') {
      this.setState({ file: info.file });
    }
  };

  handleUpload = (option: any) => {
    const { file, onProgress, onError, onSuccess } = option;
    this.setState({ uploading: true });
    if (this.props.onChange) {
      // onProgress({})
      if (this.props.onChange(file)) {
        message.success('upload successfully.');
        onSuccess({}, file);
      } else {
        message.error('upload failed.');
        onError({}, file);
      }
    }
    this.setState({ uploading: false });
  };

  render() {
    const { uploading, file } = this.state;
    const props = {
      name: 'upload-data',
      accept: '.csv', //'.xls, .xlsx, .csv'
      multiple: false
      //@ts-ignore
      // progress: {
      //   strokeColor: {
      //     '0%': '#108ee9',
      //     '100%': '#87d068'
      //   },
      //   strokeWidth: 3,
      //   format: (percent: number) => `${parseFloat(percent.toFixed(2))}%`
      // }
    };

    return (
      <Modal visible={this.props.visiable} onOk={this.props.onOk} onCancel={this.props.onCancel}>
        <Form>
          <Upload
            {...props}
            onChange={this.handleChange}
            action={''}
            customRequest={this.handleUpload}
          >
            <Button icon={<UploadOutlined />}>{'파일 선택'}</Button>
          </Upload>
          {/*<Button*/}
          {/*  type="primary"*/}
          {/*  onClick={this.handleUpload}*/}
          {/*  disabled={file === null}*/}
          {/*  loading={uploading}*/}
          {/*  style={{ marginTop: 16 }}*/}
          {/*>*/}
          {/*  {uploading ? 'Uploading' : 'Start Upload'}*/}
          {/*</Button>*/}
        </Form>
      </Modal>
    );
  }
}

export default UploadModal;
