import React, { Component } from 'react';
import { LinkModel } from '../../../models';

interface Props {
  link: LinkModel;
  responseCapture: Function;
}

export default class Link extends Component<Props> {

  private onClick() {
    this.props.responseCapture();
  }

  render() {
    const { text, elementStyle, style, url } = this.props.link;
    return (
      <a href={url} style={elementStyle} target="_blank" onClick={() => this.onClick()}>
        <div style={{ display: 'table', width: '100%', minHeight: 'inherit' }}>
          <div style={{ display: 'table-row', minHeight: 'inherit' }}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
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
