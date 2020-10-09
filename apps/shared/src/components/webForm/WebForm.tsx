import React, { ReactNode } from 'react';
import config from '../../config';
import {
  ELEMENT_CALLED_FROM,
  FORM_TYPE,
  THANK_YOU_ACTION_TYPE,
  FORM_LAYOUT,
} from '../../enums';
import { FormModel, WebFormModel } from '../../models';
import WebformService from '../../services/Webform.service';
import { Form } from '../BuilderElement';

interface IProps {
  formData: WebFormModel;
  isActualRendering: boolean;
}

interface IState {
  isFormSubmitted: boolean;
  isSuccessfullySubmitted: boolean;
  isShowThankYouMessage: boolean;
  submittedMessage: string;
}

class WebForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isFormSubmitted: false,
      isSuccessfullySubmitted: false,
      isShowThankYouMessage: false,
      submittedMessage: '',
    };
  }

  private async contactCaptureResponse(form: FormModel) {
    const { formData, isActualRendering } = this.props;
    if (!isActualRendering) return false;
    const apiResponse = await WebformService.formContactCapturingResponse(
      formData.accountId,
      formData.id,
      form
    );
    if (apiResponse) {
      const {
        IsAgeConfirmationRequired,
        IsBlockedByAccount,
        IsContactAdded,
        IsDoubleOptInRequired,
        IsEmailRouteForOptinConfirmation,
        IsOptinConfirmationSendFailed,
        IsValidWebForm,
      } = apiResponse;
      const isSuccessfullySubmitted = true;
      const submittedMessage =
        'This web form could not be submitted at this time.';
      if (IsValidWebForm) {
        if (IsBlockedByAccount) {
          this.setState({
            submittedMessage: "Sorry you can't submit web form at this time.",
            isSuccessfullySubmitted: !isSuccessfullySubmitted,
          });
        } else if (IsAgeConfirmationRequired && IsDoubleOptInRequired) {
          if (IsOptinConfirmationSendFailed) {
            this.setState({
              submittedMessage:
                'This web form is submitted but unable to send age confirmation verification link',
            });
          } else {
            if (IsEmailRouteForOptinConfirmation) {
              this.setState({
                submittedMessage:
                  'Thank you, please check your email to confirm your age and opt in',
                isSuccessfullySubmitted,
              });
            } else {
              this.setState({
                submittedMessage:
                  'Thank you, please check your phone to confirm your age and opt in',
                isSuccessfullySubmitted,
              });
            }
          }
        } else if (IsAgeConfirmationRequired) {
          if (IsOptinConfirmationSendFailed) {
            this.setState({
              submittedMessage:
                'This web form is submitted but unable to send age confirmation verification link',
              isSuccessfullySubmitted: !isSuccessfullySubmitted,
            });
          } else {
            if (IsEmailRouteForOptinConfirmation) {
              this.setState({
                submittedMessage:
                  'Thank you, please check your email to confirm your age',
                isSuccessfullySubmitted,
              });
            } else {
              this.setState({
                submittedMessage:
                  'Thank you, please check your phone to confirm your age',
                isSuccessfullySubmitted,
              });
            }
          }
        } else if (IsDoubleOptInRequired) {
          if (IsOptinConfirmationSendFailed) {
            this.setState({
              submittedMessage:
                'This web form is submitted but unable to send double optin  confirmation verification link',
              isSuccessfullySubmitted: !isSuccessfullySubmitted,
            });
          } else {
            if (IsEmailRouteForOptinConfirmation) {
              this.setState({
                submittedMessage:
                  'Thank you, please check your email to confirm your opt in',
                isSuccessfullySubmitted,
              });
            } else {
              this.setState({
                submittedMessage:
                  'Thank you, please check your phone to confirm your opt in',
                isSuccessfullySubmitted,
              });
            }
          }
        } else if (IsContactAdded) {
          switch (form.submitSettings.thankYou.action) {
            case THANK_YOU_ACTION_TYPE.MESSAGE:
              this.setState({ isShowThankYouMessage: true });
              break;
            case THANK_YOU_ACTION_TYPE.REDIRECT_TO_WEBSITE:
            case THANK_YOU_ACTION_TYPE.REDIRECT_TO_MOBILE_PAGE:
              return true;
          }
          this.setState({
            submittedMessage: formData.form.submitSettings.thankYou.message,
            isSuccessfullySubmitted,
          });
        } else {
          this.setState({
            submittedMessage,
            isSuccessfullySubmitted,
          });
        }
      } else {
        this.setState({ submittedMessage });
      }
    }
    this.setState({ isFormSubmitted: true });
    return false;
  }

  private getHtmlWithFormLayoutType(): ReactNode {
    const { formData, isActualRendering } = this.props;
    switch (formData.type) {
      case FORM_TYPE.POPUP:
        switch (formData.layout) {
          case FORM_LAYOUT.BLANK:
            break;
        }
        break;
      default:
        break;
    }
    return (
      <Form
        elementId={formData.id}
        form={formData.form}
        responseCapture={(form: FormModel) => this.contactCaptureResponse(form)}
        contactId={''}
        responseCapturedFromModule={ELEMENT_CALLED_FROM.WEB_FORM}
        isActualRendering={isActualRendering}
        countriesAndStates={formData.countriesAndStates}
        accountCountryId={formData.countryId}
      />
    );
  }

  render() {
    const { formData } = this.props;
    const {
      isFormSubmitted,
      isSuccessfullySubmitted,
      submittedMessage,
      isShowThankYouMessage,
    } = this.state;
    return (
      <div
        className="modal-body"
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          visibility: 'visible',
          padding: '0px',
        }}
      >
        <div style={{ padding: '0px' }}>
          {isFormSubmitted && submittedMessage ? (
            <div style={{ padding: '20px', visibility: 'visible' }}>
              {isSuccessfullySubmitted && (
                <img
                  src={`${config.APP_ENDPOINT}images/check-medium.gif`}
                  height="100"
                  style={{
                    display: 'block',
                    margin: 'auto',
                  }}
                />
              )}
              {isShowThankYouMessage ? (
                <h3 className="text-center">{`${submittedMessage} `}</h3>
              ) : (
                <h3 className="text-center">{`${submittedMessage} `}</h3>
              )}
            </div>
          ) : (
            <div className="row no-margin">
              <div className="col-md-12 no-padding">
                <div
                  style={{
                    paddingTop: '10px',
                    ...formData.style,
                    minHeight: '540px',
                    maxWidth: '670px',
                    borderRadius: '4px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 2px 4px 0 #CCCCCC',
                    margin: '0 auto',
                    marginTop: '15px',
                    marginBottom: '10px',
                    padding: '30px',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '300px',
                      margin: '0 auto',
                      paddingTop: '25px',
                    }}
                  >
                    {' '}
                    {this.getHtmlWithFormLayoutType()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default WebForm;
