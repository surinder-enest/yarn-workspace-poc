import React, { Component } from 'react';
import BarCode from 'react-barcode';

interface Props {
  [otherProps: string]: any;
}

export default class CustomBarCode extends Component<Props> {
  render() {
    return <BarCode {...this.props} />;
  }
}
