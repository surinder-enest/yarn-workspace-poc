import React, { Component } from 'react';
import DatePicker from 'react-16-bootstrap-date-picker';

interface Props {
  [otherProps: string]: any;
}

export default class CustomDatePicker extends Component<Props> {
  render() {
    return <DatePicker {...this.props} />;
  }
}
