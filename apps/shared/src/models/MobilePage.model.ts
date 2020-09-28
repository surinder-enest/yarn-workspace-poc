import { MetaDataModel } from './builderElement/MetaData.model';
import { APICountriesAndStates, APIMobileData, APIPageStyles, APIStates } from '../interfaces';
import { BuilderElementModel } from './builderElement/BuilderElement.model';
import { OptionModel } from './builderElement/FormField.model';
import { StyleModel } from './builderElement/Style.model';

export class CountryModel {
    label: string;
    value: string;
    states: Array<OptionModel>;

    constructor(data?: Partial<CountryModel>) {
        this.label = data?.label || '';
        this.value = data?.value || '';
        this.states = data?.states || [];
    }

    static deserialize(apiModel: APICountriesAndStates): CountryModel {
        const data: Partial<CountryModel> = {
            label: apiModel?.Name,
            value: apiModel?.CountryId,
            states: CountryModel.deserializeStateList(apiModel?.States)
        }
        return new CountryModel(data);
    }

    static deserializeList(apiModel: APICountriesAndStates[]): CountryModel[] {
        return apiModel
            ? apiModel.map((apiData) => CountryModel.deserialize(apiData))
            : [];
    }

    static deserializeState(apiModel: APIStates): OptionModel {
        const data: OptionModel = {
            label: apiModel?.Name,
            value: apiModel?.StateId,
        }
        return new OptionModel(data);
    }

    static deserializeStateList(apiModel: APIStates[]): OptionModel[] {
        return apiModel
            ? apiModel.map((apiData) => CountryModel.deserializeState(apiData))
            : [];
    }
}

export class ContactModel {
    email: string;
    mobileNumber: string;

    constructor(data?: ContactModel) {
        this.email = data?.email || '';
        this.mobileNumber = data?.mobileNumber || '';
    }
}

export class MobilePageModel {
    id: string;
    name: string;
    userId: string;
    accountId: string;
    contactId: string;
    accountCountryId: string;
    status: string;
    pageLink: string;
    metaData: MetaDataModel;
    pageStyles: StyleModel;
    builderElements: Array<BuilderElementModel>;
    countriesAndStates: Array<CountryModel>;

    constructor(data?: MobilePageModel) {
        this.id = data?.id || '';
        this.name = data?.name || '';
        this.userId = data?.userId || '';
        this.accountId = data?.accountId || '';
        this.contactId = data?.contactId || '';
        this.accountCountryId = data?.accountCountryId || '';
        this.status = data?.status || '';
        this.pageLink = data?.pageLink || '';
        this.pageStyles = data?.pageStyles || new StyleModel();
        this.metaData = data?.metaData || new MetaDataModel();
        this.builderElements = data?.builderElements || [];
        this.countriesAndStates = data?.countriesAndStates || [];
    }

    static deserialize(apiModel: APIMobileData): MobilePageModel {
        const data: MobilePageModel = {
            id: apiModel?.MobilePageData?.Id,
            name: apiModel?.MobilePageData?.Name,
            userId: apiModel?.MobilePageData?.UserId,
            accountId: apiModel?.MobilePageData?.AccountId,
            contactId: apiModel?.MobilePageData?.ContactInfo?.ContactId,
            accountCountryId: apiModel?.MobilePageData?.CountryId,
            status: apiModel?.MobilePageData?.Status,
            pageLink: apiModel?.MobilePageData?.PageLink,
            metaData: MetaDataModel.deserialize(apiModel?.MobilePageData),
            pageStyles: MobilePageModel.deserializeStyles(apiModel?.MobilePageData?.PageStyling),
            builderElements: BuilderElementModel.deserializeList(apiModel?.MobilePageData?.MobilePageBuilderComponents, apiModel?.MobilePageData?.ContactInfo?.ContactId),
            countriesAndStates: CountryModel.deserializeList(apiModel?.CountriesAndStates)
        };
        return new MobilePageModel(data)
    }

    static deserializeStyles(apiModel: APIPageStyles): StyleModel {
        const data: StyleModel = {
            backgroundColor: apiModel?.Background?.BackgroundColor?.HexValue,
            color: apiModel?.PageColor?.HexValue,
            borderStyle: apiModel?.Border?.ElementBorderStyles,
            borderWidth: `${apiModel?.Border?.BorderSize || 0}px`,
            borderColor: apiModel?.Border?.BorderColor.HexValue,
        };
        return new StyleModel(data)
    }
}