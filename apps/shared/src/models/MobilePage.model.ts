import { BaseModel } from './Base.model';
import { MetaDataModel } from './MetaData.model';
import { APIMobilePage } from '../interfaces';
import { PageStylesModel } from './PageStyling.model';
import { BuilderElementModel } from './BuilderElement.model';

export class MobilePageModel extends BaseModel {
    name: string;
    userId: string;
    accountId: string;
    contactId: string;
    status: string;
    pageLink: string;
    metaData: MetaDataModel;
    pageStyles: PageStylesModel;
    builderElements: Array<BuilderElementModel>;

    constructor(data?: Partial<MobilePageModel>) {
        super(data);
        this.name = data?.name || '';
        this.userId = data?.userId || '';
        this.accountId = data?.accountId || '';
        this.contactId = data?.contactId || '';
        this.status = data?.status || '';
        this.pageLink = data?.pageLink || '';
        this.pageStyles = data?.pageStyles || new PageStylesModel();
        this.metaData = data?.metaData || new MetaDataModel();
        this.builderElements = data?.builderElements || [];
    }

    static deserialize(apiModel: APIMobilePage): MobilePageModel {
        const data: Partial<MobilePageModel> = {
            id: apiModel?.Id,
            name: apiModel?.Name,
            userId: apiModel?.UserId,
            accountId: apiModel?.AccountId,
            contactId: apiModel?.ContactInfo?.ContactId,
            createdBy: apiModel?.CreatedBy,
            updatedBy: apiModel?.UpdatedBy,
            status: apiModel?.Status,
            pageLink: apiModel?.PageLink,
            metaData: MetaDataModel.deserialize(apiModel),
            pageStyles: PageStylesModel.deserialize(apiModel?.PageStyling),
            builderElements: BuilderElementModel.deserializeList(apiModel?.MobilePageBuilderComponents),
        };
        return new MobilePageModel(data)
    }
}