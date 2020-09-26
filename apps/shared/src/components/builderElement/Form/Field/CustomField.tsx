import React, { Component, ReactNode } from 'react';
import { FieldModel, StyleModel } from '../../../../models';
import { CUSTOM_FIELD_TYPE } from '../../../../enums';
import {
  CustomDatePicker,
  CustomSelectDropdown,
  CustomNumberFormat,
} from '../../../Common';

interface Props {
  formField: FieldModel;
  fieldStyles: StyleModel;
  customFieldSelectStyles: StyleModel;
  updatedFieldDetails: Function;
  validateField: Function;
}

export default class CustomField extends Component<Props> {
  private onValueChange(value: string) {
    const updatedField = this.props.validateField({
      ...this.props.formField,
      value,
    });
    this.props.updatedFieldDetails(updatedField);
  }

  private onMultiSelectChange(selectedOptions: any, isMulti: boolean) {
    if (isMulti) {
      const selectedValues = selectedOptions.map((x: any) => x['value']);
      const updatedField = this.props.validateField({
        ...this.props.formField,
        selectedValues,
        value: selectedOptions.join(),
      });
      this.props.updatedFieldDetails(updatedField);
    } else {
      this.onValueChange(selectedOptions?.['value'] || '');
    }
  }

  private getCutomStyles() {
    const {
      borderColor,
      borderWidth,
      borderRadius,
      borderStyle,
      backgroundColor,
      color,
      height,
    } = this.props.customFieldSelectStyles;
    const customStyles = {
      control: (base: any) => ({
        ...base,
        borderColor,
        borderWidth,
        borderRadius,
        borderStyle,
        backgroundColor,
        height,
      }),
      multiValue: (base: any) => ({ ...base, color }),
      placeholder: (base: any) => ({ ...base, color }),
      indicatorContainer: (base: any) => ({ ...base, color }),
    };
    return customStyles;
  }

  private getCustomField(): ReactNode {
    const { formField, fieldStyles } = this.props;
    switch (formField.customFieldType) {
      case CUSTOM_FIELD_TYPE.LONG_TEXT:
        return (
          <textarea
            style={fieldStyles}
            value={formField.value}
            onChange={event => this.onValueChange(event.currentTarget.value)}
          />
        );
      case CUSTOM_FIELD_TYPE.NUMBER:
        return (
          <CustomNumberFormat
            type="text"
            displayType="input"
            style={fieldStyles}
            maxLength={14}
            value={formField.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              this.onValueChange(event.currentTarget.value)
            }
          />
        );
      case CUSTOM_FIELD_TYPE.DATE:
        return (
          <CustomDatePicker
            type="text"
            dateFormat={'MM/DD/YYYY'}
            styles={fieldStyles}
            value={formField.value}
            onChange={(event: any) => this.onValueChange(event)}
          />
        );
      case CUSTOM_FIELD_TYPE.YES_NO:
      case CUSTOM_FIELD_TYPE.SELECT_ONE:
      case CUSTOM_FIELD_TYPE.SELECT_MULTIPLE:
        const isMulti =
          formField.customFieldType === CUSTOM_FIELD_TYPE.SELECT_MULTIPLE;
        return (
          <CustomSelectDropdown
            styles={this.getCutomStyles()}
            closeMenuOnSelect={!isMulti}
            isMulti={isMulti}
            options={formField.options}
            defaultValue={'Select...'}
            isClearable={true}
            onChange={(values: any) =>
              this.onMultiSelectChange(values, isMulti)
            }
          />
        );
      default:
        return (
          <input
            type="text"
            style={fieldStyles}
            maxLength={50}
            value={formField.value}
            onChange={event => this.onValueChange(event.currentTarget.value)}
          />
        );
    }
  }

  render() {
    return this.getCustomField();
  }
}
