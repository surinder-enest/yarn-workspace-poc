import React, { Component } from 'react';
interface Props {
  radioBtn: any;
}

export default class ResponseElementRadioInput extends Component<Props> {
  render() {
    // const { responseDetail, optionStyle } = this.props.optionProp;
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '300px', textAlign: 'left', margin: '0 auto' }}>
          <div
          // key={radioKey}
          // style={radioWrapperStyles}
          >
            {/* <div className={`${isRenderBuilderElement === true ? 'radio' : ''} no-margin`}
                        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginLeft: '12px', height: '17px' }}>
                        {
                            !isUndefinedNullOrEmpty(radioOnChangeHandler) ?
                                <input
                                    style={{ marginRight: '8px', opacity: '0', float: 'left' }}
                                    id={`${radioKey}____radio__response__details`}
                                    type="radio"
                                    name={`responseRadio_` + radioKey}
                                    value={isUndefinedNullOrEmpty(radioValue) ? "" : radioValue}
                                    onChange={(event) => { radioOnChangeHandler(event, builderElementResponse) }}
                                    checked={isUndefinedNullOrEmpty(isRadioChecked) ? false : isRadioChecked}
                                /> :
                                <input
                                    style={{ marginRight: '8px', opacity: '0', float: 'left' }}
                                    id={`${radioKey}____radio__response__details`}
                                    type="radio"
                                />
                        }
                        <label
                            style={radioLabelStyles}
                            htmlFor={`${radioKey}____radio__response__details`}
                        >
                            {radioText}
                        </label>
                    </div> */}
          </div>
        </div>
      </div>
    );
  }
}
