import React from 'react';
import { copyright } from '@config/setting';
import classNames from 'classnames';
import { CopyrightOutlined } from '@ant-design/icons';
import './footer.less';

const [left, right, href] = copyright;

interface FooterProps {
  isInlineLayout?: boolean;
  isHorizontalNavigator?: boolean;
  propStyle?: React.CSSProperties;
}
class Footer extends React.Component<FooterProps, any> {
  render() {
    return (
      <footer
        className={classNames(
          'RCS-footer',
          this.props.isHorizontalNavigator && 'RCS-footer-horizontal'
        )}
        style={this.props.propStyle}
      >
        {left} <CopyrightOutlined /> 2021 Created by{' '}
        <a href={href} target="_blank" rel="noopener noreferrer" className="RCS-footer-link">
          {right}
        </a>
      </footer>
    );
  }
}

export default Footer;
