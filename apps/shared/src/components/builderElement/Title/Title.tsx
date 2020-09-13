import React, { Component } from 'react';
import { TitleModel } from '../../../models';

interface Props {
  title: TitleModel;
}

export default class Title extends Component<Props> {
  render() {
    const { text, styles } = this.props.title;
    return <div style={styles} dangerouslySetInnerHTML={{ __html: text }} />
  }
}
