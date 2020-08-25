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
                return toCamel(response.data.Data);
            }
            return '';
        } catch (error) { 
            console.log('error', error);
            return '';
        }
    }

}

export default new MobilePageService;