import React, { Component, ReactNode } from 'react';
import { MediaModel } from '../../../models';
import {
  BUILDER_ELEMENTS,
  MEDIA_SOURCE_TYPE,
  MEDIA_TYPE,
} from '../../../enums';
import { CustomPlayer } from '../../Common';

interface Props {
  builderElementType: string;
  media: MediaModel;
}

export default class Media extends Component<Props> {
  private getVideoHtml(): ReactNode {
    const { url, videoSourceType, iframe, style } = this.props.media;
    const paddingBottom =
      this.props.builderElementType !== BUILDER_ELEMENTS.OFFER ? '10px' : '0px';
    switch (videoSourceType) {
      case MEDIA_SOURCE_TYPE.YOU_TUBE:
      case MEDIA_SOURCE_TYPE.VIMEO:
      case MEDIA_SOURCE_TYPE.WISTIA:
      case MEDIA_SOURCE_TYPE.VIDEO_EMBED:
        return (
          <div style={style}>
            <div
              style={{
                paddingBottom,
                height: '385px',
                position: 'relative',
                width: '100%',
              }}
              dangerouslySetInnerHTML={{ __html: iframe }}
            />
          </div>
        );
      case MEDIA_SOURCE_TYPE.FACEBOOK:
      case MEDIA_SOURCE_TYPE.SOUND_CLOUD:
        return (
          <div style={style}>
            <div style={{ paddingBottom }}>
              <CustomPlayer url={url} width="auto" height="auto" />
            </div>
          </div>
        );
      case MEDIA_SOURCE_TYPE.OTHERS:
        return (
          <div style={style}>
            <div style={{ paddingBottom }}>
              <video controls style={{ width: '100%', height: 'auto' }}>
                <source type="video/ogg" src={url} />
                <source type="video/m4v" src={url} />
                <source type="video/mp4" src={url} />
                <source type="video/youtube" src={url} />
              </video>
            </div>
          </div>
        );
      default:
        return <></>;
    }
  }

  private getMedia = (): ReactNode => {
    const { source, url, imageStyle } = this.props.media;
    switch (source) {
      case MEDIA_TYPE.IMAGE:
        return (
          url && (
            <div style={this.props.media.style}>
              <img src={url} style={imageStyle} />
            </div>
          )
        );
      case MEDIA_TYPE.VIDEO:
        return this.getVideoHtml();
      default:
        return <></>;
    }
  };

  render() {
    return this.getMedia();
  }
}
