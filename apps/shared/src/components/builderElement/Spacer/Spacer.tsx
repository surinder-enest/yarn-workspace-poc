import React, { Component } from 'react';
import { SpacerModel } from '../../../models';

interface Props {
  spacer: SpacerModel;
}

export default class Spacer extends Component<Props> {
  render() {
    const { styles } = this.props.spacer;
    return <div style={styles}></div>;
  }
}
