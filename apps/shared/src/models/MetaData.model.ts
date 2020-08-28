import { APIMobilePage } from '../interfaces';

export class MetaDataModel {
    pageTitle: string;
    description: string;
    previewImageLink: string;
    metaKeywords: string;
    metaCategories: string;

    constructor(data?: MetaDataModel) {
        this.pageTitle = data?.pageTitle || '';
        this.description = data?.description || '';
        this.previewImageLink = data?.previewImageLink || '';
        this.metaKeywords = data?.metaKeywords || '';
        this.metaCategories = data?.metaCategories || '';
    }

    static deserilize(apiModel: APIMobilePage): MetaDataModel {
        const data: MetaDataModel = {
            pageTitle: apiModel?.PageDetails?.PageTitle,
            description: apiModel?.PageDetails?.PageDescription,
            previewImageLink: apiModel?.MobilePageSEOPreviewDetails?.ImageLink,
            metaKeywords: apiModel?.SeoSearchDetails?.MetaKeywords,
            metaCategories: apiModel?.SeoSearchDetails?.MetaCategories,
        };
        return new MetaDataModel(data)
    }
}