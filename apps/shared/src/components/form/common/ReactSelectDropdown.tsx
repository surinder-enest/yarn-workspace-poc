import React, { Component } from 'react';
import { StyleModel } from '../../../models';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

interface Props {
  selectedValue?: string;
  className?: string;
  valueKey: string;
  nameKey: string;
  defaultOption?: string;
  isMulti?: boolean;
  styles: StyleModel;
  options: Array<any>;
}

export default class ReactSelectDropdown extends Component<Props> {
  animatedComponents = makeAnimated();

  render() {
    const { styles, defaultOption, className, options, isMulti } = this.props;
    const {
      borderColor,
      borderWidth,
      borderRadius,
      borderStyle,
      backgroundColor,
      color,
    } = styles;
    const customStyles = {
      control: (base: any) => ({
        ...base,
        borderColor,
        borderWidth,
        borderRadius,
        borderStyle,
        backgroundColor,
      }),
      multiValue: (base: any) => ({ ...base, color }),
      placeholder: (base: any) => ({ ...base, color }),
      indicatorContainer: (base: any) => ({ ...base, color }),
    };
    return (
      <Select
        style={customStyles}
        closeMenuOnSelect={false}
        components={this.animatedComponents}
        className={className}
        isMulti={isMulti}
        options={options}
        defaultValue={defaultOption}
      />
    );
  }
}
