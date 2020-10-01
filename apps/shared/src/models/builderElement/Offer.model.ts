import { MEDIA_TYPE, OFFER_LAYOUT_TYPE, TERMS_TYPE } from '../../enums';
import { APIOffer, APIOfferData, APIOfferStyle } from '../../interfaces';
import { Utility } from '../../utilities';
import { MediaModel } from './MediaModel';
import { ResponseElementModel } from './ResponseElement.model';
import { StyleModel } from './Style.model';

export class OfferModel {
  private static offerStarUrl: string = "https://staging.mindmemobile.com/images/Offer-Stars.png";

  isEmpty?: boolean;
  id: string;
  styles: StyleModel;
  offerStyles: StyleModel;
  buttonStyles: StyleModel;
  type: string;
  media: MediaModel;
  title: string;
  description: string;
  contactFieldType: string;
  posCode: string;
  posCodeScanType: string;
  terms: string;
  isHideTermsInExpandableArea: boolean;
  redemptionMessage: string;
  expirationMessage: string;
  redemptionActionType: string;
  expirationActionType: string;
  expirationText?: string;

  constructor(data?: OfferModel) {
    this.isEmpty = data?.isEmpty || false;
    this.id = data?.id || '';
    this.styles = data?.styles || new StyleModel();
    this.offerStyles = data?.offerStyles || new StyleModel();
    this.buttonStyles = data?.buttonStyles || new StyleModel();
    this.type = data?.type || '';
    this.media = data?.media || new MediaModel();
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.contactFieldType = data?.contactFieldType || '';
    this.posCode = data?.posCode || '';
    this.posCodeScanType = data?.posCodeScanType || '';
    this.terms = data?.terms || '';
    this.isHideTermsInExpandableArea = data?.isHideTermsInExpandableArea || false;
    this.redemptionMessage = data?.redemptionMessage || '';
    this.expirationMessage = data?.expirationMessage || '';
    this.redemptionActionType = data?.redemptionActionType || '';
    this.expirationActionType = data?.expirationActionType || '';
    this.expirationText = data?.expirationText || '';
  }

  static deserialize(apiModel: APIOffer): OfferModel {
    const data: OfferModel = {
      id: apiModel?.OfferData?.Id,
      styles: StyleModel.deserialize(apiModel?.Style),
      offerStyles: OfferModel.deserializeStyles(apiModel?.OfferData?.OfferStyle),
      buttonStyles: OfferModel.deserializeButtonStyles(apiModel?.OfferData?.OfferStyle),
      type: apiModel?.OfferData?.OfferLayoutType,
      media: OfferModel.deserializeMedia(apiModel?.OfferData),
      title: apiModel?.OfferData?.OfferTitle,
      description: apiModel?.OfferData?.OfferDescription,
      contactFieldType: ResponseElementModel.deserializeContactFieldType(apiModel?.OfferData?.ContactInformation),
      posCode: apiModel?.OfferData?.PosCode,
      posCodeScanType: apiModel?.OfferData?.PosCodeScanType,
      terms: OfferModel.getTerms(apiModel?.OfferData),
      isHideTermsInExpandableArea: apiModel?.OfferData?.IsHideTermsInExpandableArea,
      redemptionMessage: apiModel?.OfferRedemptionMessage,
      expirationMessage: apiModel?.OfferExpirationMessage,
      redemptionActionType: apiModel?.OfferRedemptionActionType,
      expirationActionType: apiModel?.OfferExpirationActionType
    };
    return new OfferModel(data);
  }

  static deserializeMedia(apiOfferData: APIOfferData): MediaModel {
    const media = MediaModel.deserialize(apiOfferData?.Media);
    const url = media.source === MEDIA_TYPE.IMAGE && !media.url
      && apiOfferData?.OfferLayoutType === OFFER_LAYOUT_TYPE.CUSTOM ? this.offerStarUrl : media.url;
    const backgroundColor = apiOfferData?.OfferStyle?.MediaBackgroundColor?.HexValue;
    const style = new StyleModel({
      paddingTop: apiOfferData?.Position?.TopPadding,
      paddingBottom: apiOfferData?.Position?.BottomPadding,
      paddingLeft: apiOfferData?.Position?.LeftPadding,
      paddingRight: apiOfferData?.Position?.RightPadding,
      backgroundColor: backgroundColor !== "transparent" ? backgroundColor : Utility.WhiteColorCode
    });
    return new MediaModel({
      ...media,
      url,
      style
    })
  }

  static deserializeStyles(apiOfferStyle: APIOfferStyle): StyleModel {
    const data: StyleModel = {
      borderStyle: apiOfferStyle?.Border?.ElementBorderStyles,
      borderWidth: `${apiOfferStyle?.Border?.BorderSize || 0}px`,
      borderColor: apiOfferStyle?.Border?.BorderColor?.HexValue,
      backgroundColor: apiOfferStyle?.BackgroundColor?.HexValue,
      minHeight: '134px',
      paddingBottom: '5px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingTop: '5px',
    };
    return new StyleModel(data);
  }

  static deserializeButtonStyles(apiOfferStyle: APIOfferStyle): StyleModel {
    const data: StyleModel = {
      ...StyleModel.deserializeButtonStyles(),
      color: apiOfferStyle?.RedeemButtonTextColor?.HexValue,
      background: apiOfferStyle?.RedeemButtonColor?.HexValue,
      borderStyle: apiOfferStyle?.RedeemButton?.ElementBorderStyles,
      borderWidth: `${apiOfferStyle?.RedeemButton?.BorderSize || 0}px`,
      borderColor: apiOfferStyle?.RedeemButton?.BorderColor?.HexValue,
      borderRadius: `${apiOfferStyle?.RedeemButton?.BorderRadius || 0}px`,
    };
    return new StyleModel(data);
  }

  static getTerms(apiOfferData: APIOfferData): string {
    switch (apiOfferData?.TermSettingType) {
      case TERMS_TYPE.SETTINGS:
        return apiOfferData?.TermsFromSettings || "";
      default:
        return apiOfferData?.TermsAndConditions || "";
    }
  }
}
