import { APIMobilePage, APIGeoAddress } from '../../interfaces';
import { LocationModel } from './Map.model';

export class MetaDataModel {
  pageTitle: string;
  description: string;
  previewImageLink: string;
  metaKeywords: string;
  metaCategories: string;
  noIndex: string;
  accountShortUniqueId: string;
  htmlPageName: string;
  geoLocationDetails: Array<LocationModel>;

  constructor(data?: MetaDataModel) {
    this.pageTitle = data?.pageTitle || '';
    this.description = data?.description || '';
    this.previewImageLink = data?.previewImageLink || '';
    this.metaKeywords = data?.metaKeywords || '';
    this.metaCategories = data?.metaCategories || '';
    this.noIndex = data?.noIndex || '';
    this.accountShortUniqueId = data?.accountShortUniqueId || '';
    this.htmlPageName = data?.htmlPageName || '';
    this.geoLocationDetails = data?.geoLocationDetails || [];
  }

  static deserialize(apiModel: APIMobilePage): MetaDataModel {
    const data: MetaDataModel = {
      pageTitle: apiModel?.PageDetails?.PageTitle,
      description: apiModel?.PageDetails?.PageDescription,
      previewImageLink: apiModel?.MobilePageSEOPreviewDetails?.ImageLink,
      metaKeywords: apiModel?.SeoSearchDetails?.MetaKeywords,
      metaCategories: apiModel?.SeoSearchDetails?.MetaCategories,
      noIndex: apiModel?.SeoSearchDetails?.IsEnableMobileDiscoveryOnSeo
        ? 'noindex'
        : '',
      accountShortUniqueId: apiModel?.AccountShortUniqueId,
      htmlPageName: apiModel?.HtmlPageName,
      geoLocationDetails: MetaDataModel.deserializeGeographicalList(
        apiModel?.GeoLocationDetails?.Address
      ),
    };
    return new MetaDataModel(data);
  }

  static deserializeGeographicalList(
    apiList: APIGeoAddress[]
  ): LocationModel[] {
    return apiList
      ? apiList.map((apiAddress: APIGeoAddress) => {
          return LocationModel.deserialize(apiAddress?.Location);
        })
      : [];
  }
}
