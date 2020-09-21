import { ALIGNMENT } from '../../enums/styles/Alignment.enum';
import { APIDivider, APIStyle } from '../../interfaces';
import { StyleModel } from './Style.model';

export class DividerModel {
  styles: StyleModel;
  elementStyles: StyleModel;

  constructor(data?: DividerModel) {
    this.styles = data?.styles || new StyleModel();
    this.elementStyles = data?.elementStyles || new StyleModel();
  }

  static deserialize(apiModel: APIDivider): DividerModel {
    const data: DividerModel = {
      styles: DividerModel.deserializeStyles(apiModel),
      elementStyles: DividerModel.deserializeElementStyles(apiModel?.Style),
    };
    return new DividerModel(data);
  }

  static deserializeStyles(apiModel: APIDivider): StyleModel {
    const {
      marginTop,
      marginLeft,
      marginBottom,
      marginRight,
    } = DividerModel.alignmentStyle(apiModel?.Style?.Align);
    const styles = new StyleModel({
      ...StyleModel.deserialize(apiModel?.Style),
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      width: `${apiModel?.DividerStyle?.Width || 100}%`,
      borderWidth: `${apiModel?.DividerStyle?.Thickness || 0}px 0px 0px 0px`,
      borderStyle: apiModel?.DividerStyle?.Style,
      borderColor: apiModel?.DividerStyle?.HexValue,
    });
    return styles;
  }

  static deserializeElementStyles(apiStyle: APIStyle): StyleModel {
    const elementStyles = new StyleModel({
      ...StyleModel.deserialize(apiStyle),
      paddingTop: '10px',
      paddingBottom: '10px',
    });
    return elementStyles;
  }

  static alignmentStyle(alignment?: string): StyleModel {
    switch (alignment) {
      case ALIGNMENT.LEFT:
        return new StyleModel({
          marginTop: '0',
          marginRight: '0',
          marginBottom: '0',
          marginLeft: '0',
        });
      case ALIGNMENT.RIGHT:
        return new StyleModel({
          marginTop: 'auto',
          marginRight: '0',
          marginBottom: 'auto',
          marginLeft: 'auto',
        });
      case ALIGNMENT.CENTER:
        return new StyleModel({
          marginTop: '0',
          marginRight: 'auto',
          marginBottom: '0',
          marginLeft: 'auto',
        });
      default:
        return new StyleModel({
          marginTop: '0',
          marginBottom: '0',
        });
    }
  }
}
