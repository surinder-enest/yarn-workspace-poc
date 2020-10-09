import { APIWebform } from '../interfaces';
import { FormModel, StyleModel } from './builderElement';
import { CountryModel } from './MobilePage.model';

export class WebFormModel {
  id: string;
  accountId: string;
  type: string;
  layout: string;
  countryId: string;
  style: StyleModel;
  form: FormModel;
  countriesAndStates: Array<CountryModel>;

  constructor(data?: WebFormModel) {
    this.id = data?.id || '';
    this.accountId = data?.accountId || '';
    this.type = data?.type || '';
    this.layout = data?.layout || '';
    this.countryId = data?.countryId || '';
    this.style = data?.style || new StyleModel();
    this.form = data?.form || new FormModel();
    this.countriesAndStates = data?.countriesAndStates || [];
  }

  static deserialize(apiModel: APIWebform): WebFormModel {
    const data: WebFormModel = {
      id: apiModel?.Id,
      accountId: apiModel?.AccountId,
      type: apiModel?.FormType,
      layout: apiModel?.FormLayout,
      countryId: apiModel?.CountryId,
      style: StyleModel.deserialize(apiModel?.Form?.Style),
      form: new FormModel({
        ...FormModel.deserialize(apiModel?.Form),
        styles: new StyleModel()
      }),
      countriesAndStates: CountryModel.deserializeList(
        apiModel?.CountriesAndStates
      ),
    };
    return new WebFormModel(data);
  }

  static deserializeStyle(style: StyleModel): StyleModel {
    return new StyleModel({
      ...style,
      minHeight: '540px',
      maxWidth: '670px',
      borderRadius: '4px',
      backgroundColor: '#FFFFFF',
      // boxShadow: '0 2px 4px 0 #CCCCCC',
      marginLeft: '0 auto',
      marginRight: '0 auto',
      marginTop: '15px',
      marginBottom: '10px',
      paddingTop: '30px',
      paddingBottom: '30px',
      paddingLeft: '30px',
      paddingRight: '30px',
    })
  }
}
