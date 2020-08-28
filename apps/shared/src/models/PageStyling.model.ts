import { APIPageStyles } from '../interfaces';

export class PageStylesModel {
    backgroundColor: string;
    color: string;
    borderStyle: string;
    borderWidth: number;
    borderColor: string;

    constructor(data?: PageStylesModel) {
        this.backgroundColor = data?.backgroundColor || '';
        this.color = data?.color || '';
        this.borderStyle = data?.borderStyle || '';
        this.borderWidth = data?.borderWidth || 0;
        this.borderColor = data?.borderColor || '';
    }

    static deserilize(apiModel: APIPageStyles): PageStylesModel {
        const data: PageStylesModel = {
            backgroundColor: apiModel?.Background?.BackgroundColor?.HexValue,
            color: apiModel?.PageColor?.HexValue,
            borderStyle: apiModel?.Border?.ElementBorderStyles,
            borderWidth: apiModel?.Border?.BorderSize,
            borderColor: apiModel?.Border?.BorderColor.HexValue,
        };
        return new PageStylesModel(data)
    }
}