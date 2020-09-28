import React, { Component, ReactNode } from 'react';
import { BUILDER_ELEMENTS } from '../../../enums';
import {
  ResponseElementModel,
  ResponseOptionModel,
  StyleModel,
} from '../../../models';
import Contact from './Contact';

interface IProps {
  builderElementType: string;
  elementDetail: ResponseElementModel;
  contactId: string;
  responseCapture: Function;
}

interface IState {
  isShowContactField: boolean;
  selectedOption: string;
  mobileNumber: string;
  email: string;
  isValidContactFields: boolean;
  isResponseCatured: boolean;
}

export default class ResponseElement extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isShowContactField: !props.contactId,
      selectedOption: '',
      mobileNumber: '',
      email: '',
      isValidContactFields: false,
      isResponseCatured: false,
    };
  }

  private async onSubmitClick() {
    const {
      email,
      mobileNumber,
      selectedOption,
      isValidContactFields,
    } = this.state;
    if (isValidContactFields) {
      debugger;
      const isResponseCatured = await this.props.responseCapture(
        email,
        mobileNumber,
        selectedOption
      );
      this.setState({
        isResponseCatured,
        isShowContactField: false,
      });
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
              marginLeft: '12px',
              height: '17px',
              paddingLeft: '20px',
              margin: '0',
            }}
          >
            <input
              style={{ marginRight: '8px', opacity: '0', float: 'left' }}
              id={option.id}
              type="radio"
              value={option.id}
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
    const { contactId, elementDetail } = this.props;
    const { buttonStyle } = elementDetail;
    const { selectedOption, isValidContactFields } = this.state;
    const isClickableButton =
      selectedOption && (contactId || isValidContactFields);
    if (!isClickableButton) {
      return {
        ...buttonStyle,
        pointerEvents: 'none',
        opacity: '0.7',
      };
    }
    return {
      ...buttonStyle,
    };
  }

  private onChangeResponseClick() {
    this.setState({ isResponseCatured: false });
  }

  private getSelectedOption(): ResponseOptionModel | undefined {
    return this.props.elementDetail.options.find(
      detail => detail.id === this.state.selectedOption
    );
  }

  private getThankyouMessage(): string {
    switch (this.props.builderElementType) {
      case BUILDER_ELEMENTS.QUESTION:
        const selectedOptionDetail = this.getSelectedOption();
        return selectedOptionDetail?.thankYouMessage || '';
      default:
        return '';
    }
  }

  private getResponseThankyouHtml(): ReactNode {
    let backGroundClr = '#57ac2d';
    let borderColor = '#57ac2d';
    const { builderElementType, elementDetail } = this.props;
    const { selectedOption } = this.state;
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
          <button style={responseElementStyles}>{optionDetail?.text}</button>
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

  render() {
    const { elementDetail, contactId } = this.props;
    const { contactFieldType, options, buttonText } = elementDetail;
    const {
      isShowContactField,
      email,
      mobileNumber,
      isResponseCatured,
    } = this.state;
    return (
      <>
        {isShowContactField && (
          <Contact
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
        {isResponseCatured ? (
          this.getResponseThankyouHtml()
        ) : (
          <>
            <div className="col-md-12" style={{ textAlign: 'center' }}>
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
            {contactId && (
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
                  {`Responding as ${email ? email : mobileNumber}`}
                </div>
              </div>
            )}
          </>
        )}
      </>
    );
  }
}
