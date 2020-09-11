import React, { Component } from 'react';
import DatePicker from 'react-16-bootstrap-date-picker';

interface Props {
}

export default class CustomDatePicker extends Component<Props> {

    render() {
        return <DatePicker
            type="text"
            dateFormat={'MM/DD/YYYY'}
        />
    }
}
