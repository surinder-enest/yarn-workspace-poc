import { apiUrl } from "./api-urls";
import { HttpClient } from "./http-client";
import { toCamel } from "../utils/apiResponse";

class MobilePageService {
    httpClient = new HttpClient({});

    async getMobilePageDetailsForRender(domain: string, directoryId: string, pageName: string) {
        debugger
        try {
            let param = new URLSearchParams();
            param.append('domain', domain);
            param.append('directoryId', directoryId);
            param.append('pageName', pageName);
            const response = await this.httpClient.get(
                apiUrl.getMobilePageDetailsForRender,
                param
            );
            if (response.data.Success) {
                let responseData = toCamel(response.data.Data);
                let mobilePageDetail: any;
                if (responseData) {
                    mobilePageDetail.pageTitle = responseData?.mobilePageData?.pageDetails?.pageTitle || '';
                    mobilePageDetail.pageDescription = responseData?.mobilePageData?.pageDetails?.pageDescription || '';
                    mobilePageDetail.pageSEOPreviewDetails = responseData?.mobilePageData?.mobilePageSEOPreviewDetails || '';
                    mobilePageDetail.previewImageLink = responseData?.mobilePageData?.mobilePageSEOPreviewDetails?.imageLink || '';
                    mobilePageDetail.metaKeywords = responseData?.mobilePageData?.mobilePageSEOPreviewDetails?.metaKeywords || '';
                    mobilePageDetail.isEnableMobileDiscoveryOnSeo = responseData?.mobilePageData?.mobilePageSEOPreviewDetails?.isEnableMobileDiscoveryOnSeo || false;
                    mobilePageDetail.geoLocationAddressDetails = responseData?.mobilePageData?.geoLocationDetails.address || [];
                }
                return mobilePageDetail;
            }
            return '';
        } catch (error) {
            console.log('error', error);
            return '';
        }
    }

}

export default new MobilePageService;