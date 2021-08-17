import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PageWrapper from '@components/PageWrapper';

interface IState {}
@inject('localeStore')
@observer
class TenantList extends PureComponent<any, IState> {
  render() {
    return <PageWrapper></PageWrapper>;
  }
}

export default TenantList;
