interface APIPosition {
    TopPadding: number;
    BottomPadding: number;
    RightPadding: number;
    LeftPadding: number;
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
    BackgroundColor: APIColor;
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