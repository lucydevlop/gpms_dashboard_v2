import React from 'react';
import './basicLayout.less';
import HorizontalMode from './HorizontalMode';
import VerticalMode from './VerticalMode';
import { SkeletonProps } from './types';

class BasicLayout extends React.Component<SkeletonProps, any> {
  render() {
    const { isHorizontalNavigator, ...rest } = this.props;
    return <>{isHorizontalNavigator ? <HorizontalMode {...rest} /> : <VerticalMode {...rest} />}</>;
  }
}

export default BasicLayout;
