import React, { Component } from 'react';
import { StyleModel } from '../../../models';
interface Props {
    selectedValue?: string;
    className?: string;
    valueKey: string;
    nameKey: string;
    defaultOption?: string;
    styles: StyleModel;
    options: Array<any>;
}

export default class SingleSelectDropdown extends Component<Props> {
    render() {
        const { styles, defaultOption, className, options, valueKey, nameKey } = this.props;
        return <select style={styles} className={className}>
            {defaultOption && <option value="">{defaultOption}</option>}
            {options.map((option, idx) => <option key={idx} value={option[valueKey]}> {option[nameKey]}</option>)}
        </select>
    }
}
