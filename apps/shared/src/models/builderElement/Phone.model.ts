import { APIPhone } from '../../interfaces';
import { StyleModel } from './Style.model';

export class PhoneModel {
  text: string;
  phoneNumber: number;
  style: StyleModel;
  elementStyle: StyleModel;
  constructor(data?: PhoneModel) {
    this.text = data?.text || '';
    this.phoneNumber = data?.phoneNumber || 0;
    this.style = data?.style || new StyleModel();
    this.elementStyle = data?.elementStyle || new StyleModel();
  }

  static deserialize(apiModel: APIPhone): PhoneModel {
    const data: PhoneModel = {
      text: apiModel?.Text,
      phoneNumber: apiModel?.PhoneNumber,
      elementStyle: new StyleModel({
        ...StyleModel.deserialize(apiModel?.Style),
        display: 'block',
        textAlign: 'center',
      }),
      style: StyleModel.deserializeButtonStyles(apiModel?.Style.Button),
    };
    return new PhoneModel(data);
  }
}
