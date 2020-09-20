import { APIAudio } from '../../interfaces';
import { StyleModel } from './Style.model';
import { MEDIA_LINK_TYPE } from '../../enums';
import { Utility } from '../../utilities';

export class AudioModel {
    isDefaultMedia: boolean;
    styles: StyleModel;
    buttonStyles: StyleModel;
    url: string;
    imageUrl: string;
    buttonText: string;
    showType: string;

    constructor(data?: AudioModel) {
        this.isDefaultMedia = data?.isDefaultMedia || false;
        this.styles = data?.styles || new StyleModel();
        this.buttonStyles = data?.buttonStyles || new StyleModel();
        this.url = data?.url || '';
        this.imageUrl = data?.imageUrl || '';
        this.buttonText = data?.buttonText || '';
        this.showType = data?.showType || '';
    }

    static deserialize(apiModel: APIAudio): AudioModel {
        const data: AudioModel = {
            isDefaultMedia: false,
            styles: StyleModel.deserialize(apiModel?.Style),
            buttonStyles: StyleModel.deserializeButtonStyles(apiModel?.Style?.Button),
            url: AudioModel.deserializeUrl(apiModel),
            imageUrl: apiModel?.ImageURL,
            buttonText: apiModel?.ButtonText,
            showType: apiModel?.AudioShowType,
        };
        return new AudioModel(data);
    }

    static deserializeUrl(apiModel: APIAudio): string {
        switch (apiModel?.LinkType) {
            case MEDIA_LINK_TYPE.EMBED_CODE:
                return Utility.getFrameSourceValue(apiModel?.Url);
            default:
                return apiModel?.Url;
        }
    }
}
