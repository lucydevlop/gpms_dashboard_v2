import React, { PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';

interface IState {}
class FacilitySetting extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <PageWrapper></PageWrapper>
    )
  }
}

export default FacilitySetting
