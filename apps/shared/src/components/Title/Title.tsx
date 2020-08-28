import React, { Component } from 'react';

interface Props {
  builderElement: any;
}

export default class Title extends Component<Props> {
  render() { 
    const innerHtml = this.props?.builderElement?.title?.text;
    return <div>
      <div dangerouslySetInnerHTML={{ __html: innerHtml }} />
    </div>
  }
}
