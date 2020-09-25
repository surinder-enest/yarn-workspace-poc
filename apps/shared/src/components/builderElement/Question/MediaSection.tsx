import React, { Component, ReactNode } from 'react';
import { MediaTypeModel } from '../../../models';
import { MEDIA_TYPE } from '../../../enums';
interface Props {
  media: MediaTypeModel;
}

export default class MediaSection extends Component<Props> {
  private getMedia = (): ReactNode => {
    const { source, size, url } = this.props.media;

    switch (source) {
      case MEDIA_TYPE.IMAGE:
        return <img src={url} style={{ width: size, paddingBottom: '10px' }} />;
      case MEDIA_TYPE.VIDEO:
        return <div>Video</div>;
      default:
        return '';
    }
  };

  render() {
    return this.getMedia();
  }
}
