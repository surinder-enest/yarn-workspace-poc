import { StyleModel } from './Style.model';
import { APIParagraph } from '../../interfaces';

export class ParagraphModel {
  leftText: string;
  rightText: string;
  styles: StyleModel;

  constructor(data?: ParagraphModel) {
    this.leftText = data?.leftText || '';
    this.rightText = data?.rightText || '';
    this.styles = data?.styles || new StyleModel();
  }

  static deserialize(apiModel: APIParagraph): ParagraphModel {
    const data: ParagraphModel = {
      leftText: apiModel?.LeftParagraphText,
      rightText: apiModel?.RightParagraphText,
      styles: StyleModel.deserialize(apiModel?.Style),
    };
    return new ParagraphModel(data);
  }
}
