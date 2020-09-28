import { APIMedia } from '../../interfaces';
import { StyleModel } from './Style.model';
import { VideoModel } from './Video.model';

export class MediaModel {
  source: string;
  url: string;
  iframe: string;
  videoSourceType: string;
  imageStyle: StyleModel;

  constructor(data?: MediaModel) {
    this.source = data?.source || '';
    this.url = data?.url || '';
    this.iframe = data?.iframe || '';
    this.videoSourceType = data?.videoSourceType || '';
    this.imageStyle = data?.imageStyle || new StyleModel();
  }

  static deserialize(apiModel: APIMedia): MediaModel {
    const data: MediaModel = {
      source: apiModel?.Source,
      url: apiModel?.Url,
      iframe: VideoModel.deserializeIframe(apiModel?.SourceLinkType, apiModel?.Url, apiModel?.VideoSourceType),
      videoSourceType: apiModel?.VideoSourceType,
      imageStyle: new StyleModel({
        width: apiModel?.Size,
        paddingBottom: '10px'
      }),
    };
    return new MediaModel(data);
  }
}
