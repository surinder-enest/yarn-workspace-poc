import { BUILDER_ELEMENTS, BUTTON_LINK_TYPE } from '../../enums';
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

  static deserialize(apiModel: APIButtonElement, contactId: string, elementType: string): ButtonModel {
    const data: ButtonModel = {
      text: elementType === BUILDER_ELEMENTS.MOBILE_PAGE ? apiModel?.ButtonText : apiModel?.Text,
      url: ButtonModel.deserializeUrl(apiModel, contactId, elementType),
      elementStyle: new StyleModel({
        ...StyleModel.deserialize(apiModel?.Style),
        display: 'block',
        textAlign: 'center',
      }),
      style: StyleModel.deserializeButtonStyles(apiModel?.Style.Button),
    };
    return new ButtonModel(data);
  }

  static deserializeUrl(apiModel: APIButtonElement, contactId: string, elementType: string): string {
    switch (elementType) {
      case BUILDER_ELEMENTS.PHONE:
        return Utility.getValueWithClickType(BUTTON_LINK_TYPE.CLICK_TO_CALL, apiModel?.PhoneNumber?.toString(), "", "")
      case BUILDER_ELEMENTS.LINK:
        return Utility.getValueWithClickType(BUTTON_LINK_TYPE.LINK, apiModel?.URL, "", "")
      case BUILDER_ELEMENTS.MOBILE_PAGE:
        return apiModel?.PageURL
      default:
        return Utility.getValueWithClickType(apiModel?.Type, apiModel?.Value, apiModel?.RedirectUrl, contactId)
    }
  }
} 