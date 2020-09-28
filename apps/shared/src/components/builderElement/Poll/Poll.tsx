import React, { Component } from 'react';
import { BUILDER_ELEMENTS } from '../../../enums';
import { PollModel } from '../../../models';
import { Media, ResponseElement } from '../ResponseElement';

interface Props {
  poll: PollModel;
  responseCapture: Function;
  isActualRendering: boolean;
  contactId: string;
}

export default class Poll extends Component<Props> {
  render() {
    const { responseCapture, poll, isActualRendering } = this.props;
    const { title, description, style, responseDetail, media } = poll;
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
                  <Media media={media} />
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
                    builderElementType={BUILDER_ELEMENTS.POLL}
                    isActualRendering={isActualRendering}
                    contactId={this.props.contactId}
                    elementDetail={responseDetail}
                    responseCapture={(
                      email?: string,
                      mobileNumber?: string,
                      selectedOption?: string
                    ) => responseCapture(email, mobileNumber, selectedOption)}
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
