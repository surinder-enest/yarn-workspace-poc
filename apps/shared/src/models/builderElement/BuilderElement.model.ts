import { TitleModel } from './Title.model';
import { ParagraphModel } from './Paragraph.model';
import { APIBuilderElement } from '../../interfaces';
import { FormModel } from './Form.model';
import { SpacerModel } from './Spacer.model';
import { EmbedModel } from './Embed.model';
import { DividerModel } from './Divider.model';
import { PhoneModel } from './Phone.model';
import { VideoModel } from './Video.model';
import { LinkModel } from './Link.model';
import { MobilePageElementModel } from './MobilePageElement.model';
import { ImageModel } from './Image.model';
import { AudioModel } from './Audio.model';
import { ButtonModel } from './Button.model';
import { OfferModel } from './Offer.model';
import { MapModel } from './Map.model';

export class BuilderElementModel {
  id: string;
  key: string;
  elementLabel?: string;
  builderElementType: string;
  isElementActive?: boolean;
  isTextRoute?: boolean;
  title: TitleModel;
  paragraph: ParagraphModel;
  spacer: SpacerModel;
  divider: DividerModel;
  embed: EmbedModel;
  phone: PhoneModel;
  link: LinkModel;
  mobilePageElement: MobilePageElementModel;
  button: ButtonModel;
  form: FormModel;
  video: VideoModel;
  image: ImageModel;
  audio: AudioModel;
  offer: OfferModel;
  map: MapModel;

  constructor(data?: BuilderElementModel) {
    this.id = data?.id || '';
    this.key = data?.key || '';
    this.elementLabel = data?.elementLabel || '';
    this.builderElementType = data?.builderElementType || '';
    this.isElementActive = data?.isElementActive || false;
    this.isTextRoute = data?.isTextRoute || false;
    this.title = data?.title || new TitleModel();
    this.paragraph = data?.paragraph || new ParagraphModel();
    this.spacer = data?.spacer || new SpacerModel();
    this.embed = data?.embed || new EmbedModel();
    this.divider = data?.divider || new DividerModel();
    this.phone = data?.phone || new PhoneModel();
    this.link = data?.link || new LinkModel();
    this.mobilePageElement =
      data?.mobilePageElement || new MobilePageElementModel();
    this.button = data?.button || new ButtonModel();

    this.form = data?.form || new FormModel();
    this.video = data?.video || new VideoModel();
    this.image = data?.image || new ImageModel();
    this.audio = data?.audio || new AudioModel();
    this.offer = data?.offer || new OfferModel();
    this.map = data?.map || new MapModel();
  }

  static deserialize(
    apiModel: APIBuilderElement,
    contactId: string
  ): BuilderElementModel {
    const data: BuilderElementModel = {
      id: apiModel?.Id,
      key: apiModel?.Key,
      builderElementType: apiModel?.BuilderElementType,
      title: TitleModel.deserialize(apiModel?.Title),
      paragraph: ParagraphModel.deserialize(apiModel?.Paragraph),
      spacer: SpacerModel.deserialize(apiModel?.Spacer),
      embed: EmbedModel.deserialize(apiModel?.Embed),
      divider: DividerModel.deserialize(apiModel?.Divider),
      phone: PhoneModel.deserialize(apiModel?.Phone),
      link: LinkModel.deserialize(apiModel?.Link),
      mobilePageElement: MobilePageElementModel.deserialize(
        apiModel?.MobilePage
      ),
      button: ButtonModel.deserialize(apiModel?.Button, contactId),
      form: FormModel.deserialize(apiModel?.Form),
      video: VideoModel.deserialize(apiModel?.Video),
      image: ImageModel.deserialize(apiModel?.Image, contactId),
      audio: AudioModel.deserialize(apiModel?.Audio),
      offer: OfferModel.deserialize(apiModel?.Offer, contactId),
      map: MapModel.deserialize(apiModel?.Map),
    };
    return new BuilderElementModel(data);
  }

  static deserializeList(
    apiBuilderElementList: APIBuilderElement[],
    contactId: string
  ): BuilderElementModel[] {
    return apiBuilderElementList
      ? apiBuilderElementList.map(
          (apiBuilderElement: APIBuilderElement) =>
            new BuilderElementModel(
              BuilderElementModel.deserialize(apiBuilderElement, contactId)
            )
        )
      : [];
  }
}
