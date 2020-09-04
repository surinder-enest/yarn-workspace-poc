import React, { Component } from 'react';
import { FieldModel, StyleModel } from '../../../models';
import { CUSTOM_FIELD_TYPE } from '../../../enums';
import { ReactSelectDropdown, DatePicker } from '..';
import NumberFormat from 'react-number-format';

interface Props {
  formField: FieldModel;
  fieldStyles: StyleModel;
  customFieldSelectStyles: StyleModel;
  onInputChange: Function;
  validateField: Function;
}

export default class CustomField extends Component<Props> {
  private onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let updatedField = { ...this.props.formField };
    updatedField.value = event.currentTarget.value;
    this.props.onInputChange(updatedField);
  }

  private getCustomField() {
    const { formField, fieldStyles, customFieldSelectStyles } = this.props;
    switch (formField.customFieldType) {
      case CUSTOM_FIELD_TYPE.LONG_TEXT:
        return <textarea style={fieldStyles} />;
      case CUSTOM_FIELD_TYPE.NUMBER:
        return (
          <NumberFormat
            type="text"
            displayType={'input'}
            style={fieldStyles}
            maxLength={14}
          />
        );
      case CUSTOM_FIELD_TYPE.DATE:
        return <DatePicker styles={fieldStyles} />;
      case CUSTOM_FIELD_TYPE.YES_NO:
      case CUSTOM_FIELD_TYPE.SELECT_ONE:
      case CUSTOM_FIELD_TYPE.SELECT_MULTIPLE:
        const isMulti =
          formField.customFieldType === CUSTOM_FIELD_TYPE.SELECT_MULTIPLE;
        return (
          <ReactSelectDropdown
            valueKey="value"
            nameKey="label"
            options={formField.options}
            styles={customFieldSelectStyles}
            isMulti={isMulti}
            defaultOption={'Select...'}
          />
        );
      default:
        return (
          <input
            id={formField.id}
            type="text"
            style={fieldStyles}
            maxLength={50}
            onChange={event => this.onInputChange(event)}
          />
        );
    }
  }
  render() {
    return this.getCustomField();
  }
}
