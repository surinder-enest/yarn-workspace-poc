import React, { Component, ReactNode } from 'react';
import { ParagraphModel } from '../../models';

interface Props {
  paragraph: ParagraphModel;
}

export default class Paragraph extends Component<Props> {
  private getParagraphText(): ReactNode {
    const { styles, rightText, leftText } = this.props.paragraph;
    return (
      <div style={styles}>
        {rightText ? (
          <div style={{ display: 'flex', overflowWrap: 'break-word' }}>
            <div
              style={{ width: '50%', paddingRight: '5px' }}
              dangerouslySetInnerHTML={{ __html: leftText }}
            />
            <div
              style={{ width: '50%', paddingLeft: '5px' }}
              dangerouslySetInnerHTML={{ __html: rightText }}
            />
          </div>
        ) : (
            <div dangerouslySetInnerHTML={{ __html: leftText }} />
          )}
      </div>
    );
  }

  render() {
    return this.getParagraphText();
  }
}
