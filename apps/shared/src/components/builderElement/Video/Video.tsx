import React, { Component, ReactNode } from 'react';
import { VIDEO_SOURCE } from '../../../enums';
import { VideoModel } from '../../../models';
import { CustomPlayer } from '../../Common';
import PlaceHolder from '../PlaceHolder';

interface IProps {
  video: VideoModel;
  elementId: string;
  isActualRendering: boolean;
  responseCapture: Function;
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

  private onPlayVideo(isFromLibrary: boolean) {
    const { isActualRendering, responseCapture } = this.props;
    const { playCount } = this.state;
    if (isActualRendering || (isFromLibrary && playCount === 1)) {
      return;
    }
    if (isFromLibrary) {
      this.setState({ playCount: playCount + 1 });
    }
    responseCapture();
  }

  private getVideoHtml(): ReactNode {
    const { elementId, video } = this.props;
    const { url, videoSourceType, iframe } = video;
    switch (videoSourceType) {
      case VIDEO_SOURCE.YOU_TUBE:
      case VIDEO_SOURCE.VIMEO:
      case VIDEO_SOURCE.WISTIA:
        return <div key={elementId}
          style={{
            width: '100%',
            height: '200px',
            paddingBottom: "56.15%"
          }}
          onClick={() => this.onPlayVideo(false)}
          dangerouslySetInnerHTML={{ __html: iframe }}
        />
      case VIDEO_SOURCE.VIDEO_EMBED:
        return <div key={elementId}
          dangerouslySetInnerHTML={{ __html: iframe }}
        />
      case VIDEO_SOURCE.FACEBOOK:
      case VIDEO_SOURCE.SOUND_CLOUD:
        return <CustomPlayer key={elementId}
          onStart={() => this.onPlayVideo(false)}
          url={url}
          width="auto"
          height="auto" />;
      case VIDEO_SOURCE.OTHERS:
        return <video
          key={elementId}
          style={{ width: '100%' }}
          onPlay={() => this.onPlayVideo(true)}
          controls>
          <source type="video/ogg" src={url} />
          <source type="video/m4v" src={url} />
          <source type="video/mp4" src={url} />
          <source type="video/youtube" src={url} />
        </video>;
      default:
        return <></>;
    }
  }

  render() {
    const { isActualRendering, video } = this.props;
    const { styles, isDefaultMedia, isButton, buttonStyles, buttonText } = video;
    return <div style={{ textAlign: 'center', overflow: "hidden" }}>
      <div style={styles}>
        <div style={{ position: 'relative', textAlign: 'center', minHeight: 'inherit' }}>
          {
            isDefaultMedia
              ? <PlaceHolder text="Select Video" />
              : isButton && !isActualRendering
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
