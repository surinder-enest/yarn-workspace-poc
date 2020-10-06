import React, { Component } from 'react';
import { StyleModel } from '../../models';
interface Props {
  value: string;
  className?: string;
  valueKey: string;
  nameKey: string;
  defaultOption?: string;
  styles: StyleModel;
  options: Array<any>;
  onSelectChange: Function;
}

export default class SelectDropdown extends Component<Props> {
  render() {
    const {
      styles,
      defaultOption,
      className,
      options,
      valueKey,
      nameKey,
      value,
      onSelectChange,
    } = this.props;
    return (
      <select
        style={styles}
        value={value}
        className={className}
        onChange={event => onSelectChange(event.currentTarget.value)}
      >
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.map((option, idx) => (
          <option key={idx} value={option[valueKey]}>
            {option[nameKey]}
          </option>
        ))}
      </select>
    );
  }
}
