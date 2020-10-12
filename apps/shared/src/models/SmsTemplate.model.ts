import {
  APISms,
  APISmsTemplate,
  APITemplateInitialSetting,
} from '../interfaces';

export class SmsTemplateModel {
  isNotFoundOrDeleted: boolean;
  isSubAccountDeleted: boolean;
  templateInitialSettings: TemplateInitialSettingModel;
  constructor(data?: SmsTemplateModel) {
    this.isNotFoundOrDeleted = data?.isNotFoundOrDeleted || false;
    this.isSubAccountDeleted = data?.isSubAccountDeleted || false;
    this.templateInitialSettings =
      data?.templateInitialSettings || new TemplateInitialSettingModel();
  }

  static deserialize(apiModel: APISmsTemplate): SmsTemplateModel {
    const data: SmsTemplateModel = {
      isNotFoundOrDeleted: apiModel?.IsSmsTemplateBuilderNotFoundOrDeleted,
      isSubAccountDeleted: apiModel?.IsSubAccountDeleted,
      templateInitialSettings: TemplateInitialSettingModel.deserialize(
        apiModel?.BuilderElementInitialSetting
      ),
    };
    return new SmsTemplateModel(data);
  }
}

export class TemplateInitialSettingModel {
  sourceNumber: number;
  tinyBaseURL: string;
  templateMessage: TemplateMessageModel;
  constructor(data?: TemplateInitialSettingModel) {
    this.sourceNumber = data?.sourceNumber || 0;
    this.tinyBaseURL = data?.tinyBaseURL || '';
    this.templateMessage = data?.templateMessage || new TemplateMessageModel();
  }

  static deserialize(
    apiModel: APITemplateInitialSetting
  ): TemplateInitialSettingModel {
    const data: TemplateInitialSettingModel = {
      sourceNumber: apiModel?.SourceNumber,
      tinyBaseURL: apiModel?.TinyBaseURL,
      templateMessage: TemplateMessageModel.deserialize(apiModel?.SmsTemplate),
    };
    return new TemplateInitialSettingModel(data);
  }
}

export class TemplateMessageModel {
  message: string;
  fromName: string;
  constructor(data?: TemplateMessageModel) {
    this.message = data?.message || '';
    this.fromName = data?.fromName || '';
  }

  static deserialize(apiModel: APISms): TemplateMessageModel {
    const data: TemplateMessageModel = {
      message: apiModel?.MessageHTML,
      fromName: apiModel?.FromName,
    };
    return new TemplateMessageModel(data);
  }
}
