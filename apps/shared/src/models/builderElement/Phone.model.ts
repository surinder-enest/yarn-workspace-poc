import { BUTTON_LINK_TYPE } from '../../enums';
import { APIPhone } from '../../interfaces';
import { Utility } from '../../utilities';
import { StyleModel } from './Style.model';

export class PhoneModel {
  text: string;
  url: string;
  style: StyleModel;
  elementStyle: StyleModel;

  constructor(data?: PhoneModel) {
    this.text = data?.text || '';
    this.url = data?.url || '';
    this.style = data?.style || new StyleModel();
    this.elementStyle = data?.elementStyle || new StyleModel();
  }

  static deserialize(apiModel: APIPhone): PhoneModel {
    const data: PhoneModel = {
      text: apiModel?.Text,
      url: Utility.getValueWithClickType(BUTTON_LINK_TYPE.CLICK_TO_CALL, apiModel?.PhoneNumber?.toString(), "", ""),
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
