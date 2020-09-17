import React, { Component, ReactNode } from 'react';
import { VIDEO_SOURCE } from '../../../enums';
import { VideoModel } from '../../../models';
import { CustomPlayer } from '../../Common';
import PlaceHolder from '../PlaceHolder';

interface Props {
  elementId: string;
  video: VideoModel;
}

export default class Video extends Component<Props> {

  private getVideoHtml(): ReactNode {
    const { elementId, video } = this.props;
    const { url, videoSourceType, iframe } = video;
    debugger
    switch (videoSourceType) {
      case VIDEO_SOURCE.YOU_TUBE:
      case VIDEO_SOURCE.VIMEO:
      case VIDEO_SOURCE.WISTIA:
      case VIDEO_SOURCE.VIDEO_EMBED:
        return <div key={elementId}
          className="video-middle-section"
          style={{
            width: '100%',
            height: '200px',
          }}
          dangerouslySetInnerHTML={{ __html: iframe }}
        />
      case VIDEO_SOURCE.FACEBOOK:
      case VIDEO_SOURCE.SOUND_CLOUD:
        return <CustomPlayer key={elementId}
          url={url}
          width="auto"
          height="auto" />;
      default:
        return <video
          key={elementId}
          style={{ width: '100%' }}
          controls>
          <source type="video/ogg" src={url} />
          <source type="video/m4v" src={url} />
          <source type="video/mp4" src={url} />
          <source type="video/youtube" src={url} />
        </video>;
    }
  }

  render() {
    const { styles, isDefaultMedia, isVideoButton, buttonStyles, buttonText } = this.props.video;
    return <div style={{ textAlign: 'center' }}>
      <div style={styles}>
        <div style={{ position: 'relative', textAlign: 'center', minHeight: 'inherit' }}>
          {
            isDefaultMedia
              ? <PlaceHolder text="Select Video" />
              : isVideoButton
                ? <div style={buttonStyles} className="btn-builder">
                  {buttonText}
                </div>
                : <div style={{ display: 'block', position: 'relative' }}>
                  {this.getVideoHtml()}
                </div>
          }
        </div>
      </div>
    </div>
  }
}
