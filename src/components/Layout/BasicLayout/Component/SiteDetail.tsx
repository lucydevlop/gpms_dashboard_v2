import React from 'react';
import { siteName, menuLinkUrl, useSiteIcon } from '@config/setting';
import classNames from 'classnames';
import { layoutStore } from '@store/layoutStore';
import { observer, inject } from 'mobx-react';
import { GLogo } from '@components/SvgIcon';

@inject('layoutStore')
@observer
class SiteDetail extends React.Component<any, any> {
  render() {
    const {
      isInlineLayout,
      isHorizontalNavigator,
      layoutStatus: { darkTheme, collapsed, currentColor }
    } = layoutStore;
    return (
      <a
        className={classNames(
          'RCS-siteDetail',
          isInlineLayout && 'RCS-siteDetail-inlineLayout',
          isHorizontalNavigator && 'RCS-siteDetail-horizontal',
          darkTheme && 'RCS-siteDetail-darkTheme',
          collapsed && !isInlineLayout && 'RCS-siteDetail-collapsed'
        )}
        href={menuLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {useSiteIcon ? (
          <img
            alt=""
            src={require('@assets/images/logo.png').default}
            className="RCS-siteDetail-logo"
          />
        ) : (
          <div className="RCS-siteLogo">
            <div className="RCS-siteLogo-border"></div>
            <div className="RCS-siteLogo-logo">{GLogo()}</div>
          </div>
        )}
        <span className="RCS-siteDetail-title">{siteName}</span>
      </a>
    );
  }
}

export default SiteDetail;
