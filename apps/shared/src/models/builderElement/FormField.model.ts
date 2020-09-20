import { APIFormFieldsSettings, APIForm, APIFieldsStyle, APIOptions } from '../../interfaces';
import { StyleModel } from './Style.model';
import { Utility } from '../../utilities';

export class OptionModel {
    label: string;
    value: string;

    constructor(data?: OptionModel) {
        this.label = data?.label || "";
        this.value = data?.value || "";
    }

    static deserialize(apiModel: APIOptions): OptionModel {
        const data: OptionModel = {
            value: apiModel?.Id,
            label: apiModel?.OptionText,
        };
        return new OptionModel(data);
    }

    static deserializeList(apiModel: APIOptions[]): OptionModel[] {
        return apiModel
            ? apiModel.map((apiOptions: APIOptions) => OptionModel.deserialize(apiOptions))
            : [];
    }
}

class DateOfBirthModel {
    dob?: string;
    day: number;
    month: number;
    year: number;

    constructor(data?: DateOfBirthModel) {
        this.dob = data?.dob || "";
        this.day = data?.day || 0;
        this.month = data?.month || 0;
        this.year = data?.year || 0;
    }
}

export class FieldModel {
    id: string;
    fieldName: string;
    formFields: string;
    formFieldType: string;
    customFieldId: string;
    customFieldType: string;
    isRequired: boolean;
    birthdayFormatType: string;
    options: Array<OptionModel>;
    value: string;
    errorMessage: string;
    selectedOptions: Array<string>;
    dateOfBirth: DateOfBirthModel;

    constructor(data?: FieldModel) {
        this.id = data?.id || "";
        this.fieldName = data?.fieldName || "";
        this.formFields = data?.formFields || "";
        this.isRequired = data?.isRequired || false;
        this.formFieldType = data?.formFieldType || "";
        this.options = data?.options || [];
        this.customFieldId = data?.customFieldId || "";
        this.customFieldType = data?.customFieldType || "";
        this.birthdayFormatType = data?.birthdayFormatType || "";
        this.value = data?.value || "";
        this.errorMessage = data?.errorMessage || "";
        this.selectedOptions = data?.selectedOptions || [];
        this.dateOfBirth = data?.dateOfBirth || new DateOfBirthModel();
    }

    static deserialize(apiModel: APIFormFieldsSettings): FieldModel {
        const data: FieldModel = {
            id: apiModel?.Id,
            fieldName: apiModel?.FieldName,
            formFields: apiModel?.FormFields,
            isRequired: apiModel?.IsRequired,
            formFieldType: apiModel?.FormFieldType,
            options: OptionModel.deserializeList(apiModel?.Options),
            customFieldId: apiModel?.CustomFieldId,
            customFieldType: apiModel?.CustomFieldType,
            birthdayFormatType: apiModel?.BirthdayFormat,
            value: "",
            errorMessage: "",
            selectedOptions: [],
            dateOfBirth: new DateOfBirthModel()
        };
        return new FieldModel(data);
    }

    static deserializeList(apiModel: APIFormFieldsSettings[]): FieldModel[] {
        return apiModel
            ? apiModel.map((apiFormFieldsSettings: APIFormFieldsSettings) => FieldModel.deserialize(apiFormFieldsSettings))
            : [];
    }
}

export class FormFieldModel {
    fields: Array<FieldModel>;
    labelStyles: StyleModel;
    fieldStyles: StyleModel;
    customFieldSelectStyles: StyleModel;

    constructor(data?: FormFieldModel) {
        this.fields = data?.fields || [];
        this.labelStyles = data?.labelStyles || new StyleModel();
        this.fieldStyles = data?.fieldStyles || new StyleModel();
        this.customFieldSelectStyles = data?.customFieldSelectStyles || new StyleModel();
    }

    static deserialize(apiModel: APIForm): FormFieldModel {
        const data: FormFieldModel = {
            fields: FieldModel.deserializeList(apiModel?.FormFieldsSettings),
            labelStyles: FormFieldModel.deserializeLabelStyles(apiModel?.Style?.FieldsStyle),
            fieldStyles: FormFieldModel.deserializeStyles(apiModel?.Style?.FieldsStyle),
            customFieldSelectStyles: FormFieldModel.deserializeCustomSelectStyles(apiModel?.Style?.FieldsStyle),
        };
        return new FormFieldModel(data);
    }

    static deserializeLabelStyles(apiModel: APIFieldsStyle): StyleModel {
        const data: StyleModel = {
            color: apiModel?.FieldLabelTextColor?.HexValue || Utility.BlackColorCode
        };
        return new StyleModel(data);
    }

    static deserializeStyles(apiModel: APIFieldsStyle): StyleModel {
        const data: StyleModel = {
            color: apiModel?.FieldTextColor?.HexValue || Utility.BlackColorCode,
            backgroundColor: apiModel?.FieldBackgroundColor?.HexValue,
            borderStyle: apiModel?.ElementBorderStyles || "Solid",
            borderColor: apiModel?.BorderColor?.HexValue,
            borderRadius: apiModel?.BorderRadius || '5',
            borderWidth: apiModel?.BorderSize || '1',
            display: "block",
            width: "100%",
            fontSize: "14px",
            lineHeight: "1.42857143",
            height: "44px",
            outline: 'unset',
            paddingTop: '4px',
            paddingBottom: '4px',
            paddingLeft: '8px',
            paddingRight: '8px',
            marginBottom: '5px',
        };
        return new StyleModel(data);
    }

    static deserializeCustomSelectStyles(apiModel: APIFieldsStyle): StyleModel {
        const data: StyleModel = {
            borderColor: apiModel?.BorderColor?.HexValue || 'rgba(199,199,199,1)',
            borderWidth: apiModel?.BorderSize || '1px',
            borderRadius: apiModel?.BorderRadius || '4px',
            borderStyle: apiModel?.ElementBorderStyles || "Solid",
            backgroundColor: apiModel?.FieldBackgroundColor?.HexValue || '#fff',
            color: apiModel?.FieldTextColor?.HexValue || '#333',
            height: "44px",
        };
        return new StyleModel(data);
    }
} 