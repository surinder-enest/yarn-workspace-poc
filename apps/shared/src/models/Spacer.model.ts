import { StyleModel } from './Style.model';
import { APISpacer } from '../interfaces';

export class SpacerModel {
  styles: StyleModel;
  constructor(data?: SpacerModel) {
    this.styles = data?.styles || new StyleModel();
  }

  static deserialize(apiModel: APISpacer): SpacerModel {
    let styles = StyleModel.deserialize(apiModel?.Style);
    styles.height = apiModel?.Size ? `${apiModel.Size}px` : '';
    styles.paddingTop = '0';
    styles.paddingBottom = '0';
    const data: SpacerModel = {
      styles: styles,
    };
    return new SpacerModel(data);
  }
}
