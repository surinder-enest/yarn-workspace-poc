import { APIOffer } from '../../interfaces';
import { StyleModel } from './Style.model';

export class OfferModel {
  private static offerStarUrl: string = "https://staging.mindmemobile.com/images/Offer-Stars.png";
  styles: StyleModel;
  buttonStyles: StyleModel;
  imageStyles: StyleModel;
  type: string;
  mediaType: string;
  url: string;
  title: string;
  description: string;

  constructor(data?: OfferModel) {
    this.styles = data?.styles || new StyleModel();
    this.buttonStyles = data?.buttonStyles || new StyleModel();
    this.imageStyles = data?.imageStyles || new StyleModel();
    this.type = data?.type || '';
    this.mediaType = data?.mediaType || '';
    this.url = data?.url || '';
    this.title = data?.title || '';
    this.description = data?.description || '';
  }

  static deserialize(apiModel: APIOffer, contactId: string): OfferModel {
    const data: OfferModel = {
      styles: new StyleModel({
        ...StyleModel.deserialize(apiModel?.Style),
        minHeight: '134px',
        paddingBottom: '5px',
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '5px',
      }),
      buttonStyles: StyleModel.deserializeButtonStyles(apiModel?.Style?.Button),
      imageStyles: StyleModel.deserialize(apiModel?.Style),
      type: apiModel?.OfferData?.OfferLayoutType,
      mediaType: apiModel?.OfferData?.Media?.Source,
      url: apiModel?.OfferData?.Media?.Url || this.offerStarUrl,
      title: apiModel?.OfferData?.OfferTitle,
      description: apiModel?.OfferData?.OfferDescription,
    };
    console.log(contactId);
    return new OfferModel(data);
  }
}
