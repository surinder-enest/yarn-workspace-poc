import React, { Component, ReactNode } from 'react';
import config from '../../../config';
import { BUILDER_ELEMENTS, DOWNLOAD_LAYOUT } from '../../../enums';
import { ContactModel, DownloadModel } from '../../../models';
import { ResponseCapture } from '../ResponseElement';

interface Props {
  download: DownloadModel;
  responseCapture: Function;
  isActualRendering: boolean;
  contact: ContactModel;
}

declare global {
  interface Window {
    HTMLElement: any;
    safari: any;
  }
}

export default class Download extends Component<Props> {
  private imageEmptyPlaceholderUrl: string = `${config.APP_ENDPOINT}images/download-placeholder.svg`;

  private getMinHeightWithLayoutType(): string {
    switch (this.props.download.layout) {
      case DOWNLOAD_LAYOUT.BLANK:
        return 'unset';
      default:
        return '300px';
    }
  }

  private getWidthWithLayoutType(): string {
    switch (this.props.download.layout) {
      case DOWNLOAD_LAYOUT.BLANK:
        return 'auto';
      default:
        return '347px';
    }
  }

  private getResponseMiddleHtml(): ReactNode {
    const { download, isActualRendering, contact } = this.props;
    return (
      <div
        style={{
          display: 'table-cell',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          backgroundPosition: 'center center',
          width: this.getWidthWithLayoutType(),
          padding: '10px',
          verticalAlign: 'middle',
          marginTop: '0px',
          marginBottom: '0px',
        }}
      >
        <ResponseCapture
          builderElementType={BUILDER_ELEMENTS.DOWNLOAD}
          isActualRendering={isActualRendering}
          elementDetail={download.elementDetail}
          contact={contact}
          responseCapture={(email: string, mobileNumber: string) => {
            this.props.responseCapture(email, mobileNumber);
          }}
        />
      </div>
    );
  }

  private getMediaHtml(): ReactNode {
    const { imageUrl, imageSize } = this.props.download;
    return (
      <div
        style={{
          display: 'table-cell',
          backgroundRepeat: 'no-repeat',
          backgroundSize: imageSize,
          backgroundPosition: 'center center',
          width: '50%',
          padding: '55px',
          verticalAlign: 'middle',
          backgroundImage: `url(${imageUrl || this.imageEmptyPlaceholderUrl})`,
        }}
      ></div>
    );
  }

  private getHtmlWithLayout(): ReactNode {
    switch (this.props.download.layout) {
      case DOWNLOAD_LAYOUT.IMAGE_LEFT:
        return (
          <>
            {this.getMediaHtml()}
            {this.getResponseMiddleHtml()}
          </>
        );
      case DOWNLOAD_LAYOUT.IMAGE_RIGHT:
        return (
          <>
            {this.getResponseMiddleHtml()}
            {this.getMediaHtml()}
          </>
        );
      default:
        return this.getResponseMiddleHtml();
    }
  }

  render() {
    const { elementStyle } = this.props.download;
    const minHeight = this.getMinHeightWithLayoutType();
    return (
      <div style={elementStyle}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'inherit',
            minHeight: 'inherit',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'table',
              margin: '0px auto',
              overflow: 'auto',
              width: '100%',
              minHeight,
            }}
          >
            <div style={{ display: 'table-row', minHeight }}>
              {this.getHtmlWithLayout()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}