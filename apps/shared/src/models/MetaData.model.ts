import { APIMobilePage, APIMapLocation } from '../interfaces';

export class MetaDataModel {
    pageTitle: string;
    description: string;
    previewImageLink: string;
    metaKeywords: string;
    metaCategories: string;
    noIndex: string;
    accountShortUniqueId: string;
    htmlPageName: string;
    // geoLocationDetails: Array<GEOGraphicsModel>;

    constructor(data?: MetaDataModel) {
        this.pageTitle = data?.pageTitle || '';
        this.description = data?.description || '';
        this.previewImageLink = data?.previewImageLink || '';
        this.metaKeywords = data?.metaKeywords || '';
        this.metaCategories = data?.metaCategories || '';
        this.noIndex = data?.noIndex || '';
        this.accountShortUniqueId = data?.accountShortUniqueId || '';
        this.htmlPageName = data?.htmlPageName || '';
        // this.geoLocationDetails = data?.geoLocationDetails || [];
    }

    static deserialize(apiModel: APIMobilePage): MetaDataModel {
        const data: MetaDataModel = {
            pageTitle: apiModel?.PageDetails?.PageTitle,
            description: apiModel?.PageDetails?.PageDescription,
            previewImageLink: apiModel?.MobilePageSEOPreviewDetails?.ImageLink,
            metaKeywords: apiModel?.SeoSearchDetails?.MetaKeywords,
            metaCategories: apiModel?.SeoSearchDetails?.MetaCategories,
            noIndex: apiModel?.SeoSearchDetails?.IsEnableMobileDiscoveryOnSeo ? 'noindex' : '',
            accountShortUniqueId: apiModel?.AccountShortUniqueId,
            htmlPageName: apiModel?.HtmlPageName,
            // geoLocationDetails: GEOGraphicsModel.deserializeList(apiModel?.GeoLocationDetails),
        };
        return new MetaDataModel(data)
    }
}

export class GEOGraphicsModel {
    latitude: string;
    longitute: string;

    constructor(data?: GEOGraphicsModel) {
        this.latitude = data?.latitude || '';
        this.longitute = data?.longitute || '';
    }

    static deserialize(apiModel: APIMapLocation): GEOGraphicsModel {
        const data: GEOGraphicsModel = {
            latitude: apiModel?.Latitude,
            longitute: apiModel?.Longitutd,
        };
        return new GEOGraphicsModel(data)
    }

    // static deserializeList(apiList: APIGeoLocationDetails[]): GEOGraphicsModel[] {
    //     return apiList
    //         ? apiList.map((apiData: APIGeoLocationDetails) =>
    //             apiData && apiData.Location && apiData.Location.map((apiMapAddress: APIMapAddress) =>
    //                 apiMapAddress && apiMapAddress.Location && apiMapAddress.Location.map((apiMapLocation: APIMapLocation) =>
    //                 return new GEOGraphicsModel.deserialize(apiMapLocation); 
    //             )
    //             )
    //         : [];
    // }
}