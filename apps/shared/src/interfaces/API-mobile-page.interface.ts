import { APIPageStyles } from './API-page-styles.interface';
import { APIBuilderElement } from './API-builder-element.interface';

interface APIPageDetail {
    PageTitle: string;
    PageDescription: string;
}

interface APIMobilePageSEOPreviewDetails {
    ImageLink: string;
}

interface APISeoSearchDetails {
    MetaKeywords: string;
    MetaCategories: string;
    IsEnableMobileDiscoveryOnSeo: boolean;
}

export interface APIMapLocation {
    Latitude: string;
    Longitutd: string;
}

export interface APIGeoAddress {
    Location: APIMapLocation
}

export interface APIGeoLocationDetails {
    Address: Array<APIGeoAddress>
}

interface APIContactInfo {
    ContactId: string;
}

export interface APIStates {
    StateId: string;
    Name: string;
}

export interface APICountriesAndStates {
    CountryId: string;
    Name: string;
    States: Array<APIStates>;
}

export interface APIMobilePage {
    Id: string;
    Name: string;
    UserId: string;
    AccountId: string;
    CreatedBy: string;
    UpdatedBy: string;
    Status: string;
    PageLink: string;
    AccountShortUniqueId: string;
    HtmlPageName: string;
    PageDetails: APIPageDetail;
    MobilePageSEOPreviewDetails: APIMobilePageSEOPreviewDetails;
    SeoSearchDetails: APISeoSearchDetails;
    PageStyling: APIPageStyles;
    MobilePageBuilderComponents: Array<APIBuilderElement>;
    GeoLocationDetails: APIGeoLocationDetails;
    ContactInfo: APIContactInfo;
    CountryId: string;
}

export interface APIMobileData {
    MobilePageData: APIMobilePage;
    CountriesAndStates: Array<APICountriesAndStates>;
}