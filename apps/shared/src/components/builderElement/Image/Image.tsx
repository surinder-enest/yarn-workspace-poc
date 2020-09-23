import React, { Component } from 'react';
import { BUILDER_ELEMENTS } from '../../../enums';
import { ImageModel } from '../../../models';
import { Utility } from '../../../utilities';
import PlaceHolder from '../PlaceHolder';

interface IProps {
    image: ImageModel;
    isActualRendering: boolean;
    responseCapture: Function;
}

export default class Image extends Component<IProps> {

    private onClick() {
        const { isActualRendering, image } = this.props;
        const { isClickable, clickValue } = image;

        if (!isActualRendering)
            return;

        if (isClickable) {
            this.props.responseCapture();
            Utility.redirectToOtherPage(clickValue, true);
        }
    }

    render() {
        const { isDefaultMedia, styles, url, caption } = this.props.image;
        const { width } = styles;
        return <div style={styles}>
            <div style={{ position: 'relative', textAlign: 'center', minHeight: 'inherit' }} onClick={() => this.onClick()}>
                {
                    isDefaultMedia
                        ? <PlaceHolder builderElementType={BUILDER_ELEMENTS.IMAGE} text="Select Image" />
                        : <>
                            <img style={{ width }} src={`${url}?${Date.now()}`} />
                            {
                                caption && <div
                                    style={{
                                        color: '#fff',
                                        width: '100%',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        textAlign: 'center',
                                        height: '70px',
                                        fontSize: 'large',
                                        paddingTop: '22px',
                                        opacity: '0.9',
                                        position: 'absolute',
                                        bottom: '0',
                                    }}>
                                    {caption}
                                </div>
                            }
                        </>
                }
            </div>
        </div>
    }
}
