import React, { Component } from 'react';
import { MobilePageElementModel } from '../../../models';

interface Props {
  mobilePageElement: MobilePageElementModel;
  responseCapture: Function;
}

export default class MobilePageElement extends Component<Props> {

  private onClick() {
    this.props.responseCapture();
  }

  render() {
    const {
      buttonText,
      elementStyle,
      style,
      pageUrl,
    } = this.props.mobilePageElement;

    return (
      <a href={pageUrl} style={elementStyle} target="_blank" onClick={() => this.onClick()}>
        <div style={{ display: 'table', width: '100%', minHeight: 'inherit' }}>
          <div style={{ display: 'table-row', minHeight: 'inherit' }}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
              <div
                className="btn-builder"
                style={style}
                dangerouslySetInnerHTML={{
                  __html: buttonText,
                }}
              ></div>
            </div>
          </div>
        </div>
      </a>
    );
  }
}
