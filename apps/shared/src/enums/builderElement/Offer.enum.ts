export enum OFFER_LAYOUT_TYPE {
    CUSTOM = 'Custom',
    PRE_DEFINED_WITH_IMAGE = 'PreDefinedWithImage',
}

export enum Scan_Type {
    NONE = 'None',
    BAR_CODE = 'BarCode',
    QR_CODE = 'QrCode',
};

export enum TERMS_TYPE {
    SETTINGS = 'Settings',
    CUSTOM = 'Custom',
};

export enum OFFER_REDEEMED_STATUS {
    None = 'None',
    SEND_DETAILS_NOT_FOUND = 'SendDetailsNotFound',
    REDEEMED = 'Redeemed',
    EXPIRED = 'Expired',
    OFFER_INACTIVE = 'OfferInactive',
    OFFER_DELETED_OR_NOT_FOUND = 'OfferDeletedOrNotFound',
    OFFER_AVAILABLE_IN_FUTURE = 'OfferAvailableInFuture',
    MAX_REDEMPTION_LIMIT_REACHED = 'MaxRedemptionLimitReached',
    CANCELLED = 'Cancelled',
    ALREADY_REDEEMED = 'AlreadyRedeemed',
};

export enum REDEMPTION_ACTION_TYPE {
    SHOW_MESSAGE = 'ShowMessage',
    NONE = 'None',
};