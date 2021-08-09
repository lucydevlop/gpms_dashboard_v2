import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { useLocation, useHistory } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import LayoutStore, { layoutStore } from '@store/layoutStore';
import LocaleStore, { localeStore } from '@store/localeStore';
import './breadcrumb.less';
import { Breadcrumb } from '@models/global';

interface BreadCrumbState {
  pathname: string;
  history: any;
}

interface BreadCrumbProps {
  history: any;
}

@inject('layoutStore', 'localeStore')
@observer
class BreadCrumb extends React.Component<BreadCrumbProps, BreadCrumbState> {
  state: BreadCrumbState = {
    pathname: '',
    history: ''
  };

  componentDidMount() {
    // let history = useHistory();
    // let location = useLocation();
    // const { pathname } = window.location.pathname;

    layoutStore.addBreadcrumb(window.location.pathname);
    this.setState({ pathname: window.location.pathname });
  }

  checkDisplay(path: string) {
    return path === this.state.pathname;
  }

  handleGoBreadPath(path: string) {
    if (this.state.pathname === path) {
      return;
    }
    this.props.history.push(path);
  }

  handleDelBreadcrumb(e: React.MouseEvent<HTMLElement>, name: string) {
    const { delBreadcrumb } = layoutStore;
    e.stopPropagation();
    const delSelf = delBreadcrumb(name, this.state.pathname);
    if (delSelf) {
      this.props.history.push(delSelf.path);
    }
  }

  render() {
    const { breadcrumbList } = layoutStore;
    const { localeObj } = localeStore;
    return (
      <div className="RCS-breadcrumbList">
        {breadcrumbList.map((bread: Breadcrumb, index: number) => {
          const { display, path, name } = bread;
          const key = path.split('/').slice(1).join('.');

          return display ? (
            <div
              key={index}
              className={classNames(
                'RCS-breadcrumb',
                this.checkDisplay(path) && 'RCS-breadcrumb-display'
              )}
              onClick={() => this.handleGoBreadPath(path)}
            >
              {localeObj[`menu.${key}`] || name}
              <CloseOutlined
                className="RCS-breadcrumb-closeIcon"
                onClick={(e) => this.handleDelBreadcrumb(e, name)}
              />
            </div>
          ) : null;
        })}
      </div>
    );
  }
}

export default BreadCrumb;
