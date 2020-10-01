import React, { Component, ReactNode } from 'react';
import config from '../../../config';
import { BUILDER_ELEMENTS, BUTTON_SHOW_TYPE } from '../../../enums';
import { AudioModel } from '../../../models';
import PlaceHolder from '../PlaceHolder';

interface IProps {
  audio: AudioModel;
  elementId: string;
  isActualRendering: boolean;
  responseCapture: Function;
}

interface IState {
  isShowAudio: boolean;
}

export default class Audio extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isShowAudio: false,
    };
  }

  private onPlay() {
    this.props.responseCapture();
  }

  private showAudio() {
    this.setState({ isShowAudio: true });
  }

  private getAudioHtml(): ReactNode {
    const { elementId, audio, isActualRendering } = this.props;
    return (
      <>
        <div
          style={{
            margin: '0px',
            background: '#d2e4f8',
            maxHeight: '100%',
            border: 'none',
            padding: '78px 40px 77px 40px',
          }}
        >
          <div style={{ padding: 0, textAlign: 'center' }}>
            <i
              style={{
                background: `url(${config.APP_ENDPOINT}images/Audio-grey-small.svg) no-repeat`,
                padding: '4px 18px',
                backgroundSize: '35px 40px',
                fontSize: '30px',
                position: 'relative',
                top: '0px',
              }}
            ></i>
          </div>
        </div>
        {isActualRendering ? (
          <div style={{ margin: 0 }}>
            <div
              style={{
                padding: 0,
                textAlign: 'center',
                backgroundColor: '#eeeeee',
                width: '100%',
              }}
            >
              <audio
                id={elementId}
                style={{ width: '100%', display: 'inline-block' }}
                onPlay={() => this.onPlay()}
                controls
              >
                <source src={audio.url} type="audio/wav" />
                <source src={audio.url} type="audio/mp3" />
                <source src={audio.url} type="audio/ogg" />
              </audio>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }

  private getAudioHtmlWithShowType(): ReactNode {
    const {
      buttonStyles,
      styles,
      showType,
      buttonText,
      imageUrl,
    } = this.props.audio;
    const { width } = styles;
    const { isShowAudio } = this.state;
    switch (showType) {
      case BUTTON_SHOW_TYPE.DEFAULT:
        return this.getAudioHtml();
      case BUTTON_SHOW_TYPE.BUTTON:
        return (
          <>
            {isShowAudio ? (
              this.getAudioHtml()
            ) : (
              <div style={buttonStyles} onClick={() => this.showAudio()}>
                {buttonText}
              </div>
            )}
          </>
        );
      case BUTTON_SHOW_TYPE.IMAGE:
        return (
          <>
            {isShowAudio ? (
              this.getAudioHtml()
            ) : (
              <img
                src={`${imageUrl}?${Date.now()}`}
                onClick={() => this.showAudio()}
                style={{
                  width,
                  margin: '0 auto',
                  position: 'relative',
                }}
              />
            )}
          </>
        );
    }
    return <></>;
  }

  render() {
    const { isDefaultMedia, styles } = this.props.audio;
    return (
      <div style={styles}>
        <div
          style={{
            position: 'relative',
            textAlign: 'center',
            minHeight: 'inherit',
          }}
        >
          {isDefaultMedia ? (
            <PlaceHolder
              builderElementType={BUILDER_ELEMENTS.AUDIO}
              text="Select Audio"
            />
          ) : (
            this.getAudioHtmlWithShowType()
          )}
        </div>
      </div>
    );
  }
}
