import React, { Component, ReactNode } from 'react';
import { FieldModel, StyleModel } from '../../../models';
import { CUSTOM_FIELD_TYPE } from '../../../enums';
import NumberFormat from 'react-number-format';
import DatePicker from 'react-16-bootstrap-date-picker';
import { CustomSelectDropdown } from '../../common';

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

  private onMultiSelectChange(selectedOptions: Array<string>) {
    let updatedField = { ...this.props.formField };
    updatedField.value = selectedOptions.join();
    updatedField.selectedOptions = selectedOptions;
    updatedField = this.props.validateField(updatedField);
    this.props.updatedFieldDetails(updatedField);
  }

  private getCustomField(): ReactNode {
    const { formField, fieldStyles, customFieldSelectStyles } = this.props;
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
          <NumberFormat
            type="text"
            displayType="input"
            style={fieldStyles}
            maxLength={14}
            value={formField.value}
            onChange={event => this.onValueChange(event.currentTarget.value)}
          />
        );
      case CUSTOM_FIELD_TYPE.DATE:
        return (
          <DatePicker
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
            valueKey="value"
            nameKey="label"
            options={formField.options}
            styles={customFieldSelectStyles}
            isMulti={isMulti}
            onSingleSelect={(value: string) => this.onValueChange(value)}
            onMultiSelect={(selectedValues: Array<string>) =>
              this.onMultiSelectChange(selectedValues)
            }
            defaultOption={'Select...'}
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
