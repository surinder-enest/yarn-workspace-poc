import { HttpClient } from './http-client';
import { apiUrl } from './api-urls';
import { FormModel, WebFormModel } from '../models';
import { IDateOfBirth, IFormFields, ICategoryData, APIWebformData } from '../interfaces';

class WebFormService {
  private httpClient = new HttpClient({});

  async getWebFormDetailById(accountId: string, webformId: string) {
    try {
      let param = new URLSearchParams();
      param.append('accountId', accountId);
      param.append('webformId', webformId);
      const response = await this.httpClient.get(
        apiUrl.getWebFormDetailById,
        param
      );
      if (response.data.Success) {
        return WebFormModel.deserialize(response.data.Data);
      }
      return WebFormModel;
    } catch (error) {
      console.log('error', error);
      return WebFormModel;
    }
  }

  async formContactCapturingResponse(accountId: string, webformId: string, form: FormModel) {
    try {
      const requestModel = this.getContactCaptureData(accountId, webformId, form);
      const response = await this.httpClient.post(
        apiUrl.webFormContactCapturingResponse,
        requestModel
      );
      return response.data.Data;
    } catch (error) {
      console.log('error', error);
      return ''
    }
  }

  private getContactCaptureData(accountId: string, webformId: string, form: FormModel): APIWebformData {
    const categoryDetail: ICategoryData = {
      CategoryIds: form?.interest?.selectedOptions,
      CategoryType: 'Interest',
    };
    const formData: APIWebformData = {
      FormFieldsData: form?.fieldDetails?.fields.map(field => {
        const dateOfBirth: IDateOfBirth = {
          DOB: field.dateOfBirth.dob,
          Day: field.dateOfBirth.day,
          Month: field.dateOfBirth.month,
          Year: field.dateOfBirth.year,
        };
        const formField: IFormFields = {
          FormFieldId: field.id,
          CustomFieldId: field.customFieldId,
          FieldType: field.formFieldType,
          CustomFieldType: field.customFieldType,
          SelectedMultipleOptionIds: field.selectedOptions,
          FieldResponse: field.value,
          DateOfBirth: dateOfBirth,
        };
        return formField;
      }),
      CategoryDetail: categoryDetail,
      AccountId: accountId,
      WebFormId: webformId
    };
    return formData;
  }
}

export default new WebFormService();
