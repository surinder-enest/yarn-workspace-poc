import React, { Component } from 'react';
import { PhoneModel } from '../../../models';

interface Props {
  phone: PhoneModel;
}

export default class Phone extends Component<Props> {
  render() {
    const { text, elementStyle, style, phoneNumber } = this.props.phone;
    const btnActionValueHref = `tel:${phoneNumber}`;
    return (
      <a href={btnActionValueHref} style={elementStyle} target="_blank">
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
