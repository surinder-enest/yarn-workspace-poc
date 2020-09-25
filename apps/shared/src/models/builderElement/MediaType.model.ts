import { APIMedia } from '../../interfaces';

export class MediaTypeModel {
  size: string;
  videoSourceType: string;
  source: string;
  url: string;
  constructor(data?: MediaTypeModel) {
    this.size = data?.size || '';
    this.videoSourceType = data?.videoSourceType || '';
    this.source = data?.source || '';
    this.url = data?.url || '';
  }

  static deserialize(apiModel: APIMedia): MediaTypeModel {
    const data: MediaTypeModel = {
      size: apiModel?.Size,
      videoSourceType: apiModel?.VideoSourceType,
      source: apiModel?.Source,
      url: apiModel?.Url,
    };
    return new MediaTypeModel(data);
  }
}
