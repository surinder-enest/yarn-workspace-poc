

export class BaseModel {
    id: string;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
    createdByUserId: string;
    updatedByUserId: string;
    isDeleted: boolean;

    constructor(parms?: Partial<BaseModel>) {
        this.id = parms?.id || '';
        this.createdDate = parms?.createdDate || '';
        this.updatedDate = parms?.updatedDate || '';
        this.createdBy = parms?.createdBy || '';
        this.updatedBy = parms?.updatedBy || '';
        this.createdByUserId = parms?.createdByUserId || '';
        this.updatedByUserId = parms?.updatedByUserId || '';
        this.isDeleted = parms?.isDeleted || false;
    }
}
