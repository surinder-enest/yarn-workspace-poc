import {
  APIContact,
  APIResponse,
  APIResponseElement,
  APIResponseStyles,
} from '../../interfaces';
import { CONTACT_FIELD_OPTION } from '../../enums';
import { StyleModel } from './Style.model';
import { MediaModel } from './MediaModel';

export class ResponseElementModel {
  title: string;
  description: string;
  style: StyleModel;
  media: MediaModel;
  contactFieldType: string;
  options: Array<ResponseOptionModel>;
  optionStyle: StyleModel;
  optionLabelStyle: StyleModel;
  buttonText: string;
  buttonStyle: StyleModel;
  thankYouMessage: string;
  fileUrl: string;
  fileName: string;
  password: string;
  isPasswordRequired: boolean;

  constructor(data?: ResponseElementModel) {
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.style = data?.style || new StyleModel();
    this.media = data?.media || new MediaModel();
    this.contactFieldType = data?.contactFieldType || '';
    this.options = data?.options || [];
    this.optionStyle = data?.optionStyle || new StyleModel();
    this.optionLabelStyle = data?.optionLabelStyle || new StyleModel();
    this.buttonText = data?.buttonText || '';
    this.buttonStyle = data?.buttonStyle || new StyleModel();
    this.thankYouMessage = data?.thankYouMessage || '';
    this.fileUrl = data?.fileUrl || '';
    this.fileName = data?.fileName || '';
    this.password = data?.password || '';
    this.isPasswordRequired = data?.isPasswordRequired || false;
  }

  static deserialize(apiModel: APIResponseElement): ResponseElementModel {
    const data: ResponseElementModel = {
      title: apiModel?.Title,
      description: apiModel?.Description,
      style: new StyleModel({
        ...StyleModel.deserialize(apiModel?.Style),
        display: 'block',
        textAlign: 'center',
      }),
      media: MediaModel.deserialize(apiModel?.Style.Media),
      buttonText: apiModel?.RespondButtonText,
      buttonStyle: new StyleModel({
        ...StyleModel.deserializeButtonStyles(apiModel?.Style.ResponseStyles),
        marginTop: '15px',
        position: 'relative',
      }),
      contactFieldType: ResponseElementModel.deserializeContactFieldType(apiModel?.ContactInformation),
      options: ResponseOptionModel.deserializeList(apiModel?.ResponseDetail),
      optionStyle: ResponseElementModel.deserializeOptionStyles(
        apiModel?.Style?.ResponseStyles
      ),
      optionLabelStyle: ResponseElementModel.deserializeOptionLabelStyles(
        apiModel?.Style?.ResponseStyles
      ),
      thankYouMessage: apiModel?.ThankYouMessage,
      fileUrl: apiModel?.FileUrl,
      fileName: apiModel?.FileName,
      password: apiModel?.DownloadLimit?.Password,
      isPasswordRequired: apiModel?.DownloadLimit?.IsPasswordRequired,
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
      paddingBottom: '10px',
      marginTop: '5px',
      lineHeight: '15px',
      backgroundColor: '#57AC2D',
    };
    return new StyleModel(data);
  }

  static deserializeContactFieldType(apiContact: APIContact): string {
    return apiContact?.RequireEmailOnly
      ? CONTACT_FIELD_OPTION.EMAIL_ONLY
      : apiContact?.RequireMobileOnly
        ? CONTACT_FIELD_OPTION.MOBILE_ONLY
        : CONTACT_FIELD_OPTION.EMAIL_AND_MOBILE;
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
      position: 'relative',
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
