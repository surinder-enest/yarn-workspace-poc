import React, { Component } from 'react';

interface Props {
  description: string;
}

export default class Paragraph extends Component<Props> {
  render() {
    return <div>{this.props.description}</div>;
  }
}
