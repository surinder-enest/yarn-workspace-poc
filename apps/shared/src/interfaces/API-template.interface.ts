import { APIBuilderElement } from './API-builder-element.interface';

export interface APIEmailTemplate {
  IsEmailTemplateBuilderNotFoundOrDeleted: boolean;
  IsSubAccountDeleted: boolean;
  EmailBuilderComponents: Array<APIBuilderElement>;
}

export interface APISmsTemplate {
  IsSmsTemplateBuilderNotFoundOrDeleted: boolean;
  IsSubAccountDeleted: boolean;
  BuilderElementInitialSetting: APITemplateInitialSetting;
}

export interface APITemplateInitialSetting {
  SourceNumber: number;
  TinyBaseURL: string;
  SmsTemplate: APISms;
}

export interface APISms {
  MessageHTML: string;
  FromName: string;
}
