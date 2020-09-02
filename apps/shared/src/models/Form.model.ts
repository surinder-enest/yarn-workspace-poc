import { StyleModel } from './Style.model';
import { APIForm } from '../interfaces';
import { FormFieldModel } from './FormField.model';
import { InterestModel } from './Interest.model';


export class FormModel {
    title: string;
    styles: StyleModel;
    field: FormFieldModel;
    interest: InterestModel;

    constructor(data?: FormModel) {
        this.title = data?.title || '';
        this.styles = data?.styles || new StyleModel();
        this.field = data?.field || new FormFieldModel();
        this.interest = data?.interest || new InterestModel();
    }

    static deserialize(apiModel: APIForm): FormModel {
        const data: FormModel = {
            title: apiModel?.Title,
            styles: StyleModel.deserialize(apiModel?.Style),
            field: FormFieldModel.deserialize(apiModel),
            interest: InterestModel.deserialize(apiModel),
        };
        return new FormModel(data)
    }
}
