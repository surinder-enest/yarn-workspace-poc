import React, { Component } from 'react';
import { QuestionModel, ResponseModel } from '../../../models';
import ResponseElementRadioInput from './ResponseElementRadioInput';

interface Props {
  optionProp: QuestionModel;
  // responseCapture: Function;
}

export default class ResponseElementDetailSection extends Component<Props> {
  private responseSubmitOnClickHandler = () => {
    // let data = this.props.responseCapture();
    console.log('Hit Me');
  };

  render() {
    const {
      responseDetail,
      optionStyle,
      respondButtonText,
      responseButtonStyle,
    } = this.props.optionProp;
    return (
      <>
        {responseDetail?.map((response: ResponseModel, idx: number) => {
          // const isRadioChecked = !isUndefinedNullOrEmpty(
          //   responseSelectedOptionDetail
          // )
          //   ? responseSelectedOptionDetail.Id === response.Id
          //   : false;

          const inputRadioPropsObj = {
            radioKey: `radio_${idx}`,
            radioStyles: optionStyle?.background,
            radioValue: `radio_${idx}`,
            // radioOnChangeHandler: responseRadioOnChangeHandler,
            // isRadioChecked: isRadioChecked,
            lblStyles: optionStyle?.color,
            radioText: response?.responseType,
            builderElementResponse: response,
          };
          return <ResponseElementRadioInput radioBtn={inputRadioPropsObj} />;
        })}
        <div
          style={responseButtonStyle}
          // className={`${
          //   isRenderBuilderElement === true &&
          //   isRespondBtnDisabled === true
          //     ? 'disabled'
          //     : 'clickable'
          // } ${!isRenderBuilderElement ? 'pointer-none' : ''}`}
          onClick={this.responseSubmitOnClickHandler}
        >
          {respondButtonText}
        </div>
      </>
    );
  }
}
