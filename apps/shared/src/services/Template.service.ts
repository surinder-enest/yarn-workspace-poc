import { HttpClient } from './http-client';
import { apiUrl } from './api-urls';
import { EmailTemplateModel, SmsTemplateModel } from '../models';

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

  async getSmsTemplateBuilderDetailForSnapShot(
    smsTemplateId: string,
    subAccountId: string
  ) {
    try {
      let param = new URLSearchParams();
      param.append('smsTemplateId', smsTemplateId);
      param.append('subAccountId', subAccountId);
      const response = await this.httpClient.get(
        apiUrl.getSmsTemplateBuilderDetailForSnapShot,
        param
      );
      if (response.data.Success) {
        return SmsTemplateModel.deserialize(response.data.Data);
      }
      return SmsTemplateModel;
    } catch (error) {
      console.log('error', error);
      return SmsTemplateModel;
    }
  }
}

export default new TemplateService();
