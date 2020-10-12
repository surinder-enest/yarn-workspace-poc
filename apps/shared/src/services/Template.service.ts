import { HttpClient } from './http-client';
import { apiUrl } from './api-urls';
import { EmailTemplateModel } from '../models';

class TemplateService {
  private httpClient = new HttpClient({});

  async getEmailTemplateBuilderDetailForSnapShot(
    emailTemplateId: string,
    subAccountId: string
  ) {
    try {
      let param = new URLSearchParams();
      param.append('emailTemplateId', emailTemplateId);
      param.append('subAccountId', subAccountId);
      const response = await this.httpClient.get(
        apiUrl.getEmailTemplateBuilderDetailForSnapShot,
        param
      );
      if (response.data.Success) {
        return EmailTemplateModel.deserialize(response.data.Data);
      }
      return EmailTemplateModel;
    } catch (error) {
      console.log('error', error);
      return EmailTemplateModel;
    }
  }
}

export default new TemplateService();
