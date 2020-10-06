import React, { Component } from 'react';
import { ButtonModel } from '../../../models';

interface Props {
  button: ButtonModel;
  responseCapture: Function;
}

export default class Button extends Component<Props> {
  private onClick() {
    this.props.responseCapture();
  }

  render() {
    const { url, text, elementStyle, style } = this.props.button;
    return (
      <div style={elementStyle}>
        <div style={{ display: 'table', width: '100%', minHeight: 'inherit' }}>
          <div style={{ display: 'table-row', minHeight: 'inherit' }}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
              <a href={url} target="_blank" onClick={() => this.onClick()}>
                <div
                  className="btn-builder"
                  style={style}
                  dangerouslySetInnerHTML={{
                    __html: text,
                  }}
                ></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
