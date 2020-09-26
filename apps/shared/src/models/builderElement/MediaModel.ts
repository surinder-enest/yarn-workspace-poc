import { APIMedia } from '../../interfaces';

export class MediaModel {
  size: string;
  videoSourceType: string;
  source: string;
  url: string;
  constructor(data?: MediaModel) {
    this.size = data?.size || '';
    this.videoSourceType = data?.videoSourceType || '';
    this.source = data?.source || '';
    this.url = data?.url || '';
  }

  static deserialize(apiModel: APIMedia): MediaModel {
    const data: MediaModel = {
      size: apiModel?.Size,
      videoSourceType: apiModel?.VideoSourceType,
      source: apiModel?.Source,
      url: apiModel?.Url,
    };
    return new MediaModel(data);
  }
}
