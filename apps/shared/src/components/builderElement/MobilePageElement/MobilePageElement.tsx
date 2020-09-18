import React, { Component } from 'react';
import { MobilePageElementModel } from '../../../models';

interface Props {
  mobilePageElement: MobilePageElementModel;
}

export default class MobilePageElement extends Component<Props> {
  render() {
    const {
      buttonText,
      elementStyle,
      style,
      pageUrl,
    } = this.props.mobilePageElement;

    return (
      <a href={pageUrl} style={elementStyle} target="_blank">
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
