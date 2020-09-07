import React, { Component } from 'react';
import { StyleModel } from '../../../models';
interface Props {
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
