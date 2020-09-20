import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

interface Props {
    [otherProps: string]: any;
    verifyCallback: Function;
    expiredCallback: Function;
}

declare global {
    interface Window {
        grecaptcha: any;
    }
}

export default class CustomRecaptcha extends Component<Props> {
    private sitekey = '6Le_C0YUAAAAAHQPLFx0qZ89ZFPRATD5Ym7rmqBg';
    render() {
        return (
            <>
                {typeof window !== 'undefined' &&
                    typeof window.grecaptcha !== 'undefined' &&
                    typeof window.grecaptcha.render === 'function' && (
                        <div className="g-recaptcha">
                            <Recaptcha
                                {...this.props}
                                sitekey={this.sitekey}
                                render="explicit"
                                verifyCallback={this.props.verifyCallback}
                                expiredCallback={this.props.expiredCallback}
                            />
                        </div>
                    )}
            </>
        );
    }
}
