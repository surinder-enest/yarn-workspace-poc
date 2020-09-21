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
      <a href={url} style={elementStyle} target="_blank" onClick={() => this.onClick()}>
        <div
          style={{
            display: 'table',
            width: '100%',
            minHeight: 'inherit',
          }}
        >
          <div
            style={{
              display: 'table-row',
              minHeight: 'inherit',
            }}
          >
            <div
              style={{
                display: 'table-cell',
                verticalAlign: 'middle',
              }}
            >
              <div
                className="btn-builder"
                style={style}
                dangerouslySetInnerHTML={{
                  __html: text,
                }}
              ></div>
            </div>
          </div>
        </div>
      </a>
    );
  }
}
