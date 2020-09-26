import {
  APIStyle,
  APIBackground,
  APIButton
} from '../../interfaces';
import { Utility } from '../../utilities';
import { BACKGROUND_TYPE } from '../../enums';

export class StyleModel {
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  backgroundColor?: string;
  borderStyle?: string;
  borderWidth?: string;
  borderRadius?: string;
  borderColor?: string;
  background?: string;
  minHeight?: string;
  color?: string;
  display?: string;
  width?: string;
  fontSize?: string;
  lineHeight?: string;
  height?: string;
  outline?: string;
  opacity?: string;
  float?: any;
  boxSizing?: any;
  textAlign?: any;
  cursor?: string;
  position?: any;

  constructor(data?: StyleModel) {
    this.paddingTop = data?.paddingTop;
    this.paddingBottom = data?.paddingBottom;
    this.paddingLeft = data?.paddingLeft;
    this.paddingRight = data?.paddingRight;
    this.marginTop = data?.marginTop;
    this.marginBottom = data?.marginBottom;
    this.marginLeft = data?.marginLeft;
    this.marginRight = data?.marginRight;
    this.backgroundColor = data?.backgroundColor;
    this.borderStyle = data?.borderStyle;
    this.borderWidth = data?.borderWidth;
    this.borderRadius = data?.borderRadius;
    this.borderColor = data?.borderColor;
    this.background = data?.background;
    this.minHeight = data?.minHeight;
    this.color = data?.color;
    this.display = data?.display;
    this.width = data?.width;
    this.fontSize = data?.fontSize;
    this.height = data?.height;
    this.opacity = data?.opacity;
    this.outline = data?.outline;
    this.float = data?.float;
    this.boxSizing = data?.boxSizing || 'border-box';
    this.textAlign = data?.textAlign;
    this.cursor = data?.cursor;
    this.lineHeight = data?.lineHeight;
    this.position = data?.position;
  }

  static deserialize(apiModel: APIStyle): StyleModel {
    const data: StyleModel = {
      paddingTop: apiModel?.Position?.TopPadding,
      paddingBottom: apiModel?.Position?.BottomPadding,
      paddingLeft: apiModel?.Position?.LeftPadding,
      paddingRight: apiModel?.Position?.RightPadding,
      marginTop: apiModel?.Position?.TopMargin,
      marginBottom: apiModel?.Position?.BottomMargin,
      backgroundColor:
        apiModel?.Background?.BackgroundColor?.HexValue ||
        Utility.WhiteColorCode,
      borderStyle: apiModel?.ElementBorderStyle?.ElementBorderStyles,
      borderWidth: `${apiModel?.ElementBorderStyle?.BorderSize || 0}px`,
      borderColor: apiModel?.ElementBorderStyle?.BorderColor?.HexValue,
      background: StyleModel.deserializeBackgroundCss(apiModel?.Background),
      minHeight: apiModel?.Background?.Url ? '300px' : '',
      width: `${apiModel?.Position?.Size || 100}%`,
    };
    return new StyleModel(data);
  }

  static deserializeBackgroundCss(apiBackgroundModel?: APIBackground): string {
    if (!apiBackgroundModel) return '';
    const {
      Url,
      BackgroundType,
      BackgroundColor,
      ImagePosition,
      BackgroundRepeat,
      Opacity,
      Size,
    } = apiBackgroundModel;
    const backgroundColor = BackgroundColor?.HexValue || Utility.WhiteColorCode;
    switch (BackgroundType) {
      case BACKGROUND_TYPE.IMAGE:
        const opacityValue = Opacity ? Opacity / 100 : 1;
        return `${Url
          ? `linear-gradient(rgba(255, 255, 255, 
                    ${1 - opacityValue}), rgba(255,255, 255,
                    ${1 - opacityValue})), url(${Utility.replace(
            Url,
            ' ',
            '%20'
          )}) 
                    ${Utility.addStringBeforeCapitalLetter(
            ImagePosition,
            ' '
          ).toLowerCase()} / ${Size === '100%' ? 'cover' : Size} 
                    ${Utility.addStringBeforeCapitalLetter(
            BackgroundRepeat,
            '-'
          ).toLowerCase()}`
          : backgroundColor
          }`;
      default:
        return backgroundColor;
    }
  }

  static deserializeButtonStyles(apiButton?: APIButton): StyleModel {
    const data: StyleModel = {
      color: apiButton?.TextColor?.HexValue,
      background: apiButton?.BackgroundColor?.HexValue,
      borderStyle: apiButton?.ElementBorderStyles,
      borderWidth: `${apiButton?.BorderSize || 0}px`,
      borderColor: apiButton?.BorderColor?.HexValue,
      borderRadius: `${apiButton?.BorderRadius || 0}px`,
      display: 'inline-block',
      marginBottom: '0',
      textAlign: 'center',
      lineHeight: '20px',
      fontSize: '18px',
      cursor: 'pointer',
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '10px',
      paddingRight: '10px',
      width: '300px',
    };
    return new StyleModel(data);
  }
}
