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
  onSingleSelect: Function;
  onMultiSelect: Function;
}

export default class ReactSelectDropdown extends Component<Props> {
  animatedComponents = makeAnimated();

  private getCutomStyles() {
    const {
      borderColor,
      borderWidth,
      borderRadius,
      borderStyle,
      backgroundColor,
      color,
    } = this.props.styles;
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
    return customStyles;
  }

  onChangeHandler(selectedOptions: any) {
    const { isMulti, valueKey } = this.props;
    if (isMulti) {
      const selectedValues = selectedOptions.map((x: any) => x[valueKey]);
      this.props.onMultiSelect(selectedValues);
    } else {
      this.props.onSingleSelect(selectedOptions?.[valueKey] || '');
    }
  }
  render() {
    const { defaultOption, className, options, isMulti } = this.props;
    return (
      <Select
        styles={this.getCutomStyles()}
        closeMenuOnSelect={!isMulti}
        components={this.animatedComponents}
        className={className}
        isMulti={isMulti}
        options={options}
        defaultValue={defaultOption}
        isClearable={true}
        onChange={(event: any) => this.onChangeHandler(event)}
      />
    );
  }
}
