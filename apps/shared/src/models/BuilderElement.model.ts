import { TitleModel } from './Title.model';
import { ParagraphModel } from './Paragraph.model';
import { APIBuilderElement } from '../interfaces';
import { FormModel } from './Form.model';
import { SpacerModel } from './Spacer.model';
import { EmbedModel } from './Embed.model';
import { DividerModel } from './Divider.model';
import { PhoneModel } from './Phone.model';
import { VideoModel } from './Video.model';

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
  form: FormModel;
  video: VideoModel;

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
    this.form = data?.form || new FormModel();
    this.video = data?.video || new VideoModel();
  }

  static deserialize(apiModel: APIBuilderElement): BuilderElementModel {
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
      form: FormModel.deserialize(apiModel?.Form),
      video: VideoModel.deserialize(apiModel?.Video),
    };
    return new BuilderElementModel(data);
  }

  static deserializeList(
    apiBuilderElementList: APIBuilderElement[]
  ): BuilderElementModel[] {
    return apiBuilderElementList
      ? apiBuilderElementList.map(
          (apiBuilderElement: APIBuilderElement) =>
            new BuilderElementModel(
              BuilderElementModel.deserialize(apiBuilderElement)
            )
        )
      : [];
  }
}
