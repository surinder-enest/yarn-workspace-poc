interface APIPosition {
    TopPadding: number;
    BottomPadding: number;
    RightPadding: number;
    LeftPadding: number;
    TopMargin: number;
    BottomMargin: number;
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

export interface APIStyle {
    Position: APIPosition;
    Background: APIBackground;
    ElementBorderStyle: APIBorder;
}