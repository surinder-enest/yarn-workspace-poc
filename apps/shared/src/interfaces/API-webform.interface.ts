import { APIForm } from './API-builder-element.interface';
import { ICategoryData, IFormFields } from './API-mobile-page-data.interface';
import { APICountriesAndStates } from './API-mobile-page.interface';


export interface APIWebform {
  Id: string;
  FormType: string;
  FormLayout: string;
  CountryId: string;
  AccountId: string;
  Form: APIForm;
  CountriesAndStates: Array<APICountriesAndStates>;
}

export interface APIWebformData {
  AccountId: string;
  WebFormId: string;
  CategoryDetail: ICategoryData;
  FormFieldsData: Array<IFormFields>;
}