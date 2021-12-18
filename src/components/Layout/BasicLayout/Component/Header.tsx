import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import SelectLang from '@components/SelectLang';
import UserInfo from './UserInfo';
import LayoutStore, { layoutStore } from '@store/layoutStore';
import SiteDetail from './SiteDetail';
import TopMenu from './SiderMenu';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { usei18n } from '@config/setting';
import { LayoutProps } from '../types';
import { Button } from 'antd';
import DraggableModal from '@components/DraggableModal';
import VocModal from '@views/Header/VocModal';

interface IState {
  showCSModal: boolean;
}

@inject('layoutStore')
@observer
class Header extends React.Component<LayoutProps, IState> {
  constructor(props: LayoutProps) {
    super(props);
    this.state = {
      showCSModal: false
    };

    this.IconCollapsed = this.IconCollapsed.bind(this);
    this.HorizontalMenuHeader = this.HorizontalMenuHeader.bind(this);
    this.VerticalMenuHeaderBody = this.VerticalMenuHeaderBody.bind(this);
    this.VerticalMenuHeader = this.VerticalMenuHeader.bind(this);
  }

  IconCollapsed = () => {
    const {
      toggleCollapsed,
      layoutStatus: { collapsed }
    } = layoutStore;
    //console.log('IconCollapsed', collapsed);
    return collapsed ? (
      <MenuUnfoldOutlined className="RCS-header-foldIcon" onClick={() => toggleCollapsed()} />
    ) : (
      <MenuFoldOutlined className="RCS-header-foldIcon" onClick={() => toggleCollapsed()} />
    );
  };

  HorizontalMenuHeader = () => {
    const { isContentFlowMode } = layoutStore;
    const { siderBar: _siderBar, siteLogo: _siteLogo } = this.props;
    return (
      <header className={classNames('RCS-header', 'RCS-header-horizontal')}>
        <div
          className={classNames(
            'RCS-header-container',
            isContentFlowMode && 'RCS-header-container-flowMode'
          )}
        >
          {_siteLogo || <SiteDetail />}
          <div className="RCS-header-headerNav">{<TopMenu siderBar={_siderBar} />}</div>
          <div className="RCS-header-rightPlace">
            <UserInfo />
            {usei18n && <SelectLang />}
          </div>
        </div>
      </header>
    );
  };

  VerticalMenuHeaderBody = () => {
    const {
      isInlineLayout,
      layoutStatus: { showSiderBar }
    } = layoutStore;
    const { siteLogo: _siteLogo } = this.props;
    return (
      <>
        {isInlineLayout && (_siteLogo || <SiteDetail />)}
        {showSiderBar && !isInlineLayout && this.IconCollapsed()}
        <Button
          style={{ marginLeft: '2rem' }}
          onClick={() => {
            this.setState({ showCSModal: true });
          }}
        >
          차량 검색
        </Button>
        <div className="RCS-header-rightPlace">
          <UserInfo />
          {usei18n && <SelectLang />}
        </div>
      </>
    );
  };

  VerticalMenuHeader = () => {
    const {
      isInlineLayout,
      isDarkTheme,
      layoutStatus: { collapsed, isMobile, showSiderBar, fixHeader }
    } = layoutStore;
    return (
      <>
        <header
          className={classNames(
            'RCS-header',
            'RCS-header-vertical',
            collapsed && 'RCS-header-collapsed',
            isMobile && 'RCS-header-isMobile',
            !showSiderBar && 'RCS-header-withoutMenu',
            isInlineLayout ? 'RCS-header-inlineLayout' : 'RCS-header-splitLayout',
            isDarkTheme && 'RCS-header-darkTheme'
          )}
          style={{
            opacity: !fixHeader ? 1 : 0
          }}
        >
          {!fixHeader && this.VerticalMenuHeaderBody()}
        </header>
        <header
          className={classNames(
            'RCS-header',
            'RCS-header-fixHeader',
            'RCS-header-vertical',
            collapsed && 'RCS-header-collapsed',
            isMobile && 'RCS-header-isMobile',
            !showSiderBar && 'RCS-header-withoutMenu',
            isInlineLayout ? 'RCS-header-inlineLayout' : 'RCS-header-splitLayout',
            isDarkTheme && 'RCS-header-darkTheme'
          )}
          style={{
            zIndex: !fixHeader ? -1 : 4
          }}
        >
          {fixHeader && this.VerticalMenuHeaderBody()}
        </header>
      </>
    );
  };

  render() {
    const { isHorizontalNavigator } = layoutStore;
    return (
      <>
        {isHorizontalNavigator ? this.HorizontalMenuHeader() : this.VerticalMenuHeader()}
        {this.state.showCSModal ? (
          <>
            <DraggableModal
              style={{ height: 'calc(100vh - 200px)' }}
              visible={this.state.showCSModal}
              title={''}
              width={1400}
              onOk={() => this.setState({ showCSModal: false })}
              onCancel={(): void => {
                this.setState({ showCSModal: false });
              }}
            >
              <VocModal />
            </DraggableModal>
          </>
        ) : null}
      </>
    );
  }
}

export default Header;
