import { TitleModel } from './Title.model';
import { ParagraphModel } from './Paragraph.model';
import { APIBuilderElement } from '../../interfaces';
import { FormModel } from './Form.model';
import { SpacerModel } from './Spacer.model';
import { EmbedModel } from './Embed.model';
import { DividerModel } from './Divider.model';
import { VideoModel } from './Video.model';
import { ImageModel } from './Image.model';
import { AudioModel } from './Audio.model';
import { ButtonModel } from './Button.model';
import { OfferModel } from './Offer.model';
import { MapModel } from './Map.model';
import { CountDownModel } from './CountDown.model';
import { DownloadModel } from './Download.model';
import { ResponseElementModel } from './ResponseElement.model';

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
  phone: ButtonModel;
  link: ButtonModel;
  mobilePageElement: ButtonModel;
  button: ButtonModel;
  form: FormModel;
  video: VideoModel;
  image: ImageModel;
  audio: AudioModel;
  offer: OfferModel;
  map: MapModel;
  question: ResponseElementModel;
  poll: ResponseElementModel;
  feedback: ResponseElementModel;
  countDown: CountDownModel;
  download: DownloadModel;

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
    this.phone = data?.phone || new ButtonModel();
    this.link = data?.link || new ButtonModel();
    this.mobilePageElement =
      data?.mobilePageElement || new ButtonModel();
    this.button = data?.button || new ButtonModel();

    this.form = data?.form || new FormModel();
    this.video = data?.video || new VideoModel();
    this.image = data?.image || new ImageModel();
    this.audio = data?.audio || new AudioModel();
    this.offer = data?.offer || new OfferModel();
    this.map = data?.map || new MapModel();
    this.question = data?.question || new ResponseElementModel();
    this.poll = data?.poll || new ResponseElementModel();
    this.feedback = data?.feedback || new ResponseElementModel();
    this.countDown = data?.countDown || new CountDownModel();
    this.download = data?.download || new DownloadModel();
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
      phone: ButtonModel.deserialize(apiModel?.Phone, contactId, apiModel?.BuilderElementType),
      link: ButtonModel.deserialize(apiModel?.Phone, contactId, apiModel?.BuilderElementType),
      mobilePageElement: ButtonModel.deserialize(apiModel?.Phone, contactId, apiModel?.BuilderElementType),
      button: ButtonModel.deserialize(apiModel?.Phone, contactId, apiModel?.BuilderElementType),
      form: FormModel.deserialize(apiModel?.Form),
      video: VideoModel.deserialize(apiModel?.Video),
      image: ImageModel.deserialize(apiModel?.Image, contactId),
      audio: AudioModel.deserialize(apiModel?.Audio),
      offer: OfferModel.deserialize(apiModel?.Offer),
      map: MapModel.deserialize(apiModel?.Map),
      question: ResponseElementModel.deserialize(apiModel?.Question),
      poll: ResponseElementModel.deserialize(apiModel?.Poll),
      feedback: ResponseElementModel.deserialize(apiModel?.Feedback),
      countDown: CountDownModel.deserialize(apiModel?.CountDown, contactId),
      download: DownloadModel.deserialize(apiModel?.Download),
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
