import React, { Component } from 'react';
import { BuilderElementModel, FieldModel } from '../../models';
import { Field, Interest, Terms, ReactRecaptcha } from '.';
import {
  FORM_FIELD_TYPE,
  FORM_FIELDS,
  CUSTOM_FIELD_TYPE,
  THANK_YOU_ACTION_TYPE,
} from '../../enums';
import { Regex, Utility } from '../../utilities';
import { BuilderElementService } from '../../services';

interface IProps {
  builderElement: BuilderElementModel;
  moduleId: string;
  contactId: string;
  accountId: string;
  responseCapturedFromModule: string;
  isActualRendering: boolean;
}

interface IInterest {
  errorMessage: string;
  selectedInterest: Array<string>;
}

interface IState {
  fieldResponses: Array<FieldModel>;
  interestResponse: IInterest;
  isShowThankYouMessage: boolean;
  isAcceptedTerms: boolean;
  isTermsVisible: boolean;
  termsErrorMessage: string;
  isCaptchaConfigured: boolean;
  captchaErrorMessage: string;
}

export default class Form extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fieldResponses: [],
      interestResponse: { errorMessage: '', selectedInterest: [] },
      isShowThankYouMessage: false,
      termsErrorMessage: '',
      isAcceptedTerms: false,
      isTermsVisible: false,
      isCaptchaConfigured: false,
      captchaErrorMessage: '',
    };
  }

  componentDidMount() {
    const { fields } = this.props.builderElement.form.fieldDetails;
    this.setState({
      fieldResponses: fields.map(x => x),
    });
  }

  private updatedFieldDetails(updatedField: FieldModel) {
    let updatedFields = this.state.fieldResponses.map((field: FieldModel) => {
      return field.id == updatedField.id ? updatedField : field;
    });
    this.setState({ fieldResponses: updatedFields });
  }

  private validate(value: string, isRequired: boolean, regex?: RegExp): string {
    if (isRequired && !value) {
      return 'Required';
    }
    if (value && regex && !regex.test(value)) {
      return 'Invalid';
    }
    return '';
  }

  private validateStandardField(field: FieldModel): FieldModel {
    const { isRequired, value } = { ...field };
    let regex: any = null;

    switch (field.formFields) {
      case FORM_FIELDS.MOBILE_PHONE:
      case FORM_FIELDS.HOME_PHONE:
      case FORM_FIELDS.WORK_PHONE:
        regex = Regex.validateMobileNumberFormat;
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
    }
    field.errorMessage = this.validate(value, isRequired, regex);
    return field;
  }

  private validateCustomField(field: FieldModel): FieldModel {
    const { isRequired, value } = { ...field };
    let regex: any = null;
    let validateValue = value;

    switch (field.customFieldType) {
      case CUSTOM_FIELD_TYPE.NUMBER:
        regex = Regex.validateNumber;
        break;
      case CUSTOM_FIELD_TYPE.EMAIL:
        regex = Regex.validateEmail;
        break;
      case CUSTOM_FIELD_TYPE.PHONE:
        regex = Regex.validateMobileNumberFormat;
        break;
      case CUSTOM_FIELD_TYPE.URL:
        validateValue = value ? new Date(value).toString() : value;
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
        field = this.validateCustomField(field);
        break;
    }
    return field;
  }

  private validateInterest(selectedInterest: Array<string>): boolean {
    const {
      isRequireResponse,
      responseValue,
      options,
    } = this.props.builderElement.form.interest;
    let isValidInterest = true;
    const totalInterests = options.length;
    const totalSelectedInterest = selectedInterest.length;
    let errorMessage = '';
    if (isRequireResponse) {
      if (totalSelectedInterest === 0 && responseValue === -1) {
        errorMessage = 'Please select interest';
      } else if (
        totalSelectedInterest < responseValue &&
        totalInterests >= responseValue
      ) {
        errorMessage =
          `Please select at least ${responseValue}` +
          `${responseValue > 1 ? ' interests' : ' interest'}`;
      }
    }
    this.updateInterest(errorMessage, selectedInterest);
    return isValidInterest;
  }

  private updateInterest(
    errorMessage: string,
    selectedInterest: Array<string>
  ) {
    this.setState({ interestResponse: { errorMessage, selectedInterest } });
  }

  private validateForm(): boolean {
    const {
      fieldResponses,
      interestResponse,
      isAcceptedTerms,
      isCaptchaConfigured,
    } = this.state;
    const {
      requireReCaptcha,
      requireAcceptance,
    } = this.props.builderElement.form.submitSettings;
    let isValidFields = true;
    let updatedFields = fieldResponses.map(field => {
      field = this.validateField(field);
      if (field.errorMessage) isValidFields = false;
      return field;
    });

    this.setState({ fieldResponses: updatedFields });
    const isValidInterest = this.validateInterest(
      interestResponse.selectedInterest
    );

    let isValidForm = isValidFields && isValidInterest;

    if (requireAcceptance || requireReCaptcha) {
      let termsErrorMessage = '';
      let captchaErrorMessage = '';
      if (requireAcceptance && !isAcceptedTerms) {
        termsErrorMessage = 'Please accept Terms & Conditions.';
        isValidForm = false;
      }
      if (requireReCaptcha && !isCaptchaConfigured) {
        captchaErrorMessage =
          requireAcceptance && !isAcceptedTerms
            ? 'Please accept Terms & Conditions. Please check the captcha.'
            : 'Recaptcha is required.';
        termsErrorMessage = '';
        isValidForm = false;
      }
      this.setState({ termsErrorMessage, captchaErrorMessage });
    }
    return isValidForm;
  }

  private toggleTermsAcceptance(isAcceptedTerms: boolean) {
    let { termsErrorMessage } = this.state;
    if (isAcceptedTerms && termsErrorMessage) {
      termsErrorMessage = '';
    }
    this.setState({ isAcceptedTerms, termsErrorMessage });
  }

  private toggleViewTerms(isTermsVisible: boolean) {
    this.setState({ isTermsVisible });
  }

  private onChangeCaptcha(isCaptchaConfigured: boolean) {
    let { captchaErrorMessage } = { ...this.state };
    if (isCaptchaConfigured) {
      captchaErrorMessage = '';
    }
    this.setState({ isCaptchaConfigured, captchaErrorMessage });
  }

  private onSubmitButton(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    if (this.validateForm()) {
      const { fieldResponses, interestResponse } = this.state;
      const {
        moduleId,
        contactId,
        accountId,
        responseCapturedFromModule,
        builderElement,
      } = this.props;
      const {
        action,
        redirectUrl,
      } = builderElement.form.submitSettings.thankYou;

      let updatedBuilderElement = { ...builderElement };
      updatedBuilderElement.form.fieldDetails.fields = fieldResponses.map(
        x => x
      );
      updatedBuilderElement.form.interest.selectedOptions = interestResponse.selectedInterest.map(
        x => x
      );
      const isFormSubmitted = BuilderElementService.saveBuilderElementResponse(
        updatedBuilderElement,
        moduleId,
        contactId,
        accountId,
        responseCapturedFromModule
      );

      if (isFormSubmitted) {
        switch (action) {
          case THANK_YOU_ACTION_TYPE.MESSAGE:
            this.setState({ isShowThankYouMessage: true });
            break;
          case THANK_YOU_ACTION_TYPE.REDIRECT_TO_WEBSITE:
          case THANK_YOU_ACTION_TYPE.REDIRECT_TO_MOBILE_PAGE:
            let url = redirectUrl;
            if (!Regex.httpProtocolRegex.test(url)) {
              url = 'http://' + url;
            }
            if (
              url &&
              contactId &&
              action === THANK_YOU_ACTION_TYPE.REDIRECT_TO_MOBILE_PAGE
            ) {
              url = `${url}?contId=${contactId}`;
            }
            Utility.redirectToOtherPage(url);
            break;
        }
      }
    }
    return;
  }

  render() {
    const {
      styles,
      title,
      fieldDetails,
      interest,
      buttonStyles,
      submitSettings,
    } = this.props.builderElement.form;
    const {
      fieldResponses,
      interestResponse,
      isShowThankYouMessage,
      termsErrorMessage,
      isTermsVisible,
      isAcceptedTerms,
      captchaErrorMessage,
    } = this.state;
    return (
      <div>
        {isShowThankYouMessage ? (
          <div style={{ padding: '10px !importants' }}>
            <img
              src="https://s.mobilepages.co/images/check-medium.gif"
              height="100"
              style={{
                display: 'block',
                margin: 'auto',
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: submitSettings.thankYou.message,
              }}
            />
            ;
          </div>
        ) : (
            <div style={styles}>
              <style>{`a {
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
                  <Interest
                    interest={interest}
                    errorMessage={interestResponse.errorMessage}
                    selectedInterest={interestResponse.selectedInterest}
                    validateInterest={(selectedInterest: Array<string>) =>
                      this.validateInterest(selectedInterest)
                    }
                  />
                  <Terms
                    submitSettings={submitSettings}
                    isAcceptedTerms={isAcceptedTerms}
                    isTermsVisible={isTermsVisible}
                    toggleViewTerms={(value: boolean) =>
                      this.toggleViewTerms(value)
                    }
                    toggleTermsAcceptance={(value: boolean) =>
                      this.toggleTermsAcceptance(value)
                    }
                    errorMessage={termsErrorMessage}
                    acceptanceId={this.props.builderElement.key}
                  />
                </div>
              </div>
              {submitSettings.requireReCaptcha && (
                <ReactRecaptcha
                  elementId={`recaptcha_${this.props.builderElement.key}`}
                  errorMessage={captchaErrorMessage}
                  onChangeCaptcha={(value: boolean) =>
                    this.onChangeCaptcha(value)
                  }
                />
              )}
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
                  offers, alerts and news. Msg & data rates may apply. Text STOP
                to end. Up to {submitSettings.maxMessageLimit} msg/mo.
              </div>
                <div
                  style={{
                    paddingTop: '20px',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={buttonStyles}
                    onClick={event => this.onSubmitButton(event)}
                  >
                    {submitSettings.buttonText}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}
