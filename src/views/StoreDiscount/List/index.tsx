import React from 'react';

interface IState {
  loading: boolean;
}

class StoreDiscountList extends React.PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true
    };
  }
}
