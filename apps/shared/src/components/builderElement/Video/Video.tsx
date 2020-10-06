import React, { Component, ReactNode } from 'react';
import CustomPlayer from '../../CustomPlayer/CustomPlayer';
import { BUILDER_ELEMENTS, MEDIA_SOURCE_TYPE } from '../../../enums';
import { VideoModel } from '../../../models';

import PlaceHolder from '../PlaceHolder';

interface IProps {
  video: VideoModel;
  elementId: string;
  isActualRendering: boolean;
  responseCapture?: Function;
}

interface IState {
  playCount: number;
}

export default class Video extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      playCount: 0,
    };
  }

  private onPlay(isFromLibrary: boolean) {
    const { responseCapture } = this.props;
    const { playCount } = this.state;
    if (isFromLibrary && playCount === 1) {
      return;
    }
    if (isFromLibrary) {
      this.setState({ playCount: playCount + 1 });
    }

    if (typeof responseCapture === 'function') responseCapture();
  }

  private getVideoHtml(): ReactNode {
    const { elementId, video } = this.props;
    const { url, videoSourceType, iframe } = video;
    switch (videoSourceType) {
      case MEDIA_SOURCE_TYPE.YOU_TUBE:
      case MEDIA_SOURCE_TYPE.VIMEO:
      case MEDIA_SOURCE_TYPE.WISTIA:
        return (
          <div
            key={elementId}
            style={{
              width: '100%',
              height: '200px',
              paddingBottom: '56.15%',
            }}
            onClick={() => this.onPlay(false)}
            dangerouslySetInnerHTML={{ __html: iframe }}
          />
        );
      case MEDIA_SOURCE_TYPE.VIDEO_EMBED:
        return (
          <div key={elementId} dangerouslySetInnerHTML={{ __html: iframe }} />
        );
      case MEDIA_SOURCE_TYPE.FACEBOOK:
      case MEDIA_SOURCE_TYPE.SOUND_CLOUD:
        return (
          <CustomPlayer
            key={elementId}
            onStart={() => this.onPlay(false)}
            url={url}
            width="auto"
            height="auto"
          />
        );
      case MEDIA_SOURCE_TYPE.OTHERS:
        return (
          <video
            key={elementId}
            style={{ width: '100%' }}
            onPlay={() => this.onPlay(true)}
            controls
          >
            <source type="video/ogg" src={url} />
            <source type="video/m4v" src={url} />
            <source type="video/mp4" src={url} />
            <source type="video/youtube" src={url} />
          </video>
        );
      default:
        return <></>;
    }
  }

  render() {
    const { isActualRendering, video } = this.props;
    const {
      styles,
      isDefaultMedia,
      isButton,
      buttonStyles,
      buttonText,
    } = video;
    return (
      <div style={{ textAlign: 'center', overflow: 'hidden' }}>
        <div style={styles}>
          <div
            style={{
              position: 'relative',
              textAlign: 'center',
              minHeight: 'inherit',
              paddingTop: '10px',
              paddingBottom: '10px',
            }}
          >
            {isDefaultMedia ? (
              <PlaceHolder
                builderElementType={BUILDER_ELEMENTS.VIDEO}
                text="Select Video"
              />
            ) : isButton && !isActualRendering ? (
              <div style={buttonStyles} className="btn-builder">
                {buttonText}
              </div>
            ) : (
              <div style={{ display: 'block', position: 'relative' }}>
                {this.getVideoHtml()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
