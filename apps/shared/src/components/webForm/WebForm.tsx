import React, { ReactNode } from 'react';
import config from '../../config';
import {
  ELEMENT_CALLED_FROM,
  FORM_TYPE,
  THANK_YOU_ACTION_TYPE,
  FORM_LAYOUT,
} from '../../enums';
import { FormModel, StyleModel, WebFormModel } from '../../models';
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

  componentDidMount() {
    setTimeout(function() {
      if (typeof document !== 'undefined') {
        var elements = document.body.getElementsByClassName('webform-render');
        var bodyHeight = document.body.offsetHeight;
        if (elements && elements.length > 0) {
          bodyHeight = elements[0].scrollHeight;
        }
        var bodyWidth = document.body.offsetWidth;
        window.parent.postMessage(
          JSON.stringify({ docHeight: bodyHeight, docWidth: bodyWidth }),
          '*'
        );
      }
    }, 300);
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
          this.setState({
            submittedMessage: formData.form.submitSettings.thankYou.message,
            isSuccessfullySubmitted,
            isFormSubmitted:true
          });
          switch (form.submitSettings.thankYou.action) {
            case THANK_YOU_ACTION_TYPE.MESSAGE:
              this.setState({ isShowThankYouMessage: true });
              return false;
            case THANK_YOU_ACTION_TYPE.REDIRECT_TO_WEBSITE:
            case THANK_YOU_ACTION_TYPE.REDIRECT_TO_MOBILE_PAGE:
              return true;
          }
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

  private getFormHtml(): ReactNode {
    const { formData, isActualRendering } = this.props;
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

  private getMediaHtml(): ReactNode {
    const { imageUrl } = this.props.formData;
    return (
      <>
        {!imageUrl && (
          <>
            <div className="row no-margin">
              <div className="col-md-12 no-padding">
                <div
                  style={{
                    background: `url("${config.APP_ENDPOINT}images/Image-blue-small.svg") no-repeat`,
                    backgroundSize: '160px 160px',
                    fontSize: '50px',
                    position: 'relative',
                    margin: '0 auto',
                    height: '160px',
                    width: '160px',
                    marginBottom: '10px',
                    marginTop: '10px',
                  }}
                ></div>
              </div>
            </div>
            <div className="row no-margin">
              <div
                style={{
                  color: '#789BB6',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  margin: '0 auto',
                  textAlign: 'center',
                }}
              >
                <div>Select in Media</div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  private getHtmlWithFormLayoutType(): ReactNode {
    const { formData, isActualRendering } = this.props;
    const {
      background,
      backgroundColor,
      minHeight,
      opacity,
    } = formData.imageStyle;
    const styles = { background, backgroundColor, minHeight, opacity };
    const crossIconHtml = !isActualRendering ? (
      <div className="button-container">
        <button
          type="button"
          className="close"
          style={formData.modalCloseIconStyle}
        ></button>
      </div>
    ) : (
      <></>
    );
    switch (formData.type) {
      case FORM_TYPE.POPUP:
        switch (formData.layout) {
          case FORM_LAYOUT.BLANK:
            break;
          case FORM_LAYOUT.IMAGE_LEFT:
            return (
              <div style={{ display: 'table-row' }}>
                {crossIconHtml}
                <div className="imageright-inside" style={styles}>
                  {this.getMediaHtml()}
                </div>
                <div className="imageleft-inside">{this.getFormHtml()}</div>
              </div>
            );
          case FORM_LAYOUT.IMAGE_RIGHT:
            return (
              <div style={{ display: 'table-row' }}>
                {crossIconHtml}
                <div className="imageleft-inside">{this.getFormHtml()}</div>
                <div className="imageright-inside" style={styles}>
                  {this.getMediaHtml()}
                </div>
              </div>
            );
          case FORM_LAYOUT.IMAGE_BEHIND:
            break;
          case FORM_LAYOUT.MEDIA_ABOVE:
            return (
              <>
                <div
                  className="col-md-12 no-padding image-above"
                  style={{ display: 'table-row' }}
                >
                  <div className="row no-margin" style={styles}>
                    {this.getMediaHtml()}
                  </div>
                </div>
                <div className="row mediaabovelayout">
                  <div
                    className="col-md-12 no-padding"
                    style={{ marginTop: '20px' }}
                  >
                    {this.getFormHtml()}
                  </div>
                </div>
              </>
            );
        }
        break;
      default:
        break;
    }
    return this.getFormHtml();
  }

  private getWrapperStyle() {
    const { style, imageStyle, type, layout } = this.props.formData;
    const isPopupType = type === FORM_TYPE.POPUP;
    const isBlankLayout = isPopupType && layout === FORM_LAYOUT.BLANK;
    const isBehindLayout = isPopupType && layout === FORM_LAYOUT.IMAGE_BEHIND;
    const isAboveLayout = isPopupType && layout === FORM_LAYOUT.MEDIA_ABOVE;
    const background = isBehindLayout ? imageStyle.background : '';
    const backgroundColor = isBehindLayout
      ? imageStyle.backgroundColor
      : style.backgroundColor;
    const minHeight =
      isPopupType && !isBehindLayout && !isAboveLayout && !isBlankLayout
        ? 'auto'
        : '540px';
    return {
      paddingTop: '10px',
      ...style,
      background,
      margin: !isPopupType ? '15px auto auto' : '0',
      minHeight,
      maxWidth: '670px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px 0 #CCCCCC',
      marginBottom: '10px',
      padding: !isPopupType ? '30px' : '0px',
      backgroundColor,
    };
  }

  private getWrapperInsideStyle(): StyleModel {
    const { type, layout, style } = this.props.formData;
    if (type === FORM_TYPE.POPUP && layout === FORM_LAYOUT.IMAGE_BEHIND) {
      return new StyleModel({
        backgroundColor: style.backgroundColor,
      });
    }
    return new StyleModel();
  }

  render() {
    const { type, layout } = this.props.formData;
    const {
      isFormSubmitted,
      isSuccessfullySubmitted,
      submittedMessage,
      isShowThankYouMessage,
    } = this.state;
    const wrapperClass =
      type === FORM_TYPE.POPUP
        ? layout === FORM_LAYOUT.MEDIA_ABOVE
          ? 'imagemediaabove-container'
          : 'image-wrapper'
        : '';
    const wrapperInnerClass =
      type === FORM_TYPE.POPUP && layout !== FORM_LAYOUT.BLANK
        ? layout === FORM_LAYOUT.IMAGE_BEHIND
          ? 'imagebehindlayout'
          : layout === FORM_LAYOUT.MEDIA_ABOVE
          ? 'row no-margin'
          : ''
        : 'embedded-section';
    return (
      <div
        className="webform-render modal-body"
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
                <style>
                  {`.imageleft-inside {
                      width: 360px;
                      display: table-cell;
                      padding-top: 30px;
                      padding-left: 30px;
                      padding-bottom: 40px;
                      padding-right: 30px;
                  }
                  .imageright-inside {
                    width: 310px;
                    height: 300px;
                    display: table-cell;
                    vertical-align: middle;
                  }
                  .image-wrapper .button-container, .imageleft-wrapper .button-container {
                    position: absolute
                    width: 670px
                    margin: 0 auto
                  }
                  .image-wrapper .button-container .close, .imageleft-wrapper .button-container .close{
                    top: -20px
                    left: 20px
                  } 
                  .image-wrapper,  .imageleft-wrapper {
                    width: 670px;
                    overflow: auto;
                    display: table;
                    margin: 0 auto;
                    height: 300px;
                    border-radius: 4px;
                    background-color: #FFFFFF;
                    box-shadow: 0 2px 4px 0 #CCCCCC;
                    margin-top: 15px;
                    margin-bottom: 10px;
                  }
                    .imageright-inside {
                      width: 310px;
                      height: 300px;
                      display: table-cell;
                      vertical-align: middle;
                  }
                  .embedded-section {
                    max-width: 300px;
                    margin: 0 auto;
                    padding-top: 25px;
                  }
                  .imagebehindlayout {
                    max-width: 300px;
                    width: 100%;
                    margin: 0 auto;
                    position: relative;
                    top: -32px;
                  }
                  .imagebehindlayout {
                    top: 0;
                    background: #fff;
                    padding-top: 30px;
                    padding-right: 30px;
                    padding-bottom: 40px;
                    padding-left: 30px;
                    margin-bottom: 0;
                    max-width: 366px;
                    min-height: 505px;
                    min-height: 540px;
                  } 
                  .imagemediaabove-container {
                    padding: 0;
                  }
                  .imagemediaabove-container .image-above {
                    position: relative;
                  }
                  .mediaabovelayout {
                      max-width: 300px;
                      margin: 0 auto;
                  }
                  .imagemediaabove-container .mediaabovelayout {
                    padding-bottom: 40px;
                  } 
                `}
                </style>
                <div className={wrapperClass} style={this.getWrapperStyle()}>
                  <div
                    className={wrapperInnerClass}
                    style={this.getWrapperInsideStyle()}
                  >
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
