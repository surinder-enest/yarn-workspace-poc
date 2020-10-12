import React, { Component, ReactNode } from 'react';
import config from '../../../config';
import { BUILDER_ELEMENTS } from '../../../enums';
import {
  ContactModel,
  ResponseElementModel,
  ResponseOptionModel,
  StyleModel,
} from '../../../models';
import { Utility } from '../../../utilities';
import Contact from './Contact';
import PasswordModal from './PasswordModal';

interface IProps {
  builderElementType: string;
  isActualRendering: boolean;
  elementDetail: ResponseElementModel;
  contact: ContactModel;
  isSnapshot: boolean;
  responseCapture: Function;
}

interface IState {
  selectedOption: string;
  mobileNumber: string;
  email: string;
  isValidContactFields: boolean;
  isResponseCaptured: boolean;
  isShowPasswordModal: boolean;
  isNotYouClicked: boolean;
}

export default class ResponseCapture extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedOption: '',
      mobileNumber: '',
      email: '',
      isValidContactFields: false,
      isResponseCaptured: false,
      isShowPasswordModal: false,
      isNotYouClicked: false,
    };
  }

  componentDidUpdate() {
    const { isNotYouClicked } = this.state;
    if (!this.props.contact.isNotYouAllowed && isNotYouClicked) {
      this.toggleNotYouHandler(false);
    }
  }

  private downloadFile() {
    const { fileUrl, fileName } = this.props.elementDetail;
    this.setState({
      isResponseCaptured: true,
    });
    if (fileUrl && fileName) {
      const isSafari =
        /constructor/i.test(window?.HTMLElement) ||
        (function(p) {
          return p.toString() === '[object SafariRemoteNotification]';
        })(
          !window?.['safari'] ||
            (typeof window?.['safari'] !== 'undefined' &&
              window?.['safari']?.pushNotification)
        );
      if (!isSafari) {
        const redirectUrl = `${config.API_ENDPOINT}api/Account/DownloadFileFromUrl?url=${fileUrl}&fileName=${fileName}`;
        Utility.redirectToOtherPage(redirectUrl);
      } else {
        Utility.redirectToOtherPage(fileUrl, true);
      }
    }
  }

  private async saveResponse() {
    const { selectedOption } = this.state;
    const { contact } = this.props;
    const email = this.state.email || contact.email;
    const mobileNumber = this.state.mobileNumber || contact.mobileNumber;
    const isResponseCaptured =
      (await this.props.responseCapture(
        email,
        mobileNumber,
        selectedOption
      )) === true;
    this.setState({
      isResponseCaptured,
    });

    if (this.props.builderElementType === BUILDER_ELEMENTS.DOWNLOAD) {
      this.downloadFile();
    }
  }

  private async onSubmitClick() {
    const { elementDetail, builderElementType, contact } = this.props;
    if (this.state.isValidContactFields || contact.id) {
      switch (builderElementType) {
        case BUILDER_ELEMENTS.DOWNLOAD:
          if (elementDetail.isPasswordRequired) {
            this.setState({ isShowPasswordModal: true });
          } else {
            this.saveResponse();
          }
          break;
        default:
          this.saveResponse();
          break;
      }
    }
  }

  private onChangeContact(
    email: string,
    mobileNumber: string,
    isValidContactFields: boolean
  ) {
    this.setState({ email, mobileNumber, isValidContactFields });
  }

  private onSelectOption(selectedOption: string) {
    this.setState({ selectedOption });
  }

  private getOptionHtml(option: ResponseOptionModel, idx: number): ReactNode {
    const { optionStyle, optionLabelStyle } = this.props.elementDetail;
    const { selectedOption } = this.state;
    return (
      <div
        key={idx}
        style={{ width: '300px', textAlign: 'left', margin: '0px auto' }}
      >
        <div style={optionStyle}>
          <div
            className="radio"
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '17px',
              marginTop: '0',
              marginBottom: '0',
              marginRight: '0',
              marginLeft: '12px',
            }}
          >
            <input
              style={{
                marginRight: '8px',
                float: 'left',
                opacity: 0,
                marginTop: '3px',
              }}
              id={option.id}
              type="radio"
              checked={option.id === selectedOption}
              onChange={event => this.onSelectOption(event.currentTarget.id)}
            />
            <label style={optionLabelStyle} htmlFor={option.id}>
              {option.text}
            </label>
          </div>
        </div>
      </div>
    );
  }

  private getButtonStyles(): StyleModel {
    const { contact, elementDetail, builderElementType } = this.props;
    const { buttonStyle } = elementDetail;
    const { selectedOption, isValidContactFields } = this.state;
    const isDownloadElement = builderElementType === BUILDER_ELEMENTS.DOWNLOAD;
    const isClickableButton =
      (isDownloadElement || selectedOption) &&
      (contact.id || isValidContactFields);
    if (!isClickableButton) {
      return {
        ...buttonStyle,
        pointerEvents: 'none',
        opacity: '0.7',
      };
    }
    return buttonStyle;
  }

  private onChangeResponseClick() {
    this.setState({ isResponseCaptured: false });
  }

  private getSelectedOption(): ResponseOptionModel | undefined {
    return this.props.elementDetail.options.find(
      detail => detail.id === this.state.selectedOption
    );
  }

  private getThankyouMessage(): string {
    const { thankYouMessage } = this.props.elementDetail;
    switch (this.props.builderElementType) {
      case BUILDER_ELEMENTS.QUESTION:
        const selectedOptionDetail = this.getSelectedOption();
        return selectedOptionDetail?.thankYouMessage || '';
      case BUILDER_ELEMENTS.POLL:
      case BUILDER_ELEMENTS.FEEDBACK:
      case BUILDER_ELEMENTS.DOWNLOAD:
        return thankYouMessage;
      default:
        return '';
    }
  }

  private getResponseThankyouHtml(): ReactNode {
    const { builderElementType, elementDetail } = this.props;
    const { selectedOption } = this.state;
    switch (builderElementType) {
      case BUILDER_ELEMENTS.DOWNLOAD:
        return (
          <div
            dangerouslySetInnerHTML={{ __html: this.getThankyouMessage() }}
          />
        );
      default:
        let backGroundClr = '#57ac2d';
        let borderColor = '#57ac2d';
        switch (builderElementType) {
          case BUILDER_ELEMENTS.QUESTION:
            const isNoOption = elementDetail.options.find(
              option => option.id === selectedOption && option.text === 'No'
            );
            if (isNoOption) {
              backGroundClr = '#ff0000';
              borderColor = '#ff0000';
            }
            break;
          default:
            '';
        }

        const buttonStyles: StyleModel = {
          display: 'inline-block',
          marginBottom: '0',
          textAlign: 'center',
          lineHeight: '20px',
          fontSize: '18px',
          cursor: 'pointer',
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
          width: '300px',
        };
        const responseElementStyles: StyleModel = {
          ...buttonStyles,
          marginTop: '28px',
          backgroundColor: backGroundClr,
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: borderColor,
          borderRadius: '5px',
          marginBottom: '10px',
          color: '#ffffff',
        };

        const changeResponseButtonStyles: StyleModel = {
          ...buttonStyles,
          backgroundColor: '#ffffff',
          borderColor: '#3abfdd',
          color: '#3abfdd',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderRadius: '5px',
          marginBottom: '10px',
        };
        const optionDetail = this.getSelectedOption();
        return (
          <>
            <a style={{ textDecoration: 'none', color: '#2196F3' }}>
              <div
                dangerouslySetInnerHTML={{ __html: this.getThankyouMessage() }}
              />
            </a>
            <div style={{ width: '100%' }}>
              <button style={responseElementStyles}>
                {optionDetail?.text}
              </button>
              <button
                style={changeResponseButtonStyles}
                onClick={() => this.onChangeResponseClick()}
              >
                Change Response
              </button>
            </div>
          </>
        );
    }
  }

  private toggleNotYouHandler(isNotYouClicked: boolean) {
    this.setState({ isNotYouClicked });
  }

  render() {
    const {
      elementDetail,
      contact,
      isActualRendering,
      builderElementType,
      isSnapshot,
    } = this.props;
    const {
      title,
      description,
      contactFieldType,
      options,
      buttonText,
      isPasswordRequired,
      password,
    } = elementDetail;
    const {
      email,
      mobileNumber,
      isResponseCaptured,
      isShowPasswordModal,
      isNotYouClicked,
    } = this.state;
    return (
      <>
        {isPasswordRequired && isShowPasswordModal && (
          <PasswordModal
            password={password}
            saveResponse={() => this.saveResponse()}
          />
        )}
        <div
          style={{ paddingBottom: '15px' }}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
        {description && (
          <div
            style={{ paddingBottom: '15px' }}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
        {(isActualRendering || isSnapshot) &&
          (!contact.id || isNotYouClicked) &&
          !isResponseCaptured && (
            <Contact
              elementType={builderElementType}
              fieldType={contactFieldType}
              email={email}
              mobileNumber={mobileNumber}
              onChangeContact={(
                email: string,
                mobileNumber: string,
                isValidFields: boolean
              ) => this.onChangeContact(email, mobileNumber, isValidFields)}
            />
          )}
        {isResponseCaptured ? (
          this.getResponseThankyouHtml()
        ) : (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              {options?.map((option: ResponseOptionModel, idx: number) =>
                this.getOptionHtml(option, idx)
              )}
            </div>
            <div
              style={this.getButtonStyles()}
              onClick={() => this.onSubmitClick()}
            >
              {buttonText}
            </div>
            {contact.id && !isNotYouClicked && (
              <div
                style={{
                  width: '100%',
                }}
              >
                <div
                  style={{
                    textAlign: 'center',
                    paddingTop: '10px',
                  }}
                >
                  {`Responding as ${
                    contact.name
                      ? contact.name
                      : contact.email
                      ? contact.email
                      : contact.mobileNumber
                  }${contact.isNotYouAllowed ? '. ' : ''}`}
                  {contact.isNotYouAllowed ? (
                    <a
                      className="clickable"
                      style={{ textDecoration: 'none', color: '#3abfdd' }}
                      onClick={() => this.toggleNotYouHandler(true)}
                    >
                      {`Not You?`}
                    </a>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}
