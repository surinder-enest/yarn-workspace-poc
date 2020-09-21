import React, { Component } from 'react';
import { BUTTON_LINK_TYPE } from '../../../enums';
import { ButtonModel } from '../../../models';
import { Regex } from '../../../utilities';

interface Props {
  button: ButtonModel;
}

export default class Button extends Component<Props> {
  private geUrl(): string {
    const { type, value, redirectUrl } = this.props.button;
    switch (type) {
      case BUTTON_LINK_TYPE.LINK:
        if (!Regex.httpProtocolRegex.test(value)) {
          return `http://${value}`;
        }
        return value;
      case BUTTON_LINK_TYPE.CLICK_TO_CALL:
        return `tel:${value}`;
      case BUTTON_LINK_TYPE.EMAIL:
        return `mailto:${value}`;
      case BUTTON_LINK_TYPE.MOBILE_PAGE:
        return redirectUrl;
      default:
        return value;
    }
  }

  render() {
    const { text, elementStyle, style } = this.props.button;
    return (
      <a href={this.geUrl()} style={elementStyle} target="_blank">
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
