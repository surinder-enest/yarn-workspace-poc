import React, { Component, ReactNode } from 'react';
import { VIDEO_SOURCE } from '../../../enums';
import { BuilderElementModel } from '../../../models';
import { BuilderElementService } from '../../../services';
import { CustomPlayer } from '../../Common';
import PlaceHolder from '../PlaceHolder';

interface IProps {
  builderElement: BuilderElementModel;
  moduleId: string;
  contactId: string;
  accountId: string;
  responseCapturedFromModule: string;
  isActualRendering: boolean;
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
    const {
      moduleId,
      contactId,
      accountId,
      responseCapturedFromModule,
      builderElement,
      isActualRendering
    } = this.props;
    const { playCount } = this.state;
    if (isActualRendering || (isFromLibrary && playCount === 1)) {
      return;
    }
    if (isFromLibrary) {
      this.setState({ playCount: playCount + 1 });
    }

    return BuilderElementService.saveBuilderElementResponse(
      builderElement,
      moduleId,
      contactId,
      accountId,
      responseCapturedFromModule
    );
  }

  private getVideoHtml(): ReactNode {
    const { id, video } = this.props.builderElement;
    const { url, videoSourceType, iframe } = video;
    switch (videoSourceType) {
      case VIDEO_SOURCE.YOU_TUBE:
      case VIDEO_SOURCE.VIMEO:
      case VIDEO_SOURCE.WISTIA:
        return <div key={id}
          className="video-middle-section"
          style={{
            width: '100%',
            height: '200px',
            paddingBottom: "56.15%"
          }}
          onClick={() => this.onPlayVideo(false)}
          dangerouslySetInnerHTML={{ __html: iframe }}
        />
      case VIDEO_SOURCE.VIDEO_EMBED:
        return <div key={id}
          dangerouslySetInnerHTML={{ __html: iframe }}
        />
      case VIDEO_SOURCE.FACEBOOK:
      case VIDEO_SOURCE.SOUND_CLOUD:
        return <CustomPlayer key={id}
          onStart={() => this.onPlayVideo(false)}
          url={url}
          width="auto"
          height="auto" />;
      case VIDEO_SOURCE.OTHERS:
        return <video
          key={id}
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
    const { styles, isDefaultMedia, isVideoButton, buttonStyles, buttonText } = this.props.builderElement.video;
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
