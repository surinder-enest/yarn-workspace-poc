import { APIStyle } from './API-style.interface';

export interface APIOptions {
  Id: string;
  OptionText: string;
}

export interface APIFormFieldsSettings {
  Id: string;
  FieldName: string;
  FormFields: string;
  CustomFieldType: string;
  IsShow: boolean;
  IsRequired: boolean;
  FormFieldType: string;
  CustomFieldId: string;
  BirthdayFormat: string;
  Options: Array<APIOptions>;
}

export interface APITitle {
  Text: string;
  Style: APIStyle;
}
export interface APIParagraph {
  LeftParagraphText: string;
  RightParagraphText: string;
  Style: APIStyle;
}
export interface APISpacer {
  Size: number;
  Style: APIStyle;
}

export interface APIInterestDetail {
  Id: string;
  CategoryId: string;
  Text: string;
}

export interface APIInterest {
  Title: string;
  IsRequireResponse: boolean;
  ResponseValue: string;
  InterestDetail: Array<APIInterestDetail>;
}

export interface APIThankYou {
  Action: string;
  Message: string;
  RedirectUrl: string;
}

export interface APIFormSubmitSettings {
  ButtonText: string;
  RequireReCaptcha: boolean;
  ThankYou: APIThankYou;
  MaxMessageLimit: number;
  ShowTermsAndConditions: boolean;
  RequireAcceptance: boolean;
  FormSubmitSettingType: string;
  Terms: string;
}

export interface APIForm {
  Title: string;
  Style: APIStyle;
  FormFieldsSettings: Array<APIFormFieldsSettings>;
  Interest: APIInterest;
  FormSubmitSettings: APIFormSubmitSettings;
}

export interface APIBuilderElement {
  Id: string;
  Key: string;
  BuilderElementType: string;
  Title: APITitle;
  Paragraph: APIParagraph;
  Spacer: APISpacer;
  Form: APIForm;
}
