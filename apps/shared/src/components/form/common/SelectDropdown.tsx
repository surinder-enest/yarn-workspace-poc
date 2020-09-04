import React, { Component } from 'react';
import { StyleModel } from '../../../models';
interface Props {
  selectedValue?: string;
  className?: string;
  valueKey: string;
  nameKey: string;
  defaultOption?: string;
  styles: StyleModel;
  options: Array<any>;
  onSelectChange: Function;
}

export default class SingleSelectDropdown extends Component<Props> {
  render() {
    const {
      selectedValue,
      styles,
      defaultOption,
      className,
      options,
      valueKey,
      nameKey,
      onSelectChange,
    } = this.props;
    return (
      <select
        style={styles}
        className={className}
        value={selectedValue}
        onClick={event => onSelectChange(event)}
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
