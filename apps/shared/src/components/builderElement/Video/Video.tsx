import React, { Component } from 'react';
import { VideoModel } from '../../../models';
import PlaceHolder from '../PlaceHolder';

interface Props {
  video: VideoModel;
}

export default class Video extends Component<Props> {

  render() {
    const { styles, isDefaultMedia, isVideoButton, buttonStyles, buttonText, iframe } = this.props.video;
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
                  <div
                    className="video-middle-section"
                    style={{
                      width: '100%',
                      // height: '200px',
                    }}
                    dangerouslySetInnerHTML={{ __html: iframe }}
                  />
                </div>
          }
        </div>
      </div>
    </div>
  }
}
