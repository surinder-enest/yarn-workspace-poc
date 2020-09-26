import React, { Component, ReactNode } from 'react';
import { ResponseElementModel, ResponseOptionModel } from '../../../models';
import Contact from './Contact';

interface IProps {
  elementDetail: ResponseElementModel;
  contactId: string;
}

interface IState {
  selectedOption: string;
  isValidContactFields: boolean;
}

export default class ResponseElement extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedOption: '',
      isValidContactFields: false,
    };
  }

  private onSubmitClick() {
    debugger;
  }

  private onChangeContact(isValidContactFields: boolean) {
    this.setState({ isValidContactFields });
  }

  private onSelectOption(selectedOption: string) {
    debugger;
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

  private getButtonStyles(): any {
    const { contactId, elementDetail } = this.props;
    const { buttonStyle } = elementDetail;
    const { selectedOption, isValidContactFields } = this.state;
    const isClickableButton =
      selectedOption && (contactId || isValidContactFields);
    if (!isClickableButton) {
      return {
        ...buttonStyle,
        pointerEvents: 'none',
        opacity: 0.7,
      };
    }
    return {
      ...buttonStyle,
    };
  }

  render() {
    const { contactFieldType, options, buttonText } = this.props.elementDetail;
    return (
      <>
        <Contact
          fieldType={contactFieldType}
          onChangeContact={(value: boolean) => this.onChangeContact(value)}
        />
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
      </>
    );
  }
}
