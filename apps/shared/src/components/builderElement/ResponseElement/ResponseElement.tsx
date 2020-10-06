import React, { Component } from 'react';
import { ContactModel, ResponseElementModel } from '../../../models';
import Media from './Media';
import ResponseCapture from './ResponseCapture';

interface IProps {
  elementType: string;
  isActualRendering: boolean;
  elementDetail: ResponseElementModel;
  contact: ContactModel;
  responseCapture: Function;
}

export default class ResponseElement extends Component<IProps> {
  render() {
    const {
      responseCapture,
      elementDetail,
      isActualRendering,
      contact,
      elementType,
    } = this.props;
    return (
      <div style={elementDetail.style}>
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
                  <Media
                    media={elementDetail.media}
                    builderElementType={elementType}
                  />
                  <ResponseCapture
                    builderElementType={elementType}
                    isActualRendering={isActualRendering}
                    contact={contact}
                    elementDetail={elementDetail}
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
