import React, { Component } from 'react';
import { BuilderElementModel } from '../../models';

interface Props {
  builderElement: BuilderElementModel;
}

export default class Title extends Component<Props> {
  render() {
    const { text, styles } = this.props.builderElement.title; 
    return <div style={styles} dangerouslySetInnerHTML={{ __html: text }} />
  }
}
