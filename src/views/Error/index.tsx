import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PageWrapper from '@components/PageWrapper';
import SearchForm from '@components/StandardTable/SearchForm';

interface IState {}

@inject('parkinglotStore', 'localeStore')
@observer
class Error extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <PageWrapper>
        {/*<SearchForm*/}
        {/*  submit={(value) => this.getSearchData(value)}*/}
        {/*  location={this.props.location}*/}
        {/*  footerRender={() => this.addProdRender()}*/}
        {/*  fieldConfig={searchFields}*/}
        {/*/>*/}
      </PageWrapper>
    );
  }
}

export default Error;
