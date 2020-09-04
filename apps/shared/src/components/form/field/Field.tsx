import React, { Component, ReactNode } from 'react';
import { FormFieldModel, FieldModel } from '../../../models';
import { FORM_FIELDS, FORM_FIELD_TYPE } from '../../../enums';
import StandardField from './StandardField';
import CustomField from './CustomField';

interface Props {
  fieldDetails: FormFieldModel;
  fieldResponses: Array<FieldModel>;
  updatedFieldDetails: Function;
  validateField: Function;
}

export default class Field extends Component<Props> {
  private getFieldTypeHtml(formField: FieldModel): ReactNode {
    const { fieldStyles, customFieldSelectStyles } = this.props.fieldDetails;

    switch (formField.formFieldType) {
      case FORM_FIELD_TYPE.STANDARD:
        return (
          <StandardField
            formField={formField}
            styles={fieldStyles}
            updatedFieldDetails={this.props.updatedFieldDetails}
            validateField={this.props.validateField}
          />
        );
      case FORM_FIELD_TYPE.CUSTOM:
        return (
          <CustomField
            formField={formField}
            fieldStyles={fieldStyles}
            customFieldSelectStyles={customFieldSelectStyles}
            onInputChange={this.props.updatedFieldDetails}
            validateField={this.props.validateField}
          />
        );
      default:
        return <></>;
    }
  }

  private formField(formField: FieldModel, idx: number): ReactNode {
    if (!formField) {
      return <></>;
    }
    const { color } = this.props.fieldDetails.labelStyles;
    const marginLeft =
      formField.formFields === FORM_FIELDS.BIRTHDAY ? '5px' : '';
    return (
      <div key={idx} className={`row no-margin padding-top-10`}>
        <p
          style={{
            color,
            lineHeight: '1.25',
            fontWeight: 'normal',
            fontStyle: 'normal',
            marginBottom: '5px',
            fontSize: '16px',
            marginBlockStart: '0em',
          }}
        >
          {formField.fieldName}{' '}
          {formField.isRequired && (
            <span style={{ color: '#ff0000', marginLeft }}> *</span>
          )}
          {formField.errorMessage && (
            <span style={{ color: '#FF0000', float: 'right' }}>
              {formField.errorMessage}
            </span>
          )}
        </p>
        {this.getFieldTypeHtml(formField)}
      </div>
    );
  }

  render() {
    return this.props.fieldResponses.map((field, idx) =>
      this.formField(field, idx)
    );
  }
}
