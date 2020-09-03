import React, { Component } from 'react';

interface Props {
    id: string;
    type?: string;
    className?: string;
    isRequired?: boolean;
    readOnly?: boolean;
    maxLength?: number;
    styles?: any;
}

export default class InputControl extends Component<Props> {
    render() {
        const { id, type, className, isRequired, readOnly, maxLength, styles } = this.props;
        return <input
            id={id || ""}
            type={type || "text"}
            className={className}
            style={styles || {}}
            required={isRequired || false}
            readOnly={readOnly || false}
            maxLength={maxLength || 5000}
        />
    }
}
