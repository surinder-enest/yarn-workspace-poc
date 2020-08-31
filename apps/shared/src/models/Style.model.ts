import { APIStyle, APIBackground } from '../interfaces';
import { Utility } from '../utilities';
import { BACKGROUND_TYPE } from '../enums';

export class StyleModel {
    private static WhiteColorCode = "#ffffff";

    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    marginTop: number;
    marginBottom: number;
    backgroundColor: string;
    borderStyle: string;
    borderWidth: number;
    borderColor: string;
    background: string;
    minHeight: number;
    boxSizing: string;

    constructor(data?: StyleModel) {
        this.paddingTop = data?.paddingTop || 0;
        this.paddingBottom = data?.paddingBottom || 0;
        this.paddingLeft = data?.paddingLeft || 0;
        this.paddingRight = data?.paddingRight || 0;
        this.marginTop = data?.marginTop || 0;
        this.marginBottom = data?.marginBottom || 0;
        this.backgroundColor = data?.backgroundColor || '';
        this.borderStyle = data?.borderStyle || '';
        this.borderWidth = data?.borderWidth || 0;
        this.borderColor = data?.borderColor || '';
        this.background = data?.background || '';
        this.minHeight = data?.minHeight || 0;
        this.boxSizing = data?.boxSizing || '';
    }

    static deserialize(apiModel: APIStyle): StyleModel {
        const data: StyleModel = {
            paddingTop: apiModel?.Position?.TopPadding,
            paddingBottom: apiModel?.Position?.BottomPadding,
            paddingLeft: apiModel?.Position?.LeftPadding,
            paddingRight: apiModel?.Position?.RightPadding,
            marginTop: apiModel?.Position?.TopMargin,
            marginBottom: apiModel?.Position?.BottomMargin,
            backgroundColor: apiModel?.Background?.BackgroundColor?.HexValue || this.WhiteColorCode,
            borderStyle: apiModel?.ElementBorderStyle?.ElementBorderStyles,
            borderWidth: apiModel?.ElementBorderStyle?.BorderSize,
            borderColor: apiModel?.ElementBorderStyle?.BorderColor?.HexValue,
            background: StyleModel.deserializeBackgroundCss(apiModel?.Background),
            minHeight: apiModel?.Background?.Url ? 300 : 0,
            boxSizing: "border-box",
        };
        return new StyleModel(data)
    }

    static deserializeBackgroundCss(apiBackgroundModel: APIBackground): string {
        const { Url, BackgroundType, BackgroundColor, ImagePosition, BackgroundRepeat, Opacity, Size } = apiBackgroundModel;
        switch (BackgroundType) {
            case BACKGROUND_TYPE.IMAGE:
                const opacityValue = Opacity ? Opacity / 100 : 1;
                const background = `${Url ? `linear-gradient(rgba(255, 255, 255, 
                    ${1 - opacityValue}), rgba(255,255, 255,
                    ${1 - opacityValue})), url(${Utility.replace(Url, " ", "%20")}) 
                    ${Utility.amendSentence(ImagePosition, " ").toLowerCase()} / ${Size === '100%' ? 'cover' : Size} 
                    ${Utility.amendSentence(BackgroundRepeat, "-").toLowerCase()}`
                    : BackgroundColor ? BackgroundColor : this.WhiteColorCode}`;
                return background;
            default:
                return "";
        }
    }

}
