import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { layoutStore } from '@store/layoutStore';
import { Col, Row, Collapse } from 'antd';
import { CaretRightOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

@inject('layoutStore')
@observer
class FeeSetting extends PureComponent {
  render() {
    const { Panel } = Collapse;
    const { isDarkTheme } = layoutStore;

    return (
      <PageWrapper>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className={classNames(
            'site-collapse-custom-collapse',
            isDarkTheme && 'site-collapse-custom-collapse_dark'
          )}
        >
          <Panel header="정책 기본 정보" key="1">
            {/*<Row style={{ margin: '10px 0 20px 0', alignItems: 'center' }}>*/}
            {/*  */}
            {/*</Row>*/}
          </Panel>
          <Panel header="This is panel header with no arrow icon" key="2">
            <p>Panel2</p>
          </Panel>
        </Collapse>
      </PageWrapper>
    );
  }
}

export default FeeSetting;
