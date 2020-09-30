import { APIBuilderElement } from './API-builder-element.interface';
import { APIBackground, APIBorder, APIColor } from './API-style.interface';

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

export interface APIContactInfo {
    Name: string;
    ContactId: string;
    EmailId: string;
    MobilePhone: string;
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


export interface APIPageStyles {
    Background: APIBackground;
    Border: APIBorder;
    PageColor: APIColor;
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