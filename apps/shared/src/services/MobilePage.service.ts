import { HttpClient } from './http-client';
import { apiUrl } from './api-urls';
import { MobilePageModel } from '../models';

class MobilePageService {
  private httpClient = new HttpClient({});

  async getMobilePageDetailsForRender(
    domain: string,
    directoryId: string,
    pageName: string,
    contactId?: string
  ) {
    try {
      let param = new URLSearchParams();
      param.append('domain', domain);
      param.append('directoryId', directoryId);
      param.append('pageName', pageName);
      if (contactId) {
        param.append('contactId', contactId);
      }
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

  async saveMobilePageOpenDetails(
    accountId: string,
    mobilePageId: string,
    contactId?: string
  ) {
    try {
      let param = new URLSearchParams();
      param.append('accountId', accountId);
      param.append('mobilePageId', mobilePageId);
      param.append('contactId', contactId || '');
      if (contactId) {
        param.append('contactId', contactId);
      }
      const response = await this.httpClient.post(
        `${apiUrl.saveMobilePageOpenDetails}?${param}`,
        param
      );
      //   if (response.data.Success) {
      //     return MobilePageModel.deserialize(response.data.Data);
      //   }
      console.log(response);
      return response;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }
}

export default new MobilePageService();
