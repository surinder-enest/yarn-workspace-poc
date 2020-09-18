import { HttpClient } from './http-client';
import { apiUrl } from './api-urls';
import { FormModel, BuilderElementModel } from '../models';
import { IMobilePageData, IFormData, IFormFields, IDateOfBirth, ICategoryData } from '../interfaces';
import { BUILDER_ELEMENTS } from '../enums';

class BuilderElementService {
  private httpClient = new HttpClient({});

  async saveBuilderElementResponse(builderElement: BuilderElementModel,
    moduleId: string, contactId: string, accountId: string,
    responseCapturedFromModule: string) {
    const requestModel = this.mobilePageData(builderElement, moduleId, contactId, accountId, responseCapturedFromModule);
    const response = await this.httpClient.post(
      apiUrl.saveBuilderElementResponse,
      requestModel
    );

    const { data } = response;
    if (!data.HasException && !data.InvalidModelState
      && !data.UpdateTimerExpired && !data.HasError && data.SavedData) {
      return true;
    }

    return false;
  }

  private mobilePageData(builderElement: BuilderElementModel, moduleId: string,
    contactId: string, accountId: string, responseCapturedFromModule: string) {
    const mobilePageData: IMobilePageData = {
      AccountId: accountId,
      ContactId: contactId,
      BuilderElementId: builderElement.id,
      BuilderElement: builderElement.builderElementType,
      FormResponseDetails: this.formData(builderElement.builderElementType, builderElement?.form),
      BuilderElementUsedInModuleId: moduleId,
      ResponseCapturedFromModule: responseCapturedFromModule,
    }
    return mobilePageData;
  }

  private formData(builderElementType: string, form: FormModel) {
    switch (builderElementType) {
      case BUILDER_ELEMENTS.FORM:
        const categoryDetail: ICategoryData = {
          CategoryIds: form?.interest?.selectedOptions,
          CategoryType: "Interest"
        }
        const formData: IFormData = {
          FormFields: form?.fieldDetails?.fields.map((field) => {
            const dateOfBirth: IDateOfBirth = {
              DOB: field.dateOfBirth.dob,
              Day: field.dateOfBirth.day,
              Month: field.dateOfBirth.month,
              Year: field.dateOfBirth.year,
            }
            const formField: IFormFields = {
              FormFieldId: field.id,
              CustomFieldId: field.customFieldId,
              FieldType: field.formFieldType,
              CustomFieldType: field.customFieldType,
              SelectedMultipleOptionIds: field.selectedOptions,
              FieldResponse: field.value,
              DateOfBirth: dateOfBirth
            }
            return formField;
          }),
          CategoryDetail: categoryDetail
        }
        return formData;

      default:
        return null;
    }
  }
}

export default new BuilderElementService;