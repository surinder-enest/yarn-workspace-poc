import { BUTTON_LINK_TYPE } from '../../enums';
import { APILink } from '../../interfaces';
import { Utility } from '../../utilities';
import { StyleModel } from './Style.model';

export class LinkModel {
  text: string;
  url: string;
  style: StyleModel;
  elementStyle: StyleModel;

  constructor(data?: LinkModel) {
    this.text = data?.text || '';
    this.url = data?.url || '';
    this.style = data?.style || new StyleModel();
    this.elementStyle = data?.elementStyle || new StyleModel();
  }

  static deserialize(apiModel: APILink): LinkModel {
    const data: LinkModel = {
      text: apiModel?.Text,
      url: Utility.getValueWithClickType(BUTTON_LINK_TYPE.LINK, apiModel?.URL, "", ""),
      elementStyle: new StyleModel({
        ...StyleModel.deserialize(apiModel?.Style),
        display: 'block',
        textAlign: 'center',
      }),
      style: StyleModel.deserializeButtonStyles(apiModel?.Style.Button),
    };
    return new LinkModel(data);
  }
}
