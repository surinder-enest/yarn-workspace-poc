import { APIContact, APIQuestion, APIResponse } from '../../interfaces';
import { MediaTypeModel } from './MediaType.model';

import { StyleModel } from './Style.model';

export class QuestionModel {
  responseDetail: Array<ResponseModel>;
  title: string;
  description: string;
  contactInformation: ContactModel;
  respondButtonText: string;
  isOverrideAnyResponseWithAction: string;
  elementStyle: StyleModel;
  responseButtonStyle: StyleModel;
  optionStyle: StyleModel;
  mediaType: MediaTypeModel;

  constructor(data?: QuestionModel) {
    this.responseDetail = data?.responseDetail || [];
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.contactInformation = data?.contactInformation || new ContactModel();
    this.respondButtonText = data?.respondButtonText || '';
    this.isOverrideAnyResponseWithAction =
      data?.isOverrideAnyResponseWithAction || '';
    this.elementStyle = data?.elementStyle || new StyleModel();
    this.responseButtonStyle = data?.responseButtonStyle || new StyleModel();
    this.optionStyle = data?.optionStyle || new StyleModel();
    this.mediaType = data?.mediaType || new MediaTypeModel();
  }

  static deserialize(apiModel: APIQuestion): QuestionModel {
    const data: QuestionModel = {
      responseDetail: ResponseModel.deserializeList(apiModel?.ResponseDetail),
      title: apiModel?.Title,
      description: apiModel?.Description,
      contactInformation: ContactModel.deserialize(
        apiModel?.ContactInformation
      ),
      respondButtonText: apiModel?.RespondButtonText,
      isOverrideAnyResponseWithAction:
        apiModel?.IsOverrideAnyResponseWithAction,
      elementStyle: new StyleModel({
        ...StyleModel.deserialize(apiModel?.Style),
        display: 'block',
        textAlign: 'center',
      }),
      responseButtonStyle: StyleModel.deserializeButtonStyles(
        apiModel?.Style.ResponseStyles
      ),
      optionStyle: StyleModel.deserializeOptionStyles(
        apiModel?.Style.ResponseStyles
      ),
      mediaType: MediaTypeModel.deserialize(apiModel?.Style.Media),
    };

    return new QuestionModel(data);
  }
}

export class ResponseModel {
  responseType: string;
  thankYouMessage: string;
  text: string;
  constructor(data?: ResponseModel) {
    this.responseType = data?.responseType || '';
    this.thankYouMessage = data?.thankYouMessage || '';
    this.text = data?.text || '';
  }

  static deserialize(apiModel: APIResponse): ResponseModel {
    const data: ResponseModel = {
      responseType: apiModel?.ResponseType,
      thankYouMessage: apiModel?.ThankYouMessage,
      text: apiModel?.Text,
    };
    return new ResponseModel(data);
  }
  static deserializeList(apiList: APIResponse[]): ResponseModel[] {
    return apiList
      ? apiList.map((apiResponse: APIResponse) => {
          return ResponseModel.deserialize(apiResponse);
        })
      : [];
  }
}

export class ContactModel {
  requireEmailAndMobile: boolean;
  requireEmailOnly: boolean;
  requireMobileOnly: boolean;

  constructor(data?: ContactModel) {
    this.requireEmailAndMobile = data?.requireEmailAndMobile || false;
    this.requireEmailOnly = data?.requireEmailOnly || false;
    this.requireMobileOnly = data?.requireMobileOnly || false;
  }

  static deserialize(apiModel: APIContact): ContactModel {
    const data: ContactModel = {
      requireEmailAndMobile: apiModel?.RequireEmailAndMobile,
      requireEmailOnly: apiModel?.RequireEmailOnly,
      requireMobileOnly: apiModel?.RequireMobileOnly,
    };
    return new ContactModel(data);
  }
}
