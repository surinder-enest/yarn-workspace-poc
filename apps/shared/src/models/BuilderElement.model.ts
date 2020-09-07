import { TitleModel } from './Title';
import { APIBuilderElement } from '../interfaces';
import { FormModel } from './Form.model';


export class BuilderElementModel {
    id: string;
    key: string;
    builderElementType: string;
    title: TitleModel;
    form: FormModel;

    constructor(data?: BuilderElementModel) {
        this.id = data?.id || '';
        this.key = data?.key || '';
        this.builderElementType = data?.builderElementType || '';
        this.title = data?.title || new TitleModel();
        this.form = data?.form || new FormModel();
    }

    static deserialize(apiModel: APIBuilderElement): BuilderElementModel {
        const data: BuilderElementModel = {
            id: apiModel?.Id,
            key: apiModel?.Key,
            builderElementType: apiModel?.BuilderElementType,
            title: TitleModel.deserialize(apiModel?.Title),
            form: FormModel.deserialize(apiModel?.Form),
        };
        return new BuilderElementModel(data)
    }


    static deserializeList(apiBuilderElementList: APIBuilderElement[]): BuilderElementModel[] {
        return apiBuilderElementList
            ? apiBuilderElementList.map((apiBuilderElement: APIBuilderElement) =>
                new BuilderElementModel(BuilderElementModel.deserialize(apiBuilderElement)))
            : [];
    }
}