import React, { Component } from 'react';
import QRCode from 'qrcode-react';

interface Props {
  [otherProps: string]: any;
}

export default class CustomQRCode extends Component<Props> {
  render() {
    return <QRCode {...this.props} />;
  }
}
