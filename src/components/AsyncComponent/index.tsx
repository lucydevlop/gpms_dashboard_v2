import React from 'react';
import WrapAnimation from '@components/WrapAnimation';
import { inject, observer } from 'mobx-react';
import LayoutStore from '@store/layoutStore';

interface AsyncProps {
  componentInfo: any;
  route: any;
}

interface AsyncState {
  component: any;
  animate: string;
}

interface InjectProps extends AsyncProps {
  layoutStore: LayoutStore;
}

/**
 * 懒加载模块
 * @param {componentInfo} object
 * componentInfo 내부 매개 변수
 * {asyncComponent} 동적 Import
 * {animate}
 * {path}
 * */

@inject('layoutStore')
@observer
class AsyncComponent extends React.Component<AsyncProps, AsyncState> {
  get injected() {
    return this.props as InjectProps;
  }

  state = {
    component: '',
    animate: ''
  };

  async componentDidMount() {
    const {
      componentInfo: [componentOrPath, animate],
      route
    } = this.props;
    const { layoutStore } = this.injected;

    layoutStore.checkIsInitial(route);
    let C: any;
    if (typeof componentOrPath === 'string') {
      console.log('componentOrPath', componentOrPath);
      const { default: component } = await import(
        /* webpackChunkName: "[request]" */ `../../../src${componentOrPath}`
      );
      C = component;
    } else {
      C = componentOrPath;
    }

    this.setState({
      component: C,
      animate: animate
    });
  }

  componentWillUnmount() {
    this.setState({ component: '', animate: '' });
  }

  componentDidUpdate() {
    const { layoutStore } = this.injected;
    layoutStore.ctrlProgress(false);
    layoutStore.ctrlSpinning({ spinning: false });
  }

  render() {
    const { component, animate } = this.state;

    const C: any = component;

    if (animate === 'notAnimate') {
      return <C {...this.props} />;
    }

    return C ? (
      <WrapAnimation animate={animate}>
        <C {...this.props} />
      </WrapAnimation>
    ) : null;
  }
}
export default AsyncComponent;
