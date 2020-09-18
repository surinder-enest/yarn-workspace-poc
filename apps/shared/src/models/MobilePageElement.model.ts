import { APIMobilePageElement } from '../interfaces';
import { StyleModel } from './Style.model';

export class MobilePageElementModel {
  buttonText: string;
  pageUrl: string;
  style: StyleModel;
  elementStyle: StyleModel;

  constructor(data?: MobilePageElementModel) {
    this.buttonText = data?.buttonText || '';
    this.pageUrl = data?.pageUrl || '';
    this.style = data?.style || new StyleModel();
    this.elementStyle = data?.elementStyle || new StyleModel();
  }

  static deserialize(apiModel: APIMobilePageElement): MobilePageElementModel {
    const data: MobilePageElementModel = {
      buttonText: apiModel?.ButtonText,
      pageUrl: apiModel?.PageURL,
      elementStyle: new StyleModel({
        ...StyleModel.deserialize(apiModel?.Style),
        display: 'block',
        textAlign: 'center',
      }),
      style: StyleModel.deserializeButtonStyles(apiModel?.Style.Button),
    };
    return new MobilePageElementModel(data);
  }
}
