import { BaseModel } from './Base.model';
import { MetaDataModel } from './MetaData.model';
import { APIMobilePage } from '../interfaces';
import { PageStylesModel } from './PageStyling.model';

export class MobilePageModel extends BaseModel {
    name: string;
    userId: string;
    status: string;
    pageLink: string;
    metaData: MetaDataModel;
    pageStyles: PageStylesModel;

    constructor(data?: Partial<MobilePageModel>) {
        super(data);
        this.name = data?.name || '';
        this.userId = data?.userId || '';
        this.status = data?.status || '';
        this.pageLink = data?.pageLink || '';
        this.pageStyles = data?.pageStyles || new PageStylesModel();
        this.metaData = data?.metaData || new MetaDataModel();
    }

    static deserilize(apiModel: APIMobilePage): MobilePageModel {
        const data: Partial<MobilePageModel> = {
            id: apiModel?.Id,
            name: apiModel?.Name,
            userId: apiModel?.UserId,
            status: apiModel?.Status,
            pageLink: apiModel?.PageLink,
            metaData: MetaDataModel.deserilize(apiModel),
            pageStyles: PageStylesModel.deserilize(apiModel?.PageStyling),
        };
        return new MobilePageModel(data)
    }
}