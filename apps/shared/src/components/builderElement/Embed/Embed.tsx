import React, { Component } from 'react';
import { EmbedModel } from '../../../models';

interface Props {
  embed: EmbedModel;
}

export default class Embed extends Component<Props> {
  render() {
    const { text } = this.props.embed;
    return (
      <div
        style={{ wordBreak: 'break-word' }}
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      ></div>
    );
  }
}
