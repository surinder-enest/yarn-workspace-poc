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
    
    constructor(props: IProps) {
        super(props);
        this.state = {
            isCaptchaRender: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isCaptchaRender: true });
        }, 2000);
    }

    render() {
        return (
            <>
                {typeof window !== 'undefined' &&
                    typeof window.grecaptcha !== 'undefined' &&
                    typeof window.grecaptcha.render === 'function' && (
                        <Recaptcha
                            {...this.props} 
                        />
                    )}
            </>
        );
    }
}
