import React, { Component } from 'react';
import { LinkModel } from '../../../models';
import { Regex } from '../../../utilities';

interface Props {
  link: LinkModel;
}

export default class Link extends Component<Props> {
  private getLinkUrl(url: string): string {
    if (!Regex.httpProtocolRegex.test(url)) {
      return `http://${url}`;
    }
    return url;
  }

  render() {
    const { text, elementStyle, style, url } = this.props.link;
    return (
      <a href={this.getLinkUrl(url)} style={elementStyle} target="_blank">
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
