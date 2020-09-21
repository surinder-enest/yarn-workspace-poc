import { StyleModel } from './Style.model';
import { APIVideo } from '../../interfaces';
import { MEDIA_SOURCE_TYPE, MEDIA_LINK_TYPE, BUTTON_SHOW_TYPE } from '../../enums';
import { Utility } from '../../utilities';

export class VideoModel {
  isDefaultMedia?: boolean;
  styles: StyleModel;
  url: string;
  videoSourceType: string;
  isButton: boolean;
  buttonText: string;
  buttonStyles: StyleModel;
  iframe: string;

  constructor(data?: VideoModel) {
    this.styles = data?.styles || new StyleModel();
    this.isDefaultMedia = data?.isDefaultMedia || false;
    this.url = data?.url || '';
    this.videoSourceType = data?.videoSourceType || '';
    this.isButton = data?.isButton || false;
    this.buttonText = data?.buttonText || '';
    this.buttonStyles = data?.buttonStyles || new StyleModel();
    this.iframe = data?.iframe || '';
  }

  static deserialize(apiModel: APIVideo): VideoModel {
    const data: VideoModel = {
      styles: StyleModel.deserialize(apiModel?.Style),
      url: apiModel?.Url?.replace(/\n/g, ''),
      videoSourceType: apiModel?.VideoSourceType,
      isButton: apiModel?.VideoShowType === BUTTON_SHOW_TYPE.BUTTON,
      buttonText: apiModel?.ButtonText,
      buttonStyles: StyleModel.deserializeButtonStyles(apiModel?.Style?.Button),
      iframe: VideoModel.deserializeIframe(apiModel)
    };
    return new VideoModel(data);
  }

  static getUrl(url: string, videoSourceType: string): string {
    switch (videoSourceType) {
      case MEDIA_SOURCE_TYPE.YOU_TUBE:
        return Utility.getYoutubeEmbedUrl(url);
      case MEDIA_SOURCE_TYPE.VIMEO:
        return Utility.getVimeoUrl(url);
      case MEDIA_SOURCE_TYPE.WISTIA:
        return Utility.getWistiaUrl(url);
      default:
        return url;
    }
  }

  static getEmbededUrl(url: string, videoSourceType: string): string {
    switch (videoSourceType) {
      case MEDIA_SOURCE_TYPE.WISTIA:
        const embedUrl = Utility.getEmbedWistiaUrl(url);
        return `<iframe style="height:100%;border:0;width:100%;position:absolute;left:0" src="${embedUrl.trim()}?rel=0"></iframe>`;
      default:
        return Utility.getFrameSourceValue(url) ? url : '';
    }
  }

  static deserializeIframe(apiModel: APIVideo): string {
    switch (apiModel?.LinkType) {
      case MEDIA_LINK_TYPE.URL:
      case MEDIA_LINK_TYPE.HTTP_STREAMING_FILE:
        const embedUrl = this.getUrl(apiModel?.Url?.trim(), apiModel?.VideoSourceType);
        return `<iframe style="height:100%;border:0;width:100%;position:absolute;left:0" src="${embedUrl.trim()}?rel=0"></iframe>`;
      case MEDIA_LINK_TYPE.EMBED_CODE:
      case MEDIA_LINK_TYPE.HOSTED_CODE:
        return this.getEmbededUrl(apiModel?.Url?.trim(), apiModel?.VideoSourceType);
    }
    return "";
  }
}
