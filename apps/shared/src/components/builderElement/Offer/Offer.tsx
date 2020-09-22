import React, { Component, ReactNode } from 'react';
import { OFFER_LAYOUT_TYPE, MEDIA_TYPE } from '../../../enums';
import { OfferModel } from '../../../models';

interface IProps {
    offer: OfferModel;
    isActualRendering: boolean;
    responseCapture: Function;
}

export default class Offer extends Component<IProps> {


    private getHtmlWithMediaType(mediaType: string): ReactNode {
        const { styles, url } = this.props.offer;
        const { width } = styles;
        switch (mediaType) {
            case MEDIA_TYPE.VIDEO:
                return <></>
            default:
                return <img src={url}
                    style={{
                        width,
                        margin: '0 auto',
                        display: "block",
                        maxWidth: "100%",
                        height: "auto"
                    }}
                    alt="Preview not available" />
        }
    }

    private getHtmlWithType(): ReactNode {
        const { type, styles, mediaType, title, description } = this.props.offer;
        const { backgroundColor, paddingBottom, paddingLeft, paddingRight, paddingTop } = styles;
        switch (type) {
            case OFFER_LAYOUT_TYPE.CUSTOM:
                return <div className="col-md-12" style={{
                    margin: "0 auto",
                    marginBottom: '10px'
                }}>
                    <div style={{ margin: 0 }}>
                        <div className="col-md-12"
                            style={{
                                padding: 0,
                                width: "100%",
                                position: "relative",
                                minHeight: "1px"
                            }}>
                            <div className="offer-image" style={{
                                backgroundColor,
                                paddingBottom,
                                paddingLeft,
                                paddingRight,
                                paddingTop,
                                margin: 0
                            }}>
                                {this.getHtmlWithMediaType(mediaType)}
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ margin: 0 }}>
                        <div className="col-md-12 offer-image-container"
                            style={{
                                padding: '10px',
                                background: "#fff"
                            }}>
                            <div className="offer-discription" style={styles}>
                                <div className="heading" style={{
                                    padding: '10px',
                                    textAlign: "center"
                                }}>
                                    <div dangerouslySetInnerHTML={{ __html: title }} />
                                </div>
                                {
                                    description && <div className="text-section text-center">
                                        <div dangerouslySetInnerHTML={{ __html: description }} />
                                    </div>
                                }
                                <div className="row" style={{ margin: 0 }}>
                                    <div className="col-md-12 no-padding text-center">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
            case OFFER_LAYOUT_TYPE.PRE_DEFINED_WITH_IMAGE:
                return <></>;
        }
        return <></>
    }

    render() {
        const { styles } = this.props.offer;
        const { marginBottom, marginTop, paddingBottom, paddingLeft, paddingRight, paddingTop } = styles;
        return <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: 'center' }}>
            <div style={{
                marginBottom,
                marginTop,
                paddingBottom,
                paddingLeft,
                paddingRight,
                paddingTop
            }}>
                {this.getHtmlWithType()}
            </div>
        </div>
    }
}
