import { StyleModel } from './Style.model';
import { APIForm, APIFormSubmitSettings, APIButton, APIThankYou } from '../interfaces';
import { FormFieldModel } from './FormField.model';
import { InterestModel } from './Interest.model';

class ThankYouModel {
    action: string;
    message: string;
    redirectUrl: string;

    constructor(data?: ThankYouModel) {
        this.action = data?.action || '';
        this.message = data?.message || '';
        this.redirectUrl = data?.redirectUrl || '';
    }

    static deserialize(apiModel: APIThankYou): ThankYouModel {
        const data: ThankYouModel = {
            action: apiModel?.Action,
            message: apiModel?.Message,
            redirectUrl: apiModel?.RedirectUrl,
        };
        return new ThankYouModel(data)
    }
}

export class FormSubmitSettingModel {
    buttonText: string;
    thankYou: ThankYouModel;
    maxMessageLimit: number;
    showTermsAndConditions: boolean;
    requireAcceptance: boolean;
    formSubmitSettingType: string;
    terms: string;

    constructor(data?: FormSubmitSettingModel) {
        this.buttonText = data?.buttonText || '';
        this.thankYou = data?.thankYou || new ThankYouModel();
        this.maxMessageLimit = data?.maxMessageLimit || 5;
        this.showTermsAndConditions = data?.showTermsAndConditions || false;
        this.requireAcceptance = data?.requireAcceptance || false;
        this.formSubmitSettingType = data?.formSubmitSettingType || "";
        this.terms = data?.terms || "";
    }

    static deserialize(apiModel: APIFormSubmitSettings): FormSubmitSettingModel {
        const data: FormSubmitSettingModel = {
            buttonText: apiModel?.ButtonText,
            thankYou: ThankYouModel.deserialize(apiModel?.ThankYou),
            maxMessageLimit: apiModel?.MaxMessageLimit,
            showTermsAndConditions: apiModel?.ShowTermsAndConditions,
            requireAcceptance: apiModel?.RequireAcceptance,
            formSubmitSettingType: apiModel?.FormSubmitSettingType,
            terms: apiModel?.Terms,
        };
        return new FormSubmitSettingModel(data)
    }
}

export class FormModel {
    title: string;
    styles: StyleModel;
    fieldDetails: FormFieldModel;
    interest: InterestModel;
    buttonStyles: StyleModel;
    submitSettings: FormSubmitSettingModel;

    constructor(data?: FormModel) {
        this.title = data?.title || '';
        this.styles = data?.styles || new StyleModel();
        this.fieldDetails = data?.fieldDetails || new FormFieldModel();
        this.interest = data?.interest || new InterestModel();
        this.buttonStyles = data?.buttonStyles || new StyleModel();
        this.submitSettings = data?.submitSettings || new FormSubmitSettingModel();
    }

    static deserialize(apiModel: APIForm): FormModel {
        const data: FormModel = {
            title: apiModel?.Title,
            styles: StyleModel.deserialize(apiModel?.Style),
            fieldDetails: FormFieldModel.deserialize(apiModel),
            interest: InterestModel.deserialize(apiModel),
            buttonStyles: FormModel.deserializeButtonStyles(apiModel?.Style?.Button),
            submitSettings: FormSubmitSettingModel.deserialize(apiModel?.FormSubmitSettings),
        };
        return new FormModel(data)
    }

    static deserializeButtonStyles(apiButtonStyle: APIButton): StyleModel {
        const data: StyleModel = {
            color: apiButtonStyle?.TextColor?.HexValue,
            backgroundColor: apiButtonStyle?.BackgroundColor?.HexValue,
            borderStyle: apiButtonStyle?.ElementBorderStyles,
            borderWidth: apiButtonStyle?.BorderSize,
            borderColor: apiButtonStyle?.BorderColor?.HexValue,
            borderRadius: apiButtonStyle?.BorderRadius,
            display: 'inline-block',
            marginBottom: '0',
            textAlign: 'center',
            lineHeight: '20px',
            fontSize: '18px',
            cursor: 'pointer',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '10px',
            paddingRight: '10px',
            width: '300px'
        };
        return new StyleModel(data)
    }
}
