import React, { Component } from 'react';
import { QuestionModel } from '../../../models';
import MediaSection from './MediaSection';
import OptionSection from './OptionSection';

interface Props {
  question: QuestionModel;
  responseCapture: Function;
  isActualRendering: boolean;
}

export default class Question extends Component<Props> {
  render() {
    const { elementStyle, mediaType } = this.props.question;
    return (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'inherit',
          minHeight: 'inherit',
        }}
      >
        <div style={{ display: 'table', width: '100%', minHeight: 'inherit' }}>
          <div style={{ display: 'table-row', minHeight: 'inherit' }}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
              <div style={elementStyle}>
                <div style={{ padding: '10px' }}>
                  <MediaSection media={mediaType} />
                  <OptionSection
                    optionProp={this.props.question}
                    // responseCapture={this.props.responseCapture}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
