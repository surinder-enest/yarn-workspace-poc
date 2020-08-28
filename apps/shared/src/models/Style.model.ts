export class StyleModel {
    topPadding: string;
    bottomPadding: string;
    leftPadding: string;
    rightPadding: string;
    backgroundColor: string;
    borderStyle: string;
    borderSize: string;
    borderColor: string;

    constructor(data?: StyleModel) {
        this.topPadding = data?.topPadding || '';
        this.bottomPadding = data?.bottomPadding || '';
        this.leftPadding = data?.leftPadding || '';
        this.rightPadding = data?.rightPadding || '';
        this.backgroundColor = data?.backgroundColor || '';
        this.borderStyle = data?.borderStyle || '';
        this.borderSize = data?.borderSize || '';
        this.borderColor = data?.borderColor || '';
    }
}