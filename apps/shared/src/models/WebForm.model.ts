import { APIBackground, APIStyle, APIWebform } from '../interfaces';
import { Utility } from '../utilities';
import { FormModel, StyleModel } from './builderElement';
import { CountryModel } from './MobilePage.model';

export class WebFormModel {
  id: string;
  accountId: string;
  type: string;
  layout: string;
  countryId: string;
  imageUrl: string;
  style: StyleModel;
  modalCloseIconStyle: StyleModel;
  imageStyle: StyleModel;
  form: FormModel;
  countriesAndStates: Array<CountryModel>;

  constructor(data?: WebFormModel) {
    this.id = data?.id || '';
    this.accountId = data?.accountId || '';
    this.type = data?.type || '';
    this.layout = data?.layout || '';
    this.countryId = data?.countryId || '';
    this.imageUrl = data?.imageUrl || '';
    this.style = data?.style || new StyleModel();
    this.modalCloseIconStyle = data?.modalCloseIconStyle || new StyleModel();
    this.imageStyle = data?.imageStyle || new StyleModel();
    this.form = data?.form || new FormModel();
    this.countriesAndStates = data?.countriesAndStates || [];
  }

  static deserialize(apiModel: APIWebform): WebFormModel {
    if (apiModel?.Form?.Style) {
      apiModel.Form.Style.FieldsStyle = apiModel?.FieldsStyle;
    }
    const data: WebFormModel = {
      id: apiModel?.Id,
      accountId: apiModel?.AccountId,
      type: apiModel?.FormType,
      layout: apiModel?.FormLayout,
      countryId: apiModel?.CountryId,
      style: StyleModel.deserialize(apiModel?.Form?.Style),
      modalCloseIconStyle: new StyleModel({
        backgroundColor: apiModel?.Form?.Style?.Background?.CloseIconColor?.HexValue
      }),
      imageUrl: apiModel?.Form?.Style?.Background?.Url,
      imageStyle: WebFormModel.deserializeImageStyle(apiModel?.Form?.Style),
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

  static deserializeImageStyle(apiStyle: APIStyle): StyleModel {
    return new StyleModel({
      background: WebFormModel.deserializeImageBackground(apiStyle?.Background),
      minHeight: '300px',
      opacity: ((apiStyle?.Background?.Opacity || 1) / 100).toString(),
      backgroundColor: "#D6DCE0",
    })
  }
  static deserializeImageBackground(apiBackground: APIBackground): string {
    const {
      Url,
      ImagePosition,
      BackgroundRepeat,
      Size,
      IsCoverBackground
    } = apiBackground;
    return `${Url ? `url(${Utility.replace(Url, ' ', '%20')}) ` : 'none'} 
        ${Utility.addStringBeforeCapitalLetter(ImagePosition, ' ').toLowerCase()} / ${IsCoverBackground ? 'cover' : Size} 
        ${Utility.addStringBeforeCapitalLetter(BackgroundRepeat, '-').toLowerCase()}`
  }
}
