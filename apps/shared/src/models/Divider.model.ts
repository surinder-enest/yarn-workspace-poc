import { ALIGNMENT } from '../enums/Alignment.enum';
import { APIDivider, APIStyle } from '../interfaces';
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
    const styles = new StyleModel({
      ...StyleModel.deserialize(apiModel?.Style),
      width: `${apiModel?.DividerStyle?.Width}%`,
      margin: DividerModel?.alignmentStyle(apiModel?.Style?.Align),
      borderTop: `${apiModel?.DividerStyle?.Thickness}px ${apiModel?.DividerStyle?.Style} ${apiModel?.DividerStyle?.HexValue}`,
      marginBottom: '0',
      marginTop: '0',
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

  static alignmentStyle(alignment?: string): string {
    switch (alignment) {
      case ALIGNMENT.LEFT:
        return '0';
      case ALIGNMENT.RIGHT:
        return 'auto 0 auto auto';
      case ALIGNMENT.CENTER:
        return '0 auto';
      default:
        return '';
    }
  }
}
