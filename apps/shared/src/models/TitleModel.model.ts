import { StyleModel } from './Style.model';
import { APITitle } from '../interfaces';

export class TitleModel {
    text: string;
    styles: StyleModel 

    constructor(data?: TitleModel) {
        this.text = data?.text || '';
        this.styles = data?.styles || new StyleModel(); 
    }

    static deserialize(apiModel: APITitle): TitleModel {
        const data: TitleModel = {
            text: apiModel?.Text, 
            styles: StyleModel.deserialize(apiModel?.Style),
        };
        return new TitleModel(data)
    }
}