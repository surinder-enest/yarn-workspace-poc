import { APIBuilderElement } from './API-builder-element.interface';

export interface APIEmailTemplate {
  IsEmailTemplateBuilderNotFoundOrDeleted: boolean;
  IsSubAccountDeleted: boolean;
  EmailBuilderComponents: Array<APIBuilderElement>;
}
