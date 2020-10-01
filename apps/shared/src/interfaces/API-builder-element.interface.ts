import { APIMapLocation } from './API-mobile-page.interface';
import {
  APIBorder,
  APIColor,
  APIDividerStyle,
  APIMedia,
  APIStyle,
  APIPosition,
} from './API-style.interface';

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
export interface APIEmbed {
  Text: string;
}
export interface APIDivider {
  DividerStyle: APIDividerStyle;
  Style: APIStyle;
}

export interface APIPhone {
  Text: string;
  PhoneNumber: number;
  Style: APIStyle;
}

export interface APILink {
  Text: string;
  URL: string;
  Style: APIStyle;
}
export interface APIMobilePageElement {
  ButtonText: string;
  PageURL: string;
  Style: APIStyle;
}

export interface APIButtonElement {
  Text: string;
  Type: string;
  Value: string;
  RedirectUrl: string;
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

export interface APIVideo {
  Style: APIStyle;
  LinkType: string;
  Url: string;
  VideoSourceType: string;
  VideoShowType: string;
  ButtonText: string;
}

export interface APIImage {
  Style: APIStyle;
  ImageUrl: string;
  Caption: string;
  IsClickable: boolean;
  Type: string;
  Value: string;
  RedirectUrl: string;
}

export interface APIAudio {
  Style: APIStyle;
  LinkType: string;
  Url: string;
  AudioShowType: string;
  ButtonText: string;
  ImageURL: string;
}

export interface APIOfferStyle {
  BackgroundColor: APIColor;
  MediaBackgroundColor: APIColor;
  Border: APIBorder;
  OfferTextColor: APIColor;
  RedeemButtonColor: APIColor;
  RedeemButton: APIBorder;
  RedeemButtonTextColor: APIColor;
}

export interface APIOfferData {
  Id: string;
  OfferTitle: string;
  OfferDescription: string;
  OfferLayoutType: string;
  Media: APIMedia;
  OfferStyle: APIOfferStyle;
  Position: APIPosition;
  ContactInformation: APIContact;
  PosCode: string;
  PosCodeScanType: string;
  TermSettingType: string;
  TermsFromSettings: string;
  TermsAndConditions: string;
  IsHideTermsInExpandableArea: boolean;
}

export interface APIOffer {
  Style: APIStyle;
  OfferData: APIOfferData;
  OfferRedemptionMessage: string;
  OfferExpirationMessage: string;
  OfferExpirationActionType: string;
  OfferRedemptionActionType: string;
}
export interface APIMapAddress {
  PlaceId: string;
  Location: APIMapLocation;
  FormattedAddress: string;
  IsInfoWindowOpen: boolean;
}

export interface APIMap {
  Address: Array<APIMapAddress>;
  ShowMap: boolean;
  AllowScrolling: boolean;
  ShowZoom: boolean;
  ShowStreetView: boolean;
  ShowButton: boolean;
  IsDisplayAddresses: boolean;
  ButtonText: string;
  Style: APIStyle;
}

export interface APIResponse {
  Id: string;
  Text: string;
  ThankYouMessage: string;
}

export interface APIContact {
  RequireEmailAndMobile: boolean;
  RequireEmailOnly: boolean;
  RequireMobileOnly: boolean;
}

export interface APIResponseElement {
  Title: string;
  Description: string;
  ResponseDetail: Array<APIResponse>;
  ContactInformation: APIContact;
  RespondButtonText: string;
  ThankYouMessage: string;
  Style: APIStyle;
  FileUrl: string;
  FileName: string;
  DownloadLimit: APIDownloadLimit;
}

export interface APIDownloadLimit {
  IsPasswordRequired: boolean;
  Password: string;
}

export interface APIDownload extends APIResponseElement {
  Layout: string;
}

export interface APICountDown {
  CountDownLayout: string;
  Title: string;
  Description: string;
  ExpirationDate: string;
  ExpirationTime: number;
  ExpirationTimeFormat: string;
  TitleOptions: string;
  ButtonViewModel: APIButtonElement;
  TimeZoneAbbreviation: string;
  IsShowExpireTime: boolean;
  IsButtonVisible: boolean;
  Style: APIStyle;
}

export interface APIBuilderElement {
  Id: string;
  Key: string;
  BuilderElementType: string;
  Title: APITitle;
  Paragraph: APIParagraph;
  Spacer: APISpacer;
  Embed: APIEmbed;
  Divider: APIDivider;
  Phone: APIPhone;
  Link: APILink;
  MobilePage: APIMobilePageElement;
  Button: APIButtonElement;
  Form: APIForm;
  Video: APIVideo;
  Image: APIImage;
  Audio: APIAudio;
  Offer: APIOffer;
  Map: APIMap;
  Question: APIResponseElement;
  Poll: APIResponseElement;
  Feedback: APIResponseElement;
  CountDown: APICountDown;
  Download: APIDownload;
}
