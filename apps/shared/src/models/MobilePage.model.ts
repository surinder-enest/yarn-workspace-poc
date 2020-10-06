import { APIContactInfo, APICountriesAndStates, APIMobileData, APIPageStyles, APIStates } from '../interfaces';
import { MetaDataModel, BuilderElementModel, OptionModel, StyleModel } from './builderElement';

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
    id: string;
    name: string;
    email: string;
    mobileNumber: string;
    isNotYouAllowed: boolean;

    constructor(data?: ContactModel) {
        this.id = data?.id || '';
        this.name = data?.name || '';
        this.email = data?.email || '';
        this.mobileNumber = data?.mobileNumber || '';
        this.isNotYouAllowed = data?.isNotYouAllowed || false;
    }

    static deserialize(apiModel: APIContactInfo): ContactModel {
        const data: ContactModel = {
            id: apiModel?.ContactId,
            name: apiModel?.Name,
            email: apiModel?.EmailId,
            mobileNumber: apiModel?.MobilePhone,
            isNotYouAllowed: apiModel?.ContactId ? true : false
        }
        return new ContactModel(data);
    }
}

export class MobilePageModel {
    id: string;
    name: string;
    userId: string;
    accountId: string;
    accountCountryId: string;
    status: string;
    pageLink: string;
    metaData: MetaDataModel;
    pageStyles: StyleModel;
    builderElements: Array<BuilderElementModel>;
    countriesAndStates: Array<CountryModel>;
    contact: ContactModel;

    constructor(data?: MobilePageModel) {
        this.id = data?.id || '';
        this.name = data?.name || '';
        this.userId = data?.userId || '';
        this.accountId = data?.accountId || '';
        this.accountCountryId = data?.accountCountryId || '';
        this.status = data?.status || '';
        this.pageLink = data?.pageLink || '';
        this.pageStyles = data?.pageStyles || new StyleModel();
        this.metaData = data?.metaData || new MetaDataModel();
        this.builderElements = data?.builderElements || [];
        this.countriesAndStates = data?.countriesAndStates || [];
        this.contact = data?.contact || new ContactModel();
    }

    static deserialize(apiModel: APIMobileData): MobilePageModel {
        const data: MobilePageModel = {
            id: apiModel?.MobilePageData?.Id,
            name: apiModel?.MobilePageData?.Name,
            userId: apiModel?.MobilePageData?.UserId,
            accountId: apiModel?.MobilePageData?.AccountId,
            accountCountryId: apiModel?.MobilePageData?.CountryId,
            status: apiModel?.MobilePageData?.Status,
            pageLink: apiModel?.MobilePageData?.PageLink,
            metaData: MetaDataModel.deserialize(apiModel?.MobilePageData),
            pageStyles: MobilePageModel.deserializeStyles(apiModel?.MobilePageData?.PageStyling),
            builderElements: BuilderElementModel.deserializeList(apiModel?.MobilePageData?.MobilePageBuilderComponents, apiModel?.ContactInfo?.ContactId),
            countriesAndStates: CountryModel.deserializeList(apiModel?.CountriesAndStates),
            contact: ContactModel.deserialize(apiModel?.ContactInfo)
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