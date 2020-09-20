import React, { Component, ReactNode } from 'react';
import { FormFieldModel, FieldModel, CountryModel } from '../../../../models';
import { FORM_FIELDS, FORM_FIELD_TYPE } from '../../../../enums';
import StandardField from './StandardField';
import CustomField from './CustomField';

interface IProps {
  fieldDetails: FormFieldModel;
  fieldResponses: Array<FieldModel>;
  updatedFieldDetails: Function;
  validateField: Function;
  countriesAndStates: Array<CountryModel>;
  accountCountryId: string;
}

interface IState {
  countryId: string;
}

export default class Field extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      countryId: '',
    };
  }

  componentDidMount() {
    const { accountCountryId } = this.props;
    const hasCountryField = this.props.fieldResponses.some(
      field => field.formFields === FORM_FIELDS.COUNTRY
    ); 
    if (!hasCountryField) {
      this.setState({ countryId: accountCountryId });
    }
  }

  private onCountryChange(countryId: string) {
    this.setState({ countryId });
  }

  private getFieldTypeHtml(formField: FieldModel): ReactNode {
    const { fieldStyles, customFieldSelectStyles } = this.props.fieldDetails;

    switch (formField.formFieldType) {
      case FORM_FIELD_TYPE.STANDARD:
        return (
          <StandardField
            formField={formField}
            countryId={this.state.countryId}
            onCountryChange={(value: string) => this.onCountryChange(value)}
            countriesAndStates={this.props.countriesAndStates}
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
            updatedFieldDetails={this.props.updatedFieldDetails}
            validateField={this.props.validateField}
          />
        );
      default:
        return <></>;
    }
  }

  private getField(formField: FieldModel, idx: number): ReactNode {
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
      this.getField(field, idx)
    );
  }
}