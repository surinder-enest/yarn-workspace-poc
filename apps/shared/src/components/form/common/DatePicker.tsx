import React, { Component } from 'react';
import { StyleModel } from '../../../models';
import DatePicker from 'react-bootstrap-date-picker';

interface Props {
    className?: string;
    styles?: StyleModel;
    dateFormat?: string;
}

export default class InputControl extends Component<Props> {
    render() {
        const { className, styles } = this.props;
        return <DatePicker
            className={className}
            style={styles}
        />
    }
}
