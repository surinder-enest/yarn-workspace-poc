import React, { Component } from 'react';
import { FormSubmitSettingModel } from '../../../../models';

interface IProps {
  submitSettings: FormSubmitSettingModel;
  acceptanceId: string;
  errorMessage: string;
  isTermsVisible: boolean;
  isAcceptedTerms: boolean;
  toggleViewTerms: Function;
  toggleTermsAcceptance: Function;
}

export default class Terms extends Component<IProps> {
  render() {
    const {
      errorMessage,
      acceptanceId,
      submitSettings,
      toggleViewTerms,
      isTermsVisible,
      toggleTermsAcceptance,
      isAcceptedTerms,
    } = this.props;
    return (
      <>
        {submitSettings.requireAcceptance && (
          <div
            className="row no-margin padding-top-10"
            style={{ paddingTop: '10px' }}
          >
            <div className="col-md-12 no-padding">
              <div
                style={{
                  paddingLeft: 0,
                  paddingRight: '10px',
                  paddingTop: '10px',
                }}
              >
                <div
                  className="checkbox checkbox-primary no-margin"
                  style={{ width: '302px' }}
                >
                  <input
                    id={acceptanceId}
                    type="checkbox"
                    className="selectable"
                    defaultChecked={isAcceptedTerms}
                    onClick={event => {
                      toggleTermsAcceptance(event.currentTarget.checked);
                    }}
                  />
                  <label
                    style={{
                      marginLeft: '4px',
                      position: 'relative',
                      bottom: '2px',
                    }}
                    htmlFor={acceptanceId}>
                    I accept Terms & Conditions.
                  </label>
                  <a
                    style={{
                      color: '#337ab7',
                      position: 'relative',
                      bottom: '2px',
                    }}
                    onClick={() => {
                      toggleViewTerms(!isTermsVisible);
                    }}
                    className="clickable"
                  >
                    {` View Terms`}
                  </a>
                  {isTermsVisible && (
                    <div
                      dangerouslySetInnerHTML={{ __html: submitSettings.terms }}
                    ></div>
                  )}
                </div>
                {errorMessage && (
                  <div
                    style={{
                      color: '#FF0000',
                      textAlign: 'center',
                      fontSize: '14px',
                      marginBottom: '10px',
                    }}
                  >
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {submitSettings.showTermsAndConditions &&
          !submitSettings.requireAcceptance && (
            <div
              style={{ paddingTop: '10px' }}
              className="row no-margin padding-top-10"
            >
              <a
                onClick={() => toggleViewTerms(!isTermsVisible)}
                className="clickable"
              >{` View Terms & Conditions`}</a>
              {isTermsVisible && (
                <div
                  dangerouslySetInnerHTML={{ __html: submitSettings.terms }}
                ></div>
              )}
              {errorMessage && (
                <div
                  style={{
                    color: '#FF0000',
                    textAlign: 'center',
                    fontSize: '14px',
                    marginBottom: '10px',
                  }}
                >
                  {errorMessage}
                </div>
              )}
            </div>
          )}
      </>
    );
  }
}
