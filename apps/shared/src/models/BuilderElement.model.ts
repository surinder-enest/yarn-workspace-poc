import { TitleModel } from './TitleModel.model';
import { APIBuilderElement } from '../interfaces';


export class BuilderElementModel {
    key: string;
    builderElementType: string;
    title: TitleModel;

    constructor(data?: BuilderElementModel) {
        this.key = data?.key || '';
        this.builderElementType = data?.builderElementType || '';
        this.title = data?.title || new TitleModel();
    }

    static deserialize(apiModel: APIBuilderElement): BuilderElementModel {
         const data: BuilderElementModel = {
            key: apiModel?.Key,
            builderElementType: apiModel?.BuilderElementType,
            title: TitleModel.deserialize(apiModel?.Title),
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