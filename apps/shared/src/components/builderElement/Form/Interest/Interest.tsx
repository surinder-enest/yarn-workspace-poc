import React, { Component, ReactNode } from 'react';
import { InterestModel, InterestOptionModel } from '../../../../models';

interface Props {
  interest: InterestModel;
  errorMessage: string;
  selectedInterest: Array<string>;
  validateInterest: Function;
}

export default class Interest extends Component<Props> {
  private onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked, id } = event.currentTarget;
    let selectedInterests = this.props.selectedInterest.map(x => x);
    if (checked) {
      selectedInterests.push(id);
    } else {
      const index = selectedInterests.indexOf(id);
      if (index > -1) selectedInterests.splice(index, 1);
    }
    this.props.validateInterest(selectedInterests);
  }

  private getOption(option: InterestOptionModel, idx: number): ReactNode {
    const { optionStyles, optionLabelStyles } = this.props.interest;
    return (
      <div key={idx} style={optionStyles} className="circle-checkbox">
        <div
          className={`checkbox checkbox-primary`}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            margin: '0 0 0 12px',
            height: '17px',
          }}
        >
          <input
            id={option.categoryId}
            style={{ marginRight: '8px', opacity: '0', float: 'left' }}
            type="checkbox"
            onChange={event => this.onChange(event)}
          />
          <label style={optionLabelStyles} htmlFor={option.categoryId}>
            {option.text}
          </label>
        </div>
      </div>
    );
  }

  render() {
    const { errorMessage, interest } = this.props;
    const { title, options, isRequireResponse } = interest;
    return (
      <>
        {options.length > 0 ? (
          <>
            <div
              className="row no-margin"
              style={{
                paddingTop: '10px',
                paddingBottom: '10px',
                display: 'flex',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: title }} />
              {isRequireResponse && (
                <span
                  style={{
                    color: '#ff0000',
                    marginLeft: '4px',
                    fontSize: '21px',
                  }}
                >
                  *
                </span>
              )}
              {errorMessage && (
                <span
                  style={{
                    color: '#FF0000',
                    display: 'inline-block',
                    width: '266px',
                    textAlign: 'right',
                    fontSize: '16px',
                  }}
                >
                  {errorMessage}
                </span>
              )}
            </div>
            <div className="row no-margin" style={{ display: 'flex' }}>
              <div className="col-md-12 no-padding" style={{ width: '100%' }}>
                {options.map((interestDetail, idx) =>
                  this.getOption(interestDetail, idx)
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}
