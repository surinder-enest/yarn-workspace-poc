import React, { Component } from 'react';
import { QuestionModel } from '../../../models';
import { ResponseElement } from '../ResponseElement';

interface Props {
  question: QuestionModel;
  responseCapture: Function;
  isActualRendering: boolean;
  contactId: string;
}

export default class Question extends Component<Props> {
  render() {
    const { title, description, style, responseDetail } = this.props.question;
    return (
      <div style={style}>
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
          <div
            style={{ display: 'table', width: '100%', minHeight: 'inherit' }}
          >
            <div style={{ display: 'table-row', minHeight: 'inherit' }}>
              <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                <div style={{ padding: '0 10px' }}>
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
                  <ResponseElement
                    contactId={this.props.contactId}
                    elementDetail={responseDetail}
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
