import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

interface Props {
  [otherProps: string]: any;
}

export default class CustomNumberFormat extends Component<Props> {
  render() {
    return <NumberFormat {...this.props} />;
  }
}
