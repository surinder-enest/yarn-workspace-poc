import React, { Component } from 'react';
import DatePicker from 'react-16-bootstrap-date-picker';
import { StyleModel } from '../../models';

interface Props {
  type?: string;
  dateFormat?: string;
  styles?: StyleModel;
  value?: string;
  onChange?: Function;
}

export default class CustomDatePicker extends Component<Props> {
  render() {
    const { type, dateFormat, styles, value, onChange } = this.props;
    return <DatePicker
      type={type}
      dateFormat={dateFormat}
      styles={styles}
      value={value}
      onChange={(event: any) => onChange ? onChange(event) : {}} />;
  }
}
