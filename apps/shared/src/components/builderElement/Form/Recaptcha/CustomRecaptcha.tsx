import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

interface Props {
  elementId: string;
  errorMessage: string;
  onChangeCaptcha: Function;
}

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default class CustomRecaptcha extends Component<Props> {
  private sitekey = '6Le_C0YUAAAAAHQPLFx0qZ89ZFPRATD5Ym7rmqBg';
  componentDidMount() {
    this.props.onChangeCaptcha(false);
  }
  render() {
    const { elementId, errorMessage, onChangeCaptcha } = this.props;
    return (
      <div style={{ paddingTop: '20px' }}>
        {typeof window !== 'undefined' &&
          typeof window.grecaptcha !== 'undefined' &&
          typeof window.grecaptcha.render === 'function' && (
            <div className="g-recaptcha">
              <Recaptcha
                elementID={elementId}
                style={
                  'transform:scale(0.77);-webkit-transform:scale(0.77);transform-origin:0 0;-webkit-transform-origin:0 0;'
                }
                sitekey={this.sitekey}
                render="explicit"
                onloadCallback={() => {
                  console.log('load');
                }}
                verifyCallback={() => onChangeCaptcha(true)}
                expiredCallback={() => onChangeCaptcha(false)}
              />
            </div>
          )}
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
