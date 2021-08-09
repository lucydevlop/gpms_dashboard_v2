import React from 'react';
import { v4 as generateUUID } from 'uuid';
import { Card, Descriptions } from 'antd';
import { IconType } from 'react-icons';
import './description.less';

export interface Attribute {
  name: string;
  value: any;
}

export interface AttributeGroup {
  name: string;
  attributes: Attribute[];
}

interface DescriptionProps {
  header?: React.ReactNode;
  icon?: IconType;
  attributes: Attribute[];
  selectable?: boolean;
  hasLongValues?: boolean;
  methods?: React.ReactNode[];
}

class StandardDescription extends React.Component<DescriptionProps, {}> {
  render(): React.ReactNode {
    const items = this.props.attributes.map((item: Attribute, index: number) => {
      const uid = generateUUID();
      return (
        <Descriptions.Item
          key={uid}
          label={item.name}
          labelStyle={{
            margin: '0 0 -10px 0',
            backgroundColor: '#fff',
            borderRight: 'none'
          }}
          contentStyle={{ fontWeight: 600 }}
          span={1}
          className="labelItem"
        >
          {item.value}
        </Descriptions.Item>
      );
    });
    let icon = null;
    if (this.props.icon !== undefined) {
      icon = <this.props.icon />;
    }
    let layout: 'horizontal' | 'vertical' = 'horizontal';
    if (this.props.hasLongValues !== undefined && this.props.hasLongValues) {
      layout = 'vertical';
    }
    return (
      <Card
        title={this.props.header}
        type="inner"
        headStyle={{ fontSize: 18, fontWeight: 700 }}
        // extra={icon}
        size="default"
        hoverable={this.props.selectable}
        // bordered={this.props.header !== undefined}
        bordered={false}
        actions={this.props.methods}
      >
        <Descriptions
          className="custom-description"
          column={1}
          size="default"
          layout={layout}
          bordered={true}
        >
          {items}
        </Descriptions>
        {this.props.children}
      </Card>
    );
  }
}

export default StandardDescription;
