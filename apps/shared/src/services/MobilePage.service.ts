import { HttpClient } from './http-client';
import { apiUrl } from './api-urls';
import { MobilePageModel } from '../models';

class MobilePageService {
    private httpClient = new HttpClient({});

    async getMobilePageDetailsForRender(domain: string, directoryId: string, pageName: string) {

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
                return MobilePageModel.deserialize(response.data.Data);
            }
            return MobilePageModel;
        } catch (error) {
            console.log('error', error);
            return MobilePageModel;
        }
    }
}

export default new MobilePageService;