import React, { Component } from 'react';
// import { getBorderClassForBuilderElement } from "../../../utility/common";

interface Props {
  title: string;
}

export default class Title extends Component<Props> {
  render() {
    // const { builderElement } = this.props;
    // const border = getBorderClassForBuilderElement(builderElement);
    return <div>{this.props.title}</div>;
  }
}
