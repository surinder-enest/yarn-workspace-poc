import { StyleModel } from './Style.model';
import { APIForm, APIInterestDetail, APIInterestStyles } from '../interfaces';

export class InterestOptionModel {
    id: string;
    text: string;

    constructor(data?: InterestOptionModel) {
        this.id = data?.id || '';
        this.text = data?.text || '';
    }
    static deserialize(apiModel: APIInterestDetail): InterestOptionModel {
        const data: InterestOptionModel = {
            id: apiModel?.Id,
            text: apiModel?.Text,
        };
        return new InterestOptionModel(data)
    }
    static deserializeList(apiModel: APIInterestDetail[]): InterestOptionModel[] {
        return apiModel
            ? apiModel.map((apiOptions: APIInterestDetail) => InterestOptionModel.deserialize(apiOptions))
            : [];
    }
}

export class InterestModel {
    title: string;
    optionStyles: StyleModel;
    optionLabelStyles: StyleModel;
    isRequireResponse: boolean;
    options: Array<InterestOptionModel>;

    constructor(data?: InterestModel) {
        this.title = data?.title || '';
        this.optionStyles = data?.optionStyles || new StyleModel();
        this.optionLabelStyles = data?.optionLabelStyles || new StyleModel();
        this.isRequireResponse = data?.isRequireResponse || false;
        this.options = data?.options || [];
    }

    static deserialize(apiModel: APIForm): InterestModel {
        const data: InterestModel = {
            title: apiModel?.Interest?.Title,
            isRequireResponse: apiModel?.Interest?.IsRequireResponse,
            optionStyles: InterestModel.deserializeOptionStyles(apiModel?.Style?.InterestStyles),
            optionLabelStyles: InterestModel.deserializeOptionLabelStyles(apiModel?.Style?.InterestStyles),
            options: InterestOptionModel.deserializeList(apiModel?.Interest?.InterestDetail),
        };
        return new InterestModel(data)
    }

    static deserializeOptionStyles(apiModel: APIInterestStyles): StyleModel {
        const data: StyleModel = {
            backgroundColor: apiModel?.BackgroundColor?.HexValue,
            paddingTop: '12px',
            width: '100%',
            float: 'left',
            borderRadius: '100px',
            paddingBottom: '10px',
            marginTop: '5px'
        };
        return new StyleModel(data);
    }

    static deserializeOptionLabelStyles(apiModel: APIInterestStyles): StyleModel {
        const data: StyleModel = {
            color: apiModel?.TextColor?.HexValue,
            minHeight: '15px',
        };
        return new StyleModel(data);
    }
}
