import React, { Component } from 'react';
import { StyleModel } from '../../../models';

interface Props {
    selectedValue?: string;
    className?: string;
    valueKey: string;
    nameKey: string;
    defaultOption?: string;
    isMulti?: boolean;
    styles: StyleModel;
    options: Array<any>;
}

export default class SingleSelectDropdown extends Component<Props> {
    render() {
        const { styles, defaultOption, className, options, valueKey, nameKey, isMulti } = this.props;
        return <select multiple={isMulti} style={styles} className={className}>
            {defaultOption && <option value="">{defaultOption}</option>}
            {options.map((option, idx) => <option key={idx} value={option[valueKey]}> {option[nameKey]}</option>)}
        </select>
    }
}
