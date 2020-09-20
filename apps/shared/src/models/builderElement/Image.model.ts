import { APIImage } from '../../interfaces';
import { Utility } from '../../utilities';
import { StyleModel } from './Style.model';

export class ImageModel {
    styles: StyleModel;
    url: string;
    caption: string;
    isClickable: boolean;
    clickValue: string;

    constructor(data?: ImageModel) {
        this.styles = data?.styles || new StyleModel();
        this.url = data?.url || '';
        this.caption = data?.caption || '';
        this.isClickable = data?.isClickable || false;
        this.clickValue = data?.clickValue || '';
    }

    static deserialize(apiModel: APIImage, contactId: string): ImageModel {
        const data: ImageModel = {
            styles: StyleModel.deserialize(apiModel?.Style),
            url: apiModel?.ImageUrl,
            caption: apiModel?.Caption,
            isClickable: apiModel?.IsClickable,
            clickValue: Utility.getValueWithClickType(apiModel?.Type, apiModel?.Value, apiModel?.RedirectUrl, contactId),
        };
        return new ImageModel(data);
    }
}
