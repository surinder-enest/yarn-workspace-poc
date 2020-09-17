import { StyleModel } from './Style.model';
import { APIVideo } from '../interfaces';
import { VIDEO_SOURCE } from '../enums';
import { MEDIA_LINK_TYPE } from '../enums/MediaLinkType.enum';
import { Regex, Utility } from '../utilities';

export class VideoModel {
  isDefaultMedia?: boolean;
  styles: StyleModel;
  url: string;
  videoSourceType: string;
  isVideoButton: boolean;
  buttonText: string;
  buttonStyles: StyleModel;
  iframe: string;

  constructor(data?: VideoModel) {
    this.styles = data?.styles || new StyleModel();
    this.isDefaultMedia = data?.isDefaultMedia || false;
    this.url = data?.url || '';
    this.videoSourceType = data?.videoSourceType || '';
    this.isVideoButton = data?.isVideoButton || false;
    this.buttonText = data?.buttonText || '';
    this.buttonStyles = data?.buttonStyles || new StyleModel();
    this.iframe = data?.iframe || '';
  }

  static deserialize(apiModel: APIVideo): VideoModel {
    const data: VideoModel = {
      styles: StyleModel.deserialize(apiModel?.Style),
      url: apiModel?.Url,
      videoSourceType: apiModel?.VideoSourceType,
      isVideoButton: apiModel?.VideoShowType === "Button",
      buttonText: apiModel?.ButtonText,
      buttonStyles: StyleModel.deserializeButtonStyles(apiModel?.Style?.Button),
      iframe: VideoModel.deserializeIframe(apiModel)
    };
    return new VideoModel(data);
  }

  static deserializeIframe(apiModel: APIVideo): string {
    const { LinkType, Url } = apiModel;
    debugger
    switch (apiModel?.VideoSourceType) {
      case VIDEO_SOURCE.YOU_TUBE:
        switch (LinkType) {
          case MEDIA_LINK_TYPE.URL:
            const youtubeId = Url?.trim()?.match(Regex.youtubeUrl) ? RegExp.$1 : '';
            if (youtubeId) {
              const embedUrl = Utility.getYoutubeEmbedUrl(youtubeId);
              return `<iframe style="height:100%;border:0;width:100%;position:absolute;left:0" src="${embedUrl.trim()}?rel=0"></iframe>`
            }
            break;
          case MEDIA_LINK_TYPE.EMBED_CODE:
            const embedCode = Url?.trim()?.match(Regex.frameSourceValue) ? RegExp.$1 : '';
            return embedCode ? Url : '';
        }
        break;
    }
    return "";
  }
}
