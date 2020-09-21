import { APIButtonElement } from '../../interfaces';
import { Utility } from '../../utilities';
import { StyleModel } from './Style.model';

export class ButtonModel {
  text: string;
  url: string;
  style: StyleModel;
  elementStyle: StyleModel;

  constructor(data?: ButtonModel) {
    this.text = data?.text || '';
    this.url = data?.url || '';
    this.style = data?.style || new StyleModel();
    this.elementStyle = data?.elementStyle || new StyleModel();
  }

  static deserialize(apiModel: APIButtonElement, contactId: string): ButtonModel {
    const data: ButtonModel = {
      text: apiModel?.Text,
      url: Utility.getValueWithClickType(apiModel?.Type, apiModel?.Value, apiModel?.RedirectUrl, contactId),
      elementStyle: new StyleModel({
        ...StyleModel.deserialize(apiModel?.Style),
        display: 'block',
        textAlign: 'center',
      }),
      style: StyleModel.deserializeButtonStyles(apiModel?.Style.Button),
    };
    return new ButtonModel(data);
  }
}
