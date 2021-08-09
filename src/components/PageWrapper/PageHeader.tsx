import React from 'react';
import Breadcrumb from '@components/Breadcrumb';
import classnames from 'classnames';
import { PageHeaderProps } from '@models/global';

class PageHeader extends React.Component<PageHeaderProps, any> {
  render() {
    const { hideBreadcrumb, title, subTitle, content, extraContent, logo, withoutHeaderBody } =
      this.props;
    return (
      <div
        className={classnames(
          'RCS-pageWrapper-header',
          withoutHeaderBody && 'RCS-pageWrapper-header-withoutBody'
        )}
      >
        {!hideBreadcrumb && <Breadcrumb history={this.props.history} />}
        {!withoutHeaderBody && (
          <>
            {logo && <div>{logo}</div>}
            <div className="RCS-pageWrapper-header-main">
              <div className="RCS-pageWrapper-header-row">
                {title && <h1 className="RCS-pageWrapper-header-title">{title}</h1>}
                {subTitle && <div className="RCS-pageWrapper-header-subTitle">{subTitle}</div>}
              </div>
              <div className="RCS-pageWrapper-header-row">
                {content && <div className="RCS-pageWrapper-header-content">{content}</div>}
                {extraContent && (
                  <div className="RCS-pageWrapper-header-extraContent">{extraContent}</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default PageHeader;
