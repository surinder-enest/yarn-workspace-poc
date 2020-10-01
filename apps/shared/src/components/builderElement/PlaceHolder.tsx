import React, { Component, ReactNode } from 'react';
import { BUILDER_ELEMENTS } from '../../enums';

interface Props {
  text: string;
  builderElementType: string;
}

export default class PlaceHolder extends Component<Props> {
  private getElementIcon(builderElementType: string): ReactNode {
    switch (builderElementType) {
      case BUILDER_ELEMENTS.VIDEO:
        return <i className="video-icon" />;
      case BUILDER_ELEMENTS.IMAGE:
        return <i className="gallery-images" />;
      case BUILDER_ELEMENTS.AUDIO:
        return <i className="audio-blue-image" />;
      case BUILDER_ELEMENTS.OFFER:
        return (
          <img src="https://staging.mindmemobile.com/images/offer-unavailable.svg" />
        );
    }
    return <></>;
  }

  render() {
    const { text, builderElementType } = this.props;
    return (
      <div
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
          minHeight: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          WebkitBoxAlign: 'center',
          WebkitBoxPack: 'center',
        }}
      >
        <div
          style={{
            paddingTop: '20px',
            paddingBottom: '15px',
            textAlign: 'center',
          }}
        >
          {this.getElementIcon(builderElementType)}
          <div
            style={{
              color: '#789bb6',
              marginBottom: 0,
            }}
          >
            {text}
          </div>
        </div>
      </div>
    );
  }
}
