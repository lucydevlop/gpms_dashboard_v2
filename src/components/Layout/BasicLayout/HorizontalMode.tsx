import React from 'react';
import Loading from '@components/Loading';
import { observer, inject } from 'mobx-react';
import LayoutStore, { layoutStore } from '@store/layoutStore';
import classNames from 'classnames';
import { Header } from './Component';
import Footer from '@components/Footer';
import { copyright } from '@config/setting';
import { LayoutProps } from './types';

@inject('layoutStore')
@observer
class HorizontalMode extends React.Component<any, any> {
  render() {
    const { header: _headr, ...rest } = this.props;
    const { showHeader, fixHeader } = layoutStore.layoutStatus;
    const { loadingOptions, isContentFlowMode } = layoutStore;
    return (
      <div
        id="mainContainer"
        className={classNames(
          'RCS-basicLayout-horizontal',
          !showHeader && 'RCS-basicLayout-horizontal-hideHeader',
          isContentFlowMode && 'RCS-basicLayout-horizontal-contentFlow',
          fixHeader && 'RCS-basicLayout-horizontal-fixHeader'
        )}
      >
        HorizontalMode
        {showHeader && (_headr || <Header {...rest} />)}
        <div className="RCS-basicLayout-horizontal-wrapper">
          {this.props.children}
          {copyright && <Footer propStyle={{ marginTop: '16px' }} />}
        </div>
        <Loading {...loadingOptions} />
      </div>
    );
  }
}

export default HorizontalMode;
