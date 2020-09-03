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

export interface APIMapAddress {
    Location: Array<APIMapLocation>
}

export interface APIGeoLocationDetails {
    Location: Array<APIMapAddress>
}

export interface APIMobilePage {
    Id: string;
    Name: string;
    UserId: string;
    Status: string;
    PageLink: string;
    AccountShortUniqueId: string;
    HtmlPageName: string;
    PageDetails: APIPageDetail;
    MobilePageSEOPreviewDetails: APIMobilePageSEOPreviewDetails;
    SeoSearchDetails: APISeoSearchDetails;
    PageStyling: APIPageStyles;
    MobilePageBuilderComponents: Array<APIBuilderElement>;
    GeoLocationDetails: Array<APIGeoLocationDetails>;
}