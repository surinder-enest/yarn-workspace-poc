import { BaseModel } from './Base.model';
import { MetaDataModel } from './MetaData.model';
import { APIMobilePage } from '../interfaces';
import { PageStylesModel } from './PageStyling.model';
import { BuilderElementModel } from './BuilderElement.model';

export class MobilePageModel extends BaseModel {
    name: string;
    userId: string;
    status: string;
    accountShortUniqueId: string;
    htmlPageName: string;
    metaData: MetaDataModel;
    pageStyles: PageStylesModel;
    builderElements: Array<any>;

    constructor(data?: Partial<MobilePageModel>) {
        super(data);
        this.name = data?.name || '';
        this.userId = data?.userId || '';
        this.status = data?.status || '';
        this.accountShortUniqueId = data?.accountShortUniqueId || '';
        this.htmlPageName = data?.htmlPageName || '';
        this.pageStyles = data?.pageStyles || new PageStylesModel();
        this.metaData = data?.metaData || new MetaDataModel();
        this.builderElements = data?.builderElements || [];
    }

    static deserialize(apiModel: APIMobilePage): MobilePageModel {
        const data: Partial<MobilePageModel> = {
            id: apiModel?.Id,
            name: apiModel?.Name,
            userId: apiModel?.UserId,
            status: apiModel?.Status,
            metaData: MetaDataModel.deserialize(apiModel),
            pageStyles: PageStylesModel.deserialize(apiModel?.PageStyling),
            builderElements: BuilderElementModel.deserializeList(apiModel?.MobilePageBuilderComponents),
        };
        return new MobilePageModel(data)
    }
}