import { StyleModel } from './Style.model';
import { APIForm, APIFormSubmitSettings, APIButton } from '../interfaces';
import { FormFieldModel } from './FormField.model';
import { InterestModel } from './Interest.model';

class FormSubmitSettingModel {
    buttonText: string;

    constructor(data?: FormSubmitSettingModel) {
        this.buttonText = data?.buttonText || '';
    }

    static deserialize(apiModel: APIFormSubmitSettings): FormSubmitSettingModel {
        const data: FormSubmitSettingModel = {
            buttonText: apiModel?.ButtonText,
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
    formSubmitSettings: FormSubmitSettingModel;

    constructor(data?: FormModel) {
        this.title = data?.title || '';
        this.styles = data?.styles || new StyleModel();
        this.fieldDetails = data?.fieldDetails || new FormFieldModel();
        this.interest = data?.interest || new InterestModel();
        this.buttonStyles = data?.buttonStyles || new StyleModel();
        this.formSubmitSettings = data?.formSubmitSettings || new FormSubmitSettingModel();
    }

    static deserialize(apiModel: APIForm): FormModel {
        const data: FormModel = {
            title: apiModel?.Title,
            styles: StyleModel.deserialize(apiModel?.Style),
            fieldDetails: FormFieldModel.deserialize(apiModel),
            interest: InterestModel.deserialize(apiModel),
            buttonStyles: FormModel.deserializeButtonStyles(apiModel?.Style?.Button),
            formSubmitSettings: FormSubmitSettingModel.deserialize(apiModel?.FormSubmitSettings),
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
