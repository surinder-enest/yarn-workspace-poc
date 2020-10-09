export interface APIPosition {
  Size: number;
  TopPadding: string;
  BottomPadding: string;
  RightPadding: string;
  LeftPadding: string;
  TopMargin: string;
  BottomMargin: string;
}

interface APIRgba {
  R: number;
  G: number;
  B: number;
  A: number;
}

export interface APIColor {
  HexValue: string;
  RgbValue: APIRgba;
}

export interface APIBackground {
  BackgroundType: string;
  BackgroundColor: APIColor;
  Url: string;
  Size: string;
  BackgroundRepeat: string;
  ImagePosition: string;
  Opacity: number;
  CloseIconColor: APIColor;
}

export interface APIBorder {
  ElementBorderStyles: string;
  Size: number;
  BorderSize: number;
  BorderColor: APIColor;
  BorderRadius: number;
}

export interface APIFieldsStyle {
  FieldLabelTextColor: APIColor;
  FieldTextColor: APIColor;
  FieldBackgroundColor: APIColor;
  ElementBorderStyles: string;
  BorderColor: APIColor;
  BorderRadius: string;
  BorderSize: string;
}

export interface APIInterestStyles {
  TextColor: APIColor;
  BackgroundColor: APIColor;
}

export interface APIButton {
  TextColor: APIColor;
  BackgroundColor: APIColor;
  ElementBorderStyles: string;
  BorderSize: number;
  BorderColor: APIColor;
  BorderRadius: number;
}
export interface APIResponseStyles extends APIButton {
  OptionTextColor: APIColor;
  OptionBackgroundColor: APIColor;
}

export interface APIMedia {
  Size: string;
  SourceLinkType: string;
  VideoSourceType: string;
  Source: string;
  Url: string;
}
export interface APICountDownBorder extends APIBorder {
  BorderRadius: number;
}

export interface APICountDownStyles {
  LabelTextColor: APIColor;
  TextColor: APIColor;
  BlockBackgroundColor: APIColor;
  InnerBackgroundColor: APIColor;
  InnerBorderStyle: APICountDownBorder;
  BlockBorderStyle: APICountDownBorder;
}

export interface APIStyle {
  Position: APIPosition;
  Background: APIBackground;
  ElementBorderStyle: APIBorder;
  FieldsStyle: APIFieldsStyle;
  InterestStyles: APIInterestStyles;
  Button: APIButton;
  ResponseStyles: APIResponseStyles;
  Align: string;
  Media: APIMedia;
  CountDownStyles: APICountDownStyles;
}

export interface APIDividerStyle {
  Style: string;
  Thickness: number;
  Width: number;
  HexValue: string;
  RgbValue: APIRgba;
}
