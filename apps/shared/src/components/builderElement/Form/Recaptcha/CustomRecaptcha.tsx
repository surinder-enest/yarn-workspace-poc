import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

interface Props {
  elementId: string;
  errorMessage: string;
  onChangeCaptcha: Function;
}

export default class CustomRecaptcha extends Component<Props> {
  private sitekey = '6Le_C0YUAAAAAHQPLFx0qZ89ZFPRATD5Ym7rmqBg';
  render() {
    const { elementId, errorMessage, onChangeCaptcha } = this.props;
    return (
      <div style={{ paddingTop: '20px' }}>
        <Recaptcha
          elementID={elementId}
          style={
            'transform:scale(0.77);-webkit-transform:scale(0.77);transform-origin:0 0;-webkit-transform-origin:0 0;'
          }
          sitekey={this.sitekey}
          render="explicit"
          verifyCallback={() => onChangeCaptcha(true)}
          expiredCallback={() => onChangeCaptcha(false)}
        />
        {errorMessage && (
          <div
            style={{
              color: '#FF0000',
              textAlign: 'center',
              fontSize: '14px',
              margin: '10px auto',
              width: '100%',
            }}
          >
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
}
