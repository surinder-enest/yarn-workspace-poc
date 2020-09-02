interface APIPosition {
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
    Opacity: number
}

export interface APIBorder {
    ElementBorderStyles: string;
    BorderSize: number;
    BorderColor: APIColor;
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

export interface APIStyle {
    Position: APIPosition;
    Background: APIBackground;
    ElementBorderStyle: APIBorder;
    FieldsStyle: APIFieldsStyle;
    InterestStyles: APIInterestStyles;
}