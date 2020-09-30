import React, { Component, ReactNode } from 'react';
import {
  BUILDER_ELEMENTS,
  CONTACT_FIELD_OPTION,
  MEDIA_TYPE,
  OFFER_LAYOUT_TYPE,
  Scan_Type,
  OFFER_REDEEMED_STATUS,
  REDEMPTION_ACTION_TYPE,
} from '../../../enums';
import { OfferModel } from '../../../models';
import { BuilderElementService } from '../../../services';
import CustomBarCode from '../../CustomBarCode/CustomBarCode';
import CustomQRCode from '../../CustomQRCode/CustomQRCode';
import { Contact, Media } from '../ResponseElement';

interface IProps {
  offer: OfferModel;
  isActualRendering: boolean;
  elementId: string;
  moduleId: string;
  contactId: string;
  accountId: string;
  responseCapturedFromModule: string;
}

interface IState {
  isRedeemButtonClick: boolean;
  email: string;
  mobileNumber: string;
  isValidContactFields: boolean;
  isRedeemed: boolean;
  redeemedStatus: string;
  isShowTerms: boolean;
}

export default class Offer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isRedeemButtonClick: false,
      email: '',
      mobileNumber: '',
      isValidContactFields: false,
      isRedeemed: false,
      redeemedStatus: '',
      isShowTerms: !props.offer.isHideTermsInExpandableArea,
    };
  }

  private getComplianceText(): string {
    const { contactFieldType } = this.props.offer;
    switch (contactFieldType) {
      case CONTACT_FIELD_OPTION.EMAIL_AND_MOBILE:
        return 'You agree to opt-in to recieve Email and Text notification, offer, alerts and news. Msg and data rates apply. Text STOP to end. Up to 5 msg/mo.';
      case CONTACT_FIELD_OPTION.EMAIL_ONLY:
        return 'You agree to opt-in to recieve Email notification, offer, alerts and news. You may update your preferences or unsubscribe at any time.';
      case CONTACT_FIELD_OPTION.MOBILE_ONLY:
        return 'You agree to opt-in to recieve Text notification, offer, alerts and news. Msg and data rates apply. Text STOP to end. Up to 5 msg/mo.';
      default:
        return '';
    }
  }

  private getMediaHtml() {
    const { type, media } = this.props.offer;
    switch (type) {
      case OFFER_LAYOUT_TYPE.CUSTOM:
        return (
          <Media media={media} builderElementType={BUILDER_ELEMENTS.OFFER} />
        );
      default:
        return (
          <div style={{ margin: '0px auto 10px', maxWidth: '650px' }}>
            <div className="col-md-12 no-padding">
              {media.source === MEDIA_TYPE.IMAGE && !media.url ? (
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      background:
                        'url(https://staging.mindmemobile.com/images/Image-blue.svg) no-repeat center',
                      padding: '124px',
                      marginBottom: '96px',
                    }}
                  ></div>
                  <div>
                    <p>
                      <b>IMAGE REQUIREMENTS</b>
                    </p>
                    <p style={{ marginBottom: '10px' }}>
                      Minimum Dimensions: 400px by 700px
                    </p>
                    <p>Max File Size: 2mb</p>
                    <p>Accepted Image Formats - .jpg, .png or .gif</p>
                  </div>
                </div>
              ) : (
                <Media
                  media={media}
                  builderElementType={BUILDER_ELEMENTS.OFFER}
                />
              )}
            </div>
          </div>
        );
    }
  }

  private getScanCodeHtml(): ReactNode {
    const { posCode, posCodeScanType } = this.props.offer;
    return (
      <>
        {posCode && (
          <div className="row" style={{ margin: 0 }}>
            <div
              className="col-md-12"
              style={{ padding: 0, textAlign: 'center' }}
            >
              <div style={{ margin: '30px auto' }}>
                {posCodeScanType === Scan_Type.QR_CODE && (
                  <CustomQRCode value={posCode} ref="canvasForQr" />
                )}
                {posCodeScanType === Scan_Type.BAR_CODE && (
                  <CustomBarCode barWidth="1" value={posCode} />
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  private getHtmlWithLayoutType(): ReactNode {
    const { type, offerStyles, title, description } = this.props.offer;
    switch (type) {
      case OFFER_LAYOUT_TYPE.CUSTOM:
        return (
          <div
            className="col-md-12"
            style={{
              padding: '10px',
              background: '#fff',
            }}
          >
            <div
              style={{
                border: '1px dashed #979797',
                padding: '5px',
                ...offerStyles,
              }}
            >
              <div
                style={{
                  padding: '10px',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '22px',
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: title }} />
              </div>
              {description && (
                <div
                  style={{
                    textAlign: 'center',
                    paddingLeft: '25px',
                    paddingRight: '25px',
                    fontSize: '16px',
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
              )}
              {this.getScanCodeHtml()}
            </div>
          </div>
        );
      default:
        return <></>;
    }
  }

  private async onRedeemClick() {
    const {
      accountId,
      moduleId,
      contactId,
      responseCapturedFromModule,
      elementId,
      offer,
    } = this.props;
    const { email, mobileNumber } = this.state;
    const redeemedStatus = await BuilderElementService.saveContactAndRedeemOffer(
      accountId,
      elementId,
      moduleId,
      responseCapturedFromModule,
      email,
      mobileNumber,
      contactId,
      offer.id
    );
    this.setState({ redeemedStatus, isRedeemed: true });
  }

  private onChangeContact(
    email: string,
    mobileNumber: string,
    isValidContactFields: boolean
  ) {
    this.setState({ email, mobileNumber, isValidContactFields });
  }

  private onToggleRedeemButtonClick(isRedeemButtonClick: boolean) {
    this.setState({ isRedeemButtonClick });
  }

  private getRedeemButtonHtml(): ReactNode {
    const { isRedeemButtonClick, isValidContactFields } = this.state;
    const pointerEvents = isValidContactFields ? 'inherit' : 'none';
    const opacity = isValidContactFields ? 1 : 0.7;
    return (
      <>
        {!isRedeemButtonClick ? (
          <div
            style={{ ...this.props.offer.buttonStyles, pointerEvents, opacity }}
            onClick={() => {
              this.onToggleRedeemButtonClick(true);
            }}
          >
            Redeem
          </div>
        ) : (
          <div
            className="col-md-12"
            style={{
              padding: 0,
            }}
          >
            <div
              className="col-md-12"
              style={{
                padding: 0,
                color: '#ff5900',
                fontSize: '22px',
                textAlign: 'center',
              }}
            >
              <b>Ready To Redeem?</b>
            </div>
            <div
              className="col-md-12"
              style={{
                padding: '20px 42px',
                color: '#2a3e52',
                textAlign: 'center',
              }}
            >
              <i>
                Show this Offer to an employee <b>before</b> pressing Redeem
                Now. This action cannot be undone
              </i>
            </div>
            <div
              className="col-md-12"
              style={{
                padding: 0,
                textAlign: 'center',
                paddingTop: '15px',
              }}
            >
              <button
                style={{
                  width: '300px',
                  margin: '0 auto',
                  marginRight: 'auto',
                  height: '40px',
                  borderRadius: '2px',
                  backgroundColor: '#fff',
                  color: '#000',
                  marginTop: '0px',
                  border: '1px solid #ccc',
                  padding: '10px',
                  marginBottom: '20px',
                }}
                onClick={() => {
                  this.onToggleRedeemButtonClick(false);
                }}
              >
                Use Later
              </button>
              <div
                style={{
                  ...this.props.offer.buttonStyles,
                  pointerEvents,
                  opacity,
                }}
                onClick={() => {
                  this.onRedeemClick();
                }}
              >
                Redeem
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  private getRedeemedHtml(): ReactNode {
    const {
      expirationMessage,
      redemptionMessage,
      expirationActionType,
      redemptionActionType,
    } = this.props.offer;
    switch (this.state.redeemedStatus) {
      case OFFER_REDEEMED_STATUS.SEND_DETAILS_NOT_FOUND:
        return (
          <p style={{ color: '#000', marginBottom: '1em' }}>
            Sorry! unable to redeem this offer.
          </p>
        );
      case OFFER_REDEEMED_STATUS.REDEEMED:
        return (
          <>
            {redemptionActionType === REDEMPTION_ACTION_TYPE.SHOW_MESSAGE && (
              <p style={{ color: '#000', marginBottom: '1em' }}>
                <div
                  dangerouslySetInnerHTML={{ __html: redemptionMessage }}
                ></div>
              </p>
            )}
          </>
        );
      case OFFER_REDEEMED_STATUS.CANCELLED:
        return (
          <p style={{ color: '#000', marginBottom: '1em' }}>
            Sorry! This Offer is not available.
          </p>
        );
      case OFFER_REDEEMED_STATUS.OFFER_DELETED_OR_NOT_FOUND:
        return (
          <p style={{ color: '#000', marginBottom: '1em' }}>Offer not found.</p>
        );
      case OFFER_REDEEMED_STATUS.OFFER_AVAILABLE_IN_FUTURE:
        return (
          <p style={{ color: '#000', marginBottom: '1em' }}>
            This Offer is currently unavailable.
          </p>
        );
      case OFFER_REDEEMED_STATUS.MAX_REDEMPTION_LIMIT_REACHED:
        return (
          <p style={{ color: '#000', marginBottom: '1em' }}>
            You have reached the redemption limit for this Offer.
          </p>
        );
      case OFFER_REDEEMED_STATUS.EXPIRED:
        return (
          <>
            {expirationActionType === REDEMPTION_ACTION_TYPE.SHOW_MESSAGE && (
              <p style={{ color: '#000', marginBottom: '1em' }}>
                <div
                  dangerouslySetInnerHTML={{ __html: expirationMessage }}
                ></div>
              </p>
            )}
          </>
        );
      case OFFER_REDEEMED_STATUS.OFFER_INACTIVE:
        return (
          <p style={{ color: '#000', marginBottom: '1em' }}>
            This Offer is no longer available.
          </p>
        );
      case OFFER_REDEEMED_STATUS.ALREADY_REDEEMED:
        return (
          <p style={{ color: '#000', marginBottom: '1em' }}>
            You already had redeemed this offer.
          </p>
        );
      default:
        return <></>;
    }
  }

  private showHideTerms(isShowTerms: boolean) {
    this.setState({ isShowTerms });
  }

  render() {
    const { offer, isActualRendering } = this.props;
    const { email, mobileNumber, isRedeemed, isShowTerms } = this.state;
    const {
      styles,
      contactFieldType,
      terms,
      isHideTermsInExpandableArea,
      expirationText,
    } = offer;
    const {
      marginBottom,
      marginTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
    } = styles;
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            marginBottom,
            marginTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
            paddingTop,
          }}
        >
          <div
            className="col-md-12"
            style={{
              padding: 0,
              background: '#fff',
            }}
          >
            <div className="col-md-12" style={{ marginBottom: '10px' }}>
              {this.getMediaHtml()}
              {this.getHtmlWithLayoutType()}
            </div>
            {isRedeemed ? (
              this.getRedeemedHtml()
            ) : (
              <div style={{ maxWidth: '450px', margin: '0 auto' }}>
                {isActualRendering && (
                  <>
                    <Contact
                      elementType={BUILDER_ELEMENTS.OFFER}
                      fieldType={contactFieldType}
                      email={email}
                      mobileNumber={mobileNumber}
                      onChangeContact={(
                        email: string,
                        mobileNumber: string,
                        isValidContactFields: boolean
                      ) =>
                        this.onChangeContact(
                          email,
                          mobileNumber,
                          isValidContactFields
                        )
                      }
                    />
                    <div
                      className="col-md-12"
                      style={{ padding: 0, marginBottom: '5px' }}
                    >
                      {this.getComplianceText()}
                    </div>
                  </>
                )}
                <div
                  className="col-md-12 diabled"
                  style={{
                    padding: 0,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    textAlign: 'center',
                  }}
                >
                  {this.getRedeemButtonHtml()}
                </div>
                <div className="col-md-12 no-padding">
                  <div
                    style={{
                      marginBottom: '10px',
                      padding: 0,
                      textAlign: 'center',
                    }}
                  >
                    {isHideTermsInExpandableArea && (
                      <a
                        style={{
                          color: '#3AA6DD',
                          cursor: 'pointer',
                          margin: '0em',
                          padding: '0em',
                          fontSize: '1em',
                          lineHeight: 1.25,
                        }}
                        onClick={() => {
                          this.showHideTerms(!isShowTerms);
                        }}
                      >
                        <b>{`${isShowTerms ? 'Hide' : 'View'} Terms`}</b>
                      </a>
                    )}
                  </div>
                  {isShowTerms && (
                    <div
                      className="col-md-12"
                      style={{
                        marginBottom: '20px',
                        textAlign: 'left',
                        wordBreak: 'break-word',
                        color: '#555555',
                      }}
                      dangerouslySetInnerHTML={{ __html: terms }}
                    />
                  )}
                  {expirationText && (
                    <div style={{ color: '#273E52' }}>
                      <b>{expirationText}</b>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
