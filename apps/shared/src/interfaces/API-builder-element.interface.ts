import { APIStyle } from './API-style.interface';


export interface APIOptions {
    Id: string;
    OptionText: string;
}

export interface APIFormFieldsSettings {
    Id: string;
    FieldName: string;
    FormFields: string;
    CustomFieldType: string;
    IsShow: boolean;
    IsRequired: boolean;
    FormFieldType: string;
    CustomFieldId: string;
    BirthdayFormat: string;
    Options: Array<APIOptions>;
}

export interface APITitle {
    Text: string;
    Style: APIStyle;
}

export interface APIInterestDetail {
    Id: string;
    CategoryId: string;
    Text: string;
}

export interface APIInterest {
    Title: string;
    IsRequireResponse: boolean;
    ResponseValue: string;
    InterestDetail: Array<APIInterestDetail>;
}

export interface APIForm {
    Title: string;
    Style: APIStyle;
    FormFieldsSettings: Array<APIFormFieldsSettings>;
    Interest: APIInterest;
}

export interface APIBuilderElement {
    Key: string;
    BuilderElementType: string;
    Title: APITitle;
    Form: APIForm;
}