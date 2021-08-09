import React from 'react';
import { inject, observer } from 'mobx-react';
import PageWrapper from '@components/PageWrapper';

interface IUsersState {}

@inject('localeStore')
@observer
class Users extends React.PureComponent<any, IUsersState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <PageWrapper></PageWrapper>;
  }
}
