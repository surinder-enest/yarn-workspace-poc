export interface IDateOfBirth {
  DOB?: string;
  Day?: number;
  Month?: number;
  Year?: number;
}

export interface IFormFields {
  FormFieldId: string;
  CustomFieldId: string;
  FieldType: string;
  CustomFieldType: string;
  SelectedMultipleOptionIds: Array<string>;
  FieldResponse: string;
  DateOfBirth: IDateOfBirth;
}

export interface ICategoryData {
  CategoryIds: Array<string>;
  CategoryType: string;
}

export interface IFormResponse {
  FormFields: Array<IFormFields>;
  CategoryDetail: ICategoryData;
}

export interface IElementResponse {
  SelectedOptionId: string;
}

export interface IMobilePageData {
  AccountId: string;
  ContactId: string | null;
  BuilderElementId: string;
  BuilderElement: string;
  FormResponseDetails: IFormResponse | null;
  QuestionResponse: IElementResponse | null;
  PollResponse: IElementResponse | null;
  FeedbackResponse: IElementResponse | null;
  BuilderElementUsedInModuleId: string;
  ResponseCapturedFromModule: string;
}

export interface IContactDetail {
  EmailAddress: string;
  MobilePhone: string;
}

export interface IContactCaptureData {
  AccountId: string;
  BuilderElementId: string;
  BuilderElementType: string;
  ContactDetails: IContactDetail;
  ModuleId: string;
  ModuleName: string;
}
