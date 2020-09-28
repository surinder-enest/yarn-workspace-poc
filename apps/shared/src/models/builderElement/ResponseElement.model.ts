import {
  APIResponse,
  APIResponseElement,
  APIResponseStyles,
} from '../../interfaces';
import { CONTACT_FIELD_OPTION } from '../../enums';
import { StyleModel } from './Style.model';
import { ContactModel } from '../MobilePage.model';

export class ResponseElementModel {
  contactFieldType: string;
  options: Array<ResponseOptionModel>;
  optionStyle: StyleModel;
  optionLabelStyle: StyleModel;
  buttonText: string;
  buttonStyle: StyleModel;
  contact: ContactModel;
  thankYouMessage: string;

  constructor(data?: ResponseElementModel) {
    this.contactFieldType = data?.contactFieldType || '';
    this.options = data?.options || [];
    this.optionStyle = data?.optionStyle || new StyleModel();
    this.optionLabelStyle = data?.optionLabelStyle || new StyleModel();
    this.buttonText = data?.buttonText || '';
    this.buttonStyle = data?.buttonStyle || new StyleModel();
    this.contact = data?.contact || new ContactModel();
    this.thankYouMessage = data?.thankYouMessage || '';
  }

  static deserialize(apiModel: APIResponseElement): ResponseElementModel {
    const data: ResponseElementModel = {
      buttonText: apiModel?.RespondButtonText,
      buttonStyle: new StyleModel({
        ...StyleModel.deserializeButtonStyles(apiModel?.Style.ResponseStyles),
        marginTop: '15px',
        position: 'relative',
      }),
      contactFieldType: apiModel?.ContactInformation?.RequireEmailOnly
        ? CONTACT_FIELD_OPTION.EMAIL_ONLY
        : apiModel?.ContactInformation?.RequireMobileOnly
        ? CONTACT_FIELD_OPTION.MOBILE_ONLY
        : CONTACT_FIELD_OPTION.EMAIL_AND_MOBILE,
      options: ResponseOptionModel.deserializeList(apiModel?.ResponseDetail),
      optionStyle: ResponseElementModel.deserializeOptionStyles(
        apiModel?.Style?.ResponseStyles
      ),
      optionLabelStyle: ResponseElementModel.deserializeOptionLabelStyles(
        apiModel?.Style?.ResponseStyles
      ),
      contact: new ContactModel(),
      thankYouMessage: apiModel?.ThankYouMessage,
    };
    return new ResponseElementModel(data);
  }

  static deserializeOptionStyles(apiOption?: APIResponseStyles): StyleModel {
    const data: StyleModel = {
      background: apiOption?.OptionBackgroundColor?.HexValue,
      paddingTop: '12px',
      width: '100%',
      float: 'left',
      borderRadius: '100px',
      paddingBottom: '12px',
      marginTop: '5px',
      backgroundColor: '#57AC2D',
    };
    return new StyleModel(data);
  }

  static deserializeOptionLabelStyles(
    apiOption?: APIResponseStyles
  ): StyleModel {
    const data: StyleModel = {
      color: apiOption?.OptionTextColor?.HexValue,
      marginTop: '0px',
      marginBottom: '0px',
      marginLeft: '0px',
      marginRight: '0px',
      display: 'block',
      minHeight: '15px',
    };
    return new StyleModel(data);
  }
}

export class ResponseOptionModel {
  id: string;
  text: string;
  thankYouMessage: string;

  constructor(data?: ResponseOptionModel) {
    this.id = data?.id || '';
    this.text = data?.text || '';
    this.thankYouMessage = data?.thankYouMessage || '';
  }

  static deserialize(apiModel: APIResponse): ResponseOptionModel {
    const data: ResponseOptionModel = {
      id: apiModel?.Id,
      text: apiModel?.Text,
      thankYouMessage: apiModel?.ThankYouMessage,
    };
    return new ResponseOptionModel(data);
  }

  static deserializeList(apiList: APIResponse[]): ResponseOptionModel[] {
    return apiList
      ? apiList.map((apiResponse: APIResponse) => {
          return ResponseOptionModel.deserialize(apiResponse);
        })
      : [];
  }
}
