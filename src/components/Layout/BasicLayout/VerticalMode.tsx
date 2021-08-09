import React, { useMemo } from 'react';
import classNames from 'classnames';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { observer, inject } from 'mobx-react';
import { layoutStore } from '@store/layoutStore';
import { Header, Navigator } from './Component';
import Loading from '@components/Loading';
import Footer from '@components/Footer';
import { copyright } from '@config/setting';
import { LayoutProps } from './types';

@inject('layoutStore')
@observer
class VerticalMode extends React.Component<LayoutProps, any> {
  constructor(props: LayoutProps) {
    super(props);

    this.splitModeLayout = this.splitModeLayout.bind(this);
    this.RCSNavigator = this.RCSNavigator.bind(this);
    this.inlineModeLayout = this.inlineModeLayout.bind(this);
    this.IconCollapsed = this.IconCollapsed.bind(this);
  }

  splitModeLayout = () => {
    const { showSiderBar, collapsed, showHeader } = layoutStore.layoutStatus;
    const { header: _header } = this.props;
    return (
      <>
        {showSiderBar && this.RCSNavigator()}
        <div
          id="mainContainer"
          className={classNames(
            'RCS-basicLayout-wrapper',
            collapsed && 'RCS-basicLayout-wrapper-collapsed'
          )}
        >
          {showHeader && (_header || <Header />)}
          <div className="RCS-basicLayout-wrapper-content">
            {this.props.children}
            {copyright && <Footer propStyle={{ margin: '16px 0' }} />}
          </div>
        </div>
      </>
    );
  };

  IconCollapsed = () => {
    return layoutStore.layoutStatus.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;
  };

  RCSNavigator = () => {
    return (
      <>
        <Navigator
          collapsed={layoutStore.layoutStatus.collapsed}
          isMobile={layoutStore.layoutStatus.isMobile}
          toggleCollapsed={layoutStore.toggleCollapsed}
          {...layoutStore.layoutStatus.rest}
        />
      </>
    );
  };

  inlineModeLayout = () => {
    const { collapsed, showSiderBar, showHeader } = layoutStore.layoutStatus;
    const { header: _header, ...rest } = this.props;
    return (
      <>
        inlineModeLayout
        {showHeader && (_header || <Header {...rest} />)}
        <div
          id="mainContainer"
          className={classNames(
            'RCS-basicLayout-wrapper',
            collapsed && 'RCS-basicLayout-wrapper-collapsed'
          )}
        >
          {showSiderBar && this.RCSNavigator()}
          {this.props.children}
        </div>
        <div
          className={classNames(
            'RCS-basicLayout-inlineMode-footer',
            layoutStore.isDarkTheme && 'RCS-basicLayout-inlineMode-footer-dark'
          )}
        >
          {showSiderBar && (
            <div
              className={classNames(
                'RCS-basicLayout-inlineMode-footer-icon',
                collapsed && 'RCS-basicLayout-inlineMode-footer-collapsed'
              )}
              onClick={() => layoutStore.toggleCollapsed()}
            >
              {this.IconCollapsed()}
            </div>
          )}
          {copyright && <Footer propStyle={{ alignSelf: 'flex-end' }} />}
        </div>
      </>
    );
  };

  render() {
    const { isMobile, showSiderBar, showHeader, fixSiderBar, fixHeader } = layoutStore.layoutStatus;
    return (
      <div
        className={classNames(
          'RCS-basicLayout',
          layoutStore.isInlineLayout ? 'RCS-basicLayout-inlineMode' : 'RCS-basicLayout-splitMode',
          !showSiderBar && 'RCS-basicLayout-hideMenu',
          !showHeader && 'RCS-basicLayout-hideHeader',
          fixHeader && 'RCS-basicLayout-fixHeader',
          fixSiderBar && 'RCS-basicLayout-fixSiderBar',
          isMobile && 'RCS-basicLayout-mobile'
        )}
      >
        {/*VerticalMode*/}
        <Loading {...layoutStore.loadingOptions} collapsed={layoutStore.layoutStatus.collapsed} />
        {layoutStore.isInlineLayout ? this.inlineModeLayout() : this.splitModeLayout()}
      </div>
    );
  }
}

export default VerticalMode;
