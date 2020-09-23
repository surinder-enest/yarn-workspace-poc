import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

interface IProps {
    [otherProps: string]: any;
}
interface IState {
    isCaptchaRender: boolean;
}

declare global {
    interface Window {
        grecaptcha: any;
    }
}

export default class CustomRecaptcha extends Component<IProps, IState> {
    private sitekey = '6Le_C0YUAAAAAHQPLFx0qZ89ZFPRATD5Ym7rmqBg';

    constructor(props: IProps) {
        super(props);
        this.state = {
            isCaptchaRender: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isCaptchaRender: true });
        }, 3000);
    }

    render() {
        return (
            <>
                {typeof window !== 'undefined' &&
                    typeof window.grecaptcha !== 'undefined' &&
                    typeof window.grecaptcha.render === 'function' && (
                        <Recaptcha
                            {...this.props}
                            sitekey={this.sitekey}
                            render="explicit"
                        />
                    )}
            </>
        );
    }
}
