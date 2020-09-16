import React, { Component } from 'react';
import { DividerModel } from '../../../models';

interface Props {
  divider: DividerModel;
}

export default class Divider extends Component<Props> {
  render() {
    const { styles, elementStyles } = this.props.divider;
    return (
      <div style={elementStyles}>
        <div style={styles}></div>
      </div>
    );
  }
}
