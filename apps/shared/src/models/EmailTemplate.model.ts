import { APIEmailTemplate } from '../interfaces';
import { BuilderElementModel } from './builderElement';

export class EmailTemplateModel {
  isNotFoundOrDeleted: boolean;
  isSubAccountDeleted: boolean;
  builderElements: Array<BuilderElementModel>;
  constructor(data?: EmailTemplateModel) {
    this.isNotFoundOrDeleted = data?.isNotFoundOrDeleted || false;
    this.isSubAccountDeleted = data?.isSubAccountDeleted || false;
    this.builderElements = data?.builderElements || [];
  }

  static deserialize(apiModel: APIEmailTemplate): EmailTemplateModel {
    const data: EmailTemplateModel = {
      isNotFoundOrDeleted: apiModel?.IsEmailTemplateBuilderNotFoundOrDeleted,
      isSubAccountDeleted: apiModel?.IsSubAccountDeleted,
      builderElements: BuilderElementModel.deserializeList(
        apiModel?.EmailBuilderComponents,
        ''
      ),
    };
    return new EmailTemplateModel(data);
  }
}
