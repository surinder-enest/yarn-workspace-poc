import React, { Component } from 'react';
import { BuilderElementModel, FieldModel } from '../../models';
import { Field, Interest } from '.';
import { FORM_FIELD_TYPE, FORM_FIELDS } from '../../enums';
import { Utility, Regex } from '../../utilities';

interface IProps {
  builderElement: BuilderElementModel;
}

interface IState {
  fieldResponses: Array<FieldModel>;
}

export default class Form extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fieldResponses: [],
    };
  }

  componentDidMount() {
    this.setState({
      fieldResponses: this.props.builderElement.form.fieldDetails.fields.map(
        x => x
      ),
    });
  }

  private onSubmitButton(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    return;
  }

  private updatedFieldDetails(updatedField: FieldModel) {
    let updatedFields = this.state.fieldResponses.map((field: FieldModel) => {
      return field.id == updatedField.id
        ? this.validateField(updatedField)
        : field;
    });
    this.setState({ fieldResponses: updatedFields });
  }

  private validate(value: string, isRequired: boolean, regex?: RegExp): string {
    if (isRequired && !value) {
      return 'Required';
    }
    if (regex && !regex.test(value)) {
      return 'Invalid';
    }
    return '';
  }

  private validateStandardField(field: FieldModel): FieldModel {
    const { isRequired, value } = { ...field };
    let regex: any = null;
    let validateValue = value;

    switch (field.formFields) {
      case FORM_FIELDS.MOBILE_PHONE:
      case FORM_FIELDS.HOME_PHONE:
      case FORM_FIELDS.WORK_PHONE:
        validateValue = value ? Utility.formatPhoneNumber(value) : value;
        break;
      case FORM_FIELDS.CITY:
      case FORM_FIELDS.STATE:
      case FORM_FIELDS.COUNTRY:
      case FORM_FIELDS.FIRST_NAME:
      case FORM_FIELDS.LAST_NAME:
        regex = Regex.validateName;
        break;
      case FORM_FIELDS.ZIP:
        regex =
          value && value.length == 5
            ? Regex.validate5DigitZip
            : Regex.validateZip;
        break;
      case FORM_FIELDS.EMAIL:
        regex = Regex.validateEmail;
        break;
      case FORM_FIELDS.STREET_1:
      case FORM_FIELDS.STREET_2:
        regex = Regex.validateAddress;
        break;
      case FORM_FIELDS.WEB_SITE:
        regex = Regex.validateWebsite;
        break;
      case FORM_FIELDS.BIRTHDAY:
        break;
    }
    field.errorMessage = this.validate(validateValue, isRequired, regex);
    return field;
  }

  private validateField(field: FieldModel): FieldModel {
    switch (field.formFieldType) {
      case FORM_FIELD_TYPE.STANDARD:
        field = this.validateStandardField(field);
        break;
      case FORM_FIELD_TYPE.CUSTOM:
        break;
    }
    return field;
  }

  render() {
    const {
      styles,
      title,
      fieldDetails,
      interest,
      buttonStyles,
      formSubmitSettings,
    } = this.props.builderElement.form;
    const { fieldResponses } = this.state;
    return (
      <div style={styles}>
        <style jsx={true}>{`
          a {
            text-decoration: none;
          }
        `}</style>
        <div style={{ width: '66%', margin: '0 auto' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '20px', position: 'relative' }}>
              <div dangerouslySetInnerHTML={{ __html: title }} />
            </div>
            <Field
              fieldDetails={fieldDetails}
              fieldResponses={fieldResponses}
              updatedFieldDetails={(updatedField: FieldModel) =>
                this.updatedFieldDetails(updatedField)
              }
              validateField={(updatedField: FieldModel) =>
                this.validateField(updatedField)
              }
            />
            <Interest interest={interest} />
          </div>
        </div>
        <div
          style={{
            paddingTop: '20px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div
            className="agreement-text"
            style={{
              width: '66%',
              margin: '0 auto',
              color: fieldDetails.labelStyles.color,
              fontWeight: 'normal',
              fontStyle: 'normal',
              fontSize: '13px',
              textAlign: 'left',
            }}
          >
            You agree to opt-in to receive Text and/or email notifications,
            offers, alerts and news. Msg & data rates may apply. Text STOP to
            end. Up to {50} msg/mo.
          </div>
          <div
            style={{
              paddingTop: '20px',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div style={buttonStyles} onClick={() => this.onSubmitButton}>
              {formSubmitSettings.buttonText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
