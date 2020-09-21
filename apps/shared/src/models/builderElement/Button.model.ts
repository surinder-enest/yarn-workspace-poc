import { APIButtonElement } from '../../interfaces';
import { StyleModel } from './Style.model';

export class ButtonModel {
  text: string;
  type: string;
  value: string;
  redirectUrl: string;
  style: StyleModel;
  elementStyle: StyleModel;

  constructor(data?: ButtonModel) {
    this.text = data?.text || '';
    this.type = data?.type || '';
    this.value = data?.value || '';
    this.redirectUrl = data?.redirectUrl || '';
    this.style = data?.style || new StyleModel();
    this.elementStyle = data?.elementStyle || new StyleModel();
  }

  static deserialize(apiModel: APIButtonElement): ButtonModel {
    const data: ButtonModel = {
      text: apiModel?.Text,
      type: apiModel?.Type,
      value: apiModel?.Value,
      redirectUrl: apiModel?.RedirectUrl,
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
