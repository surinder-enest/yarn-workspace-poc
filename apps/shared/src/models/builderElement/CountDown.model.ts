import config from '../../config';
import { APICountDown, APICountDownStyles } from '../../interfaces';
import { Utility } from '../../utilities';
import { StyleModel } from './Style.model';

export class CountDownModel {
  title: string;
  description: string;
  expirationDate: string;
  expirationTime: number;
  titleOptions: string;
  url: string;
  redirectUrl: string;
  buttonText: string;
  countDownLayout: string;
  timeZoneAbbreviation: string;
  expirationTimeFormat: string;
  isShowExpireTime: boolean;
  isButtonVisible: boolean;
  styles: StyleModel;
  elementLabelStyles: StyleModel;
  elementTextStyles: StyleModel;
  elementBlockStyles: StyleModel;
  elementInnerStyles: StyleModel;
  buttonStyle: StyleModel;

  constructor(data?: CountDownModel) {
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.expirationDate = data?.expirationDate || '';
    this.expirationTime = data?.expirationTime || 0;
    this.expirationTimeFormat = data?.expirationTimeFormat || '';
    this.titleOptions = data?.titleOptions || '';
    this.url = data?.url || '';
    this.redirectUrl = data?.redirectUrl || '';
    this.buttonText = data?.buttonText || '';
    this.countDownLayout = data?.countDownLayout || '';
    this.timeZoneAbbreviation = data?.timeZoneAbbreviation || '';
    this.isShowExpireTime = data?.isShowExpireTime || false;
    this.isButtonVisible = data?.isButtonVisible || false;
    this.styles = data?.styles || new StyleModel();
    this.elementLabelStyles = data?.elementLabelStyles || new StyleModel();
    this.elementTextStyles = data?.elementTextStyles || new StyleModel();
    this.elementBlockStyles = data?.elementBlockStyles || new StyleModel();
    this.elementInnerStyles = data?.elementInnerStyles || new StyleModel();
    this.buttonStyle = data?.buttonStyle || new StyleModel();
  }

  static deserialize(
    apiModel: APICountDown,
    contactId: string
  ): CountDownModel {
    const data: CountDownModel = {
      title: apiModel?.Title,
      description: apiModel?.Description,
      expirationDate: apiModel?.ExpirationDate,
      expirationTime: apiModel?.ExpirationTime,
      expirationTimeFormat: apiModel?.ExpirationTimeFormat,
      titleOptions: apiModel?.TitleOptions,
      url: `${config.API_ENDPOINT}api/countdowntimer?builderElementId=`,
      redirectUrl: Utility.getValueWithClickType(
        apiModel?.ButtonViewModel?.Type,
        apiModel?.ButtonViewModel?.Value,
        apiModel?.ButtonViewModel?.RedirectUrl,
        contactId
      ),
      buttonText: apiModel?.ButtonViewModel?.Text,
      countDownLayout: apiModel?.CountDownLayout,
      timeZoneAbbreviation: apiModel?.TimeZoneAbbreviation,
      isShowExpireTime: apiModel?.IsShowExpireTime,
      isButtonVisible: apiModel?.IsButtonVisible,
      styles: StyleModel.deserialize(apiModel?.Style),
      elementLabelStyles: CountDownModel.deserializeCountDownLabelStyles(
        apiModel?.Style?.CountDownStyles
      ),
      elementTextStyles: CountDownModel.deserializeCountDownTextStyles(
        apiModel?.Style?.CountDownStyles
      ),
      elementBlockStyles: CountDownModel.deserializeCountDownBlockStyles(
        apiModel?.Style?.CountDownStyles
      ),
      elementInnerStyles: CountDownModel.deserializeCountDownInnerStyles(
        apiModel?.Style?.CountDownStyles
      ),
      buttonStyle: StyleModel.deserializeButtonStyles(apiModel?.Style?.Button),
    };
    return new CountDownModel(data);
  }

  static deserializeCountDownLabelStyles(
    apiOption?: APICountDownStyles
  ): StyleModel {
    const data: StyleModel = {
      color: apiOption?.LabelTextColor?.HexValue,
      textAlign: 'center',
    };
    return new StyleModel(data);
  }

  static deserializeCountDownTextStyles(
    apiOption?: APICountDownStyles
  ): StyleModel {
    const data: StyleModel = {
      color: apiOption?.TextColor?.HexValue,
    };
    return new StyleModel(data);
  }

  static deserializeCountDownBlockStyles(
    apiOption?: APICountDownStyles
  ): StyleModel {
    const data: StyleModel = {
      backgroundColor: apiOption?.BlockBackgroundColor?.HexValue,
      borderStyle: apiOption?.BlockBorderStyle?.ElementBorderStyles,
      borderRadius: `${apiOption?.BlockBorderStyle?.BorderRadius}px` || '0px',
      borderWidth: `${apiOption?.BlockBorderStyle?.BorderSize}px` || '0px',
      borderColor: apiOption?.BlockBorderStyle?.BorderColor?.HexValue,
      paddingTop: '15px',
      paddingBottom: '15px',
      marginTop: '0px',
      marginRight: 'auto',
      marginBottom: '0px',
      marginLeft: 'auto',
      width: 'auto',
      maxWidth: '100%',
      textAlign: 'center',
    };
    return new StyleModel(data);
  }

  static deserializeCountDownInnerStyles(
    apiOption?: APICountDownStyles
  ): StyleModel {
    const data: StyleModel = {
      background: apiOption?.InnerBackgroundColor?.HexValue,
      borderStyle: apiOption?.InnerBorderStyle?.ElementBorderStyles,
      borderRadius: `${apiOption?.InnerBorderStyle?.BorderRadius}` || '0px',
      borderWidth: `${apiOption?.InnerBorderStyle?.BorderSize}px` || '0px',
      borderColor: apiOption?.InnerBorderStyle?.BorderColor?.HexValue,
    };
    return new StyleModel(data);
  }
}
