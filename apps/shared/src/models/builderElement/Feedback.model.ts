import { APIResponseElement } from '../../interfaces';
import { MediaModel } from './MediaModel';
import { ResponseElementModel } from './ResponseElement.model';
import { StyleModel } from './Style.model';

export class FeedbackModel {
  style: StyleModel;
  media: MediaModel;
  responseDetail: ResponseElementModel;

  constructor(data?: FeedbackModel) {
    this.responseDetail = data?.responseDetail || new ResponseElementModel();
    this.style = data?.style || new StyleModel();
    this.media = data?.media || new MediaModel();
  }

  static deserialize(apiModel: APIResponseElement): FeedbackModel {
    const data: FeedbackModel = {
      style: new StyleModel({
        ...StyleModel.deserialize(apiModel?.Style),
        display: 'block',
        textAlign: 'center',
      }),
      media: MediaModel.deserialize(apiModel?.Style.Media),
      responseDetail: ResponseElementModel.deserialize(apiModel),
    };
    return new FeedbackModel(data);
  }
}
