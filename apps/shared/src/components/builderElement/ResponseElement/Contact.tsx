import React, { Component, ReactNode } from 'react';
import { CONTACT_FIELD_OPTION } from '../../../enums';
import { Regex } from '../../../utilities';
import { CustomNumberFormat } from '../../Common';

interface IProps {
  fieldType: string;
  mobileNumber: string;
  email: string;
  onChangeContact: Function;
}

export default class Contact extends Component<IProps> {
  private validateFields(email: string, mobileNumber: string) {
    const { fieldType, onChangeContact } = this.props;
    let isValidEmail = true;
    let isValidNumber = true;
    switch (fieldType) {
      case CONTACT_FIELD_OPTION.EMAIL_ONLY:
        isValidEmail = Regex.validateEmail.test(email);
        break;
      case CONTACT_FIELD_OPTION.MOBILE_ONLY:
        isValidNumber = Regex.validateMobileNumberFormat.test(mobileNumber);
        break;
      case CONTACT_FIELD_OPTION.EMAIL_AND_MOBILE:
        isValidEmail = Regex.validateEmail.test(email);
        isValidNumber = Regex.validateMobileNumberFormat.test(mobileNumber);
        break;
    }
    const isValidFields = isValidEmail && isValidNumber;
    onChangeContact(email, mobileNumber, isValidFields);
  }

  private onEmailChange(email: string) {
    this.validateFields(email, this.props.mobileNumber);
  }

  private onNumberChange(mobileNumber: string) {
    this.validateFields(this.props.email, mobileNumber);
  }

  private getFieldHtml(fieldType: string): ReactNode {
    let isShowEmailField = false;
    let isShowMobileNumberField = false;
    switch (fieldType) {
      case CONTACT_FIELD_OPTION.EMAIL_ONLY:
        isShowEmailField = true;
        break;
      case CONTACT_FIELD_OPTION.MOBILE_ONLY:
        isShowMobileNumberField = true;
        break;
      case CONTACT_FIELD_OPTION.EMAIL_AND_MOBILE:
        isShowEmailField = true;
        isShowMobileNumberField = true;
        break;
    }
    const inputStyle = {
      backgroundColor: '#fff',
      borderRadius: '4px',
      border: '1px solid #ccc',
      minHeight: '44px',
      width: '100%',
      fontSize: '16px',
      padding: '0 8px',
      lineHeight: '42px',
    };
    return (
      <>
        {(isShowMobileNumberField || isShowEmailField) && (
          <div style={{ width: '66%', margin: '10px auto' }}>
            {isShowMobileNumberField && (
              <div className="col-md-12" style={{ marginBottom: '15px' }}>
                <label
                  style={{
                    color: 'rgb(0, 0, 0)',
                    lineHeight: '1.25',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    marginBottom: '5px',
                    fontSize: '16px',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  Mobile Phone*
                </label>
                <CustomNumberFormat
                  style={inputStyle}
                  type={'text'}
                  displayType={'input'}
                  format="###-###-####"
                  placeholder="Mobile Phone"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    this.onNumberChange(event.currentTarget.value)
                  }
                />
              </div>
            )}
            {isShowEmailField && (
              <div className="col-md-12" style={{ marginBottom: '15px' }}>
                <label
                  style={{
                    color: 'rgb(0, 0, 0)',
                    lineHeight: '1.25',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    marginBottom: '5px',
                    fontSize: '16px',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  Email*
                </label>
                <input
                  style={inputStyle}
                  maxLength={30}
                  placeholder="Email"
                  onChange={event =>
                    this.onEmailChange(event.currentTarget.value)
                  }
                />
              </div>
            )}
          </div>
        )}
      </>
    );
  }

  render() {
    const { fieldType } = this.props;
    return this.getFieldHtml(fieldType);
  }
}
