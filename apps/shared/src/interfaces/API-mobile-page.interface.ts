import { APIPageStyles } from './API-PageStyles.interface';

interface APIPageDetail {
    PageTitle: string;
    PageDescription: string;
}

interface MobilePageSEOPreviewDetails {
    ImageLink: string;
}

interface SeoSearchDetails {
    MetaKeywords: string;
    MetaCategories: string;
}

export interface APIMobilePage {
    Id: string;
    Name: string;
    UserId: string;
    Status: string;
    PageLink: string;
    PageDetails: APIPageDetail;
    MobilePageSEOPreviewDetails: MobilePageSEOPreviewDetails;
    SeoSearchDetails: SeoSearchDetails;
    PageStyling: APIPageStyles;
}