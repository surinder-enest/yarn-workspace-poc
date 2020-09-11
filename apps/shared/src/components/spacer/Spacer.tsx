import React, { Component } from 'react';
import { BuilderElementModel } from '../../models';

interface Props {
  builderElement: BuilderElementModel;
}

export default class Spacer extends Component<Props> {
  render() {
    const { styles } = this.props.builderElement.spacer;
    return <div style={styles}></div>;
  }
}
