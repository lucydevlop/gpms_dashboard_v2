import React from 'react';
import PageHeader from './PageHeader';
import './pageWrapper.less';
import { PageWrapperProps } from '@models/global';

class PageWrapper extends React.Component<PageWrapperProps, any> {
  // componentDidMount() {
  //   if (localStorage.getItem('RCS-authorization') === null) {
  //
  //   }
  // }

  render() {
    const { hideHeader, children, style, ...restProps } = this.props;
    return (
      <div className="RCS-pageWrapper" style={style}>
        {!hideHeader && <PageHeader {...restProps} />}
        <div className="RCS-pageWrapper-body">{children}</div>
      </div>
    );
  }
}

export default PageWrapper;
