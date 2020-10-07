import { HttpClient } from './http-client';
import { apiUrl } from './api-urls';
import { FormModel, BuilderElementModel } from '../models';
import {
  IMobilePageData,
  IFormResponse,
  IFormFields,
  IDateOfBirth,
  ICategoryData,
  IContactDetail,
  IContactCaptureData,
  IElementResponse,
  IOfferRedeemRequestViewModelData,
  ISaveContactAndRedeemOfferData,
} from '../interfaces';
import { BUILDER_ELEMENTS, TOAST_TYPE } from '../enums';
import { Toast } from '../components/Toast/Toast';

class BuilderElementService {
  private httpClient = new HttpClient({});

  async saveBuilderElementResponse(
    builderElement: BuilderElementModel,
    moduleId: string,
    contactId: string,
    accountId: string,
    responseCapturedFromModule: string,
    selectedOption: string
  ) {
    const requestModel = this.getMobilePageData(
      builderElement,
      moduleId,
      contactId,
      accountId,
      responseCapturedFromModule,
      selectedOption
    );
    const response = await this.httpClient.post(
      apiUrl.saveBuilderElementResponse,
      requestModel
    );
    const { data } = response;
    if (
      !data.HasException &&
      !data.InvalidModelState &&
      !data.Data.UpdateTimerExpired &&
      !data.Data.HasError &&
      data.Data.SavedData
    ) {
      return true;
    }
    if (data.Data.UpdateTimerExpired) {
      Toast({
        toastType: TOAST_TYPE.WARNING,
        message: 'Your response cannot be modified at this time.',
      });
    } else if (data.Data.HasError) {
      Toast({
        toastType: TOAST_TYPE.ERROR,
        message: 'Unable to submit your response. Please try after some time.',
      });
    } else if (!data.Data.SavedData) {
      Toast({
        toastType: TOAST_TYPE.ERROR,
        message: 'Unable to submit your response. Please try after some time.',
      });
    }
    return false;
  }

  async saveContactCapture(
    builderElementType: string,
    accountId: string,
    builderElementId: string,
    moduleId: string,
    moduleName: string,
    email: string,
    mobileNumber: string
  ) {
    const requestModel = this.getContactCaptureData(
      builderElementType,
      accountId,
      builderElementId,
      moduleId,
      moduleName,
      email,
      mobileNumber
    );
    const response = await this.httpClient.post(
      apiUrl.saveContactCapture,
      requestModel
    );
    const { data } = response;
    if (
      !data.HasException &&
      !data.InvalidModelState &&
      !data.HasError &&
      data.Data
    ) {
      return data.Data;
    }
    return '';
  }

  async saveContactAndRedeemOffer(
    accountId: string,
    builderElementId: string,
    moduleId: string,
    moduleName: string,
    email: string,
    mobileNumber: string,
    contactId: string,
    offerId: string
  ) {
    const requestModel = this.getRedeemOfferData(
      accountId,
      builderElementId,
      moduleId,
      moduleName,
      email,
      mobileNumber,
      contactId,
      offerId
    );
    const response = await this.httpClient.post(
      apiUrl.saveContactAndRedeemOffer,
      requestModel
    );
    const { data } = response;
    if (
      !data.HasException &&
      !data.InvalidModelState &&
      !data.HasError &&
      data.Data
    ) {
      return data.Data;
    }
    return '';
  }

  private getMobilePageData(
    builderElement: BuilderElementModel,
    moduleId: string,
    contactId: string,
    accountId: string,
    responseCapturedFromModule: string,
    selectedOption: string
  ): IMobilePageData {
    const mobilePageData: IMobilePageData = {
      AccountId: accountId,
      ContactId: contactId || null,
      BuilderElementId: builderElement.id,
      BuilderElement: builderElement.builderElementType,
      FormResponseDetails: this.getFormResponseData(
        builderElement.builderElementType,
        builderElement?.form
      ),
      QuestionResponse: this.getElementResponseData(
        builderElement.builderElementType,
        selectedOption
      ),
      PollResponse: this.getElementResponseData(
        builderElement.builderElementType,
        selectedOption
      ),
      FeedbackResponse: this.getElementResponseData(
        builderElement.builderElementType,
        selectedOption
      ),
      BuilderElementUsedInModuleId: moduleId,
      ResponseCapturedFromModule: responseCapturedFromModule,
    };
    return mobilePageData;
  }

  private getFormResponseData(
    builderElementType: string,
    form: FormModel
  ): IFormResponse | null {
    switch (builderElementType) {
      case BUILDER_ELEMENTS.FORM:
        const categoryDetail: ICategoryData = {
          CategoryIds: form?.interest?.selectedOptions,
          CategoryType: 'Interest',
        };
        const formData: IFormResponse = {
          FormFields: form?.fieldDetails?.fields.map(field => {
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
        };
        return formData;

      default:
        return null;
    }
  }

  private getElementResponseData(
    builderElementType: string,
    selectedOption: string
  ): IElementResponse | null {
    switch (builderElementType) {
      case BUILDER_ELEMENTS.QUESTION:
      case BUILDER_ELEMENTS.POLL:
      case BUILDER_ELEMENTS.FEEDBACK:
        const elementResponse: IElementResponse = {
          SelectedOptionId: selectedOption,
        };
        return elementResponse;
      default:
        return null;
    }
  }

  private getContactCaptureData(
    builderElementType: string,
    accountId: string,
    builderElementId: string,
    moduleId: string,
    moduleName: string,
    email: string,
    mobileNumber: string
  ): IContactCaptureData {
    const contactDetailData: IContactDetail = {
      EmailAddress: email,
      MobilePhone: mobileNumber,
    };
    const contactCaptureData: IContactCaptureData = {
      AccountId: accountId,
      BuilderElementId: builderElementId,
      BuilderElementType: builderElementType,
      ContactDetails: contactDetailData,
      ModuleId: moduleId,
      ModuleName: moduleName,
    };
    return contactCaptureData;
  }

  private getRedeemOfferData(
    accountId: string,
    builderElementId: string,
    moduleId: string,
    moduleName: string,
    email: string,
    mobileNumber: string,
    contactId: string,
    offerId: string
  ): ISaveContactAndRedeemOfferData {
    const offerData: IOfferRedeemRequestViewModelData = {
      AccountId: accountId,
      ContactId: contactId || null,
      OfferBuilderElementId: builderElementId,
      OfferElementRenderForModule: moduleName,
      OfferId: offerId,
      SendModuleId: moduleId,
      SendSummaryId: null,
    };
    const contactData: IContactDetail = {
      EmailAddress: email,
      MobilePhone: mobileNumber,
    };
    const redeemOfferData: ISaveContactAndRedeemOfferData = {
      ContactDetails: contactData,
      OfferRedeemRequestViewModel: offerData,
    };
    return redeemOfferData;
  }
}

export default new BuilderElementService();
