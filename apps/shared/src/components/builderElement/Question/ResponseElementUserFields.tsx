import React, { Component, ReactNode } from 'react';
import NumberFormat from 'react-number-format';
import { RequestContactInfoOptions } from '../../../enums';
import { ContactModel } from '../../../models';
import { Regex } from '../../../utilities';

interface Props {
  userFields: ContactModel;
}
interface State {
  mobilePhone: string;
  emailAddress: string;
  isMobileValid: boolean;
  isEmailValid: boolean;
}

export default class ResponseElementUserFields extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      mobilePhone: '',
      emailAddress: '',
      isEmailValid: true,
      isMobileValid: true,
    };
  }

  private getContactInfo() {
    const { userFields } = this.props;
    let fieldsData = [];
    if (userFields.requireEmailOnly) {
      fieldsData.push({
        key: 'EmailAddress',
        labelText: RequestContactInfoOptions.EmailAddress,
        isRequired: true,
      });
    } else if (userFields.requireMobileOnly) {
      fieldsData.push({
        key: 'MobilePhone',
        labelText: RequestContactInfoOptions.MobilePhone,
        isRequired: true,
      });
    } else if (userFields.requireEmailAndMobile) {
      fieldsData.push({
        key: 'MobilePhone',
        labelText: RequestContactInfoOptions.MobilePhone,
        isRequired: true,
      });
      fieldsData.push({
        key: 'EmailAddress',
        labelText: RequestContactInfoOptions.EmailAddress,
        isRequired: true,
      });
    }

    return fieldsData;
  }

  private validateUserFieldsOnChangeHandler = (
    event: React.FormEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const enteredValue = event.currentTarget.value;
    const trimmedValue = enteredValue.trim();

    switch (fieldName) {
      case RequestContactInfoOptions.EmailAddress:
        let isEmailIdValid = false;

        if (trimmedValue) {
          isEmailIdValid = Regex.validateEmail.test(trimmedValue);
        }

        this.setState(
          {
            isEmailValid: isEmailIdValid,
            emailAddress: enteredValue,
          },
          () => {
            // this.getDisableClass(); //CALL FUNCTION TO GET DISABLE CLASS FOR RESPONSE ELEMENT
          }
        );

        break;
      case RequestContactInfoOptions.MobilePhone:
        let isMobValid = false;

        if (trimmedValue) {
          isMobValid = Regex.validateMobileNumberFormat.test(trimmedValue);
        }

        this.setState(
          {
            isMobileValid: isMobValid,
            mobilePhone: enteredValue,
          },
          () => {
            // this.getDisableClass(); //CALL FUNCTION TO GET DISABLE CLASS FOR RESPONSE ELEMENT
          }
        );

        break;
    }
  };

  private userFieldsOnBlurHandler = () => {
    const {
      isEmailValid,
      isMobileValid,
      emailAddress,
      mobilePhone,
    } = this.state;
    let responseFieldsData = [];

    if (isEmailValid) {
      responseFieldsData.push({
        EmailAddress: emailAddress,
        isRequired: true,
      });
    }
    if (isMobileValid) {
      responseFieldsData.push({
        MobilePhone: mobilePhone,
        isRequired: true,
      });
    }
    console.log(responseFieldsData);
  };

  private getFields = (): ReactNode => {
    const fields = this.getContactInfo();
    return (
      <div
        style={{
          width: '66%',
          margin: '0 auto !important',
          marginBottom: '10px !important',
          marginTop: '10px !important',
        }}
      >
        {fields?.map((field, idx) => (
          <div key={idx} className="row">
            {field.labelText === RequestContactInfoOptions.EmailAddress && (
              <div className="col-md-12" style={{ marginBottom: '15px' }}>
                <label className="labelStyle">Email*</label>
                <input
                  className={`form-control ${
                    !this.state.isEmailValid ? 'errorBorder' : ''
                  }`}
                  id={field.key}
                  maxLength={30}
                  required={field.isRequired}
                  value={this.state.emailAddress}
                  placeholder={`Email`}
                  onChange={event => {
                    this.validateUserFieldsOnChangeHandler(
                      event,
                      field.labelText
                    );
                  }}
                  onBlur={this.userFieldsOnBlurHandler}
                />
              </div>
            )}
            {field.labelText === RequestContactInfoOptions.MobilePhone && (
              <div className="col-md-12" style={{ marginBottom: '15px' }}>
                <label className="labelStyle">Mobile Phone*</label>
                <NumberFormat
                  id={field.key}
                  className={`form-control ${
                    !this.state.isMobileValid ? 'errorBorder' : ''
                  }`}
                  type={'text'}
                  displayType={'input'}
                  format="###-###-####"
                  placeholder="Mobile Phone"
                  data-value="mob"
                  value={this.state.mobilePhone}
                  onChange={event => {
                    this.validateUserFieldsOnChangeHandler(
                      event,
                      field.labelText
                    );
                  }}
                  onBlur={this.userFieldsOnBlurHandler}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  render() {
    return this.getFields();
  }
}
