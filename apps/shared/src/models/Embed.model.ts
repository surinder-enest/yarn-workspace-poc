import { APIEmbed } from '../interfaces';

export class EmbedModel {
  text: string;
  constructor(data?: EmbedModel) {
    this.text = data?.text || '';
  }

  static deserialize(apiModel: APIEmbed): EmbedModel {
    const data: EmbedModel = {
      text: apiModel?.Text,
    };
    return new EmbedModel(data);
  }
}
