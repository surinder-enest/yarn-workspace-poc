import { StyleModel } from './Style.model';
import { APIForm, APIInterestDetail, APIInterestStyles } from '../interfaces';
import { INTEREST_RESPONSE_VALUES } from '../enums';

export class InterestOptionModel {
    id: string;
    text: string;
    categoryId: string;

    constructor(data?: InterestOptionModel) {
        this.id = data?.id || '';
        this.text = data?.text || '';
        this.categoryId = data?.categoryId || '';
    }
    static deserialize(apiModel: APIInterestDetail): InterestOptionModel {
        const data: InterestOptionModel = {
            id: apiModel?.Id,
            text: apiModel?.Text,
            categoryId: apiModel?.CategoryId,
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
    responseValue: number;
    options: Array<InterestOptionModel>;
    selectedOptions: Array<string>;

    constructor(data?: InterestModel) {
        this.title = data?.title || '';
        this.optionStyles = data?.optionStyles || new StyleModel();
        this.optionLabelStyles = data?.optionLabelStyles || new StyleModel();
        this.isRequireResponse = data?.isRequireResponse || false;
        this.options = data?.options || [];
        this.responseValue = data?.responseValue || -1;
        this.selectedOptions = data?.selectedOptions || [];
    }

    static deserialize(apiModel: APIForm): InterestModel {
        const data: InterestModel = {
            title: apiModel?.Interest?.Title,
            isRequireResponse: apiModel?.Interest?.IsRequireResponse,
            responseValue: InterestModel.deserializeResponseValue(apiModel?.Interest?.ResponseValue),
            optionStyles: InterestModel.deserializeOptionStyles(apiModel?.Style?.InterestStyles),
            optionLabelStyles: InterestModel.deserializeOptionLabelStyles(apiModel?.Style?.InterestStyles),
            options: InterestOptionModel.deserializeList(apiModel?.Interest?.InterestDetail),
            selectedOptions: [],
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

    static deserializeResponseValue(apiResponseValue: string): number {
        let responseValue = -1;
        switch (apiResponseValue) {
            case INTEREST_RESPONSE_VALUES.UPTO_ONE_INTEREST:
                responseValue = 1;
                break;
            case INTEREST_RESPONSE_VALUES.UPTO_TWO_INTEREST:
                responseValue = 2;
                break;
            case INTEREST_RESPONSE_VALUES.UPTO_THREE_INTEREST:
                responseValue = 3;
                break;
            case INTEREST_RESPONSE_VALUES.UPTO_FOUR_INTEREST:
                responseValue = 4;
                break;
            case INTEREST_RESPONSE_VALUES.UPTO_FIVE_INTEREST:
                responseValue = 5;
                break;
        }
        return responseValue;
    }
}
