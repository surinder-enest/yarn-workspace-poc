import React, { Component } from 'react';
import { QuestionModel } from '../../../models';
import ResponseElementDetailSection from './ResponseElementDetailSection';
import ResponseElementUserFields from './ResponseElementUserFields';

interface Props {
  optionProp: QuestionModel;
  // responseCapute: Function;
}

export default class OptionSection extends Component<Props> {
  render() {
    const { title, description, contactInformation } = this.props.optionProp;
    return (
      <>
        <div
          className="btn-builder"
          style={{ paddingBottom: '15px' }}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
        {description && (
          <div
            className="btn-builder"
            style={{ paddingBottom: '15px' }}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
        <ResponseElementUserFields userFields={contactInformation} />
        <ResponseElementDetailSection
          optionProp={this.props.optionProp}
          // responseCapture={this.props.responseCapute}
        />
      </>
    );
  }
}
