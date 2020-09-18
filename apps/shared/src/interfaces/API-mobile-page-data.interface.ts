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

export interface IFormData {
  FormFields: Array<IFormFields>;
  CategoryDetail: ICategoryData;
}

export interface IMobilePageData {
  AccountId: string;
  ContactId: string;
  BuilderElementId: string;
  BuilderElement: string;
  FormResponseDetails: IFormData | null;
  BuilderElementUsedInModuleId: string;
  ResponseCapturedFromModule: string;
}