import { StyleModel } from './Style.model';
import { APISpacer } from '../../interfaces';

export class SpacerModel {
  styles: StyleModel;
  constructor(data?: SpacerModel) {
    this.styles = data?.styles || new StyleModel();
  }

  static deserialize(apiModel: APISpacer): SpacerModel {
    let styles = new StyleModel({
      ...StyleModel.deserialize(apiModel?.Style),
      height: apiModel?.Size ? `${apiModel.Size}px` : '',
      paddingTop: '0',
      paddingBottom: '0',
    });

    const data: SpacerModel = {
      styles: styles,
    };
    return new SpacerModel(data);
  }
}
