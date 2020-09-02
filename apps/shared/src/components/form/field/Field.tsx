import React, { Component, ReactNode } from 'react';
import { FormFieldModel, FieldModel } from '../../../models';
import { FORM_FIELDS, FORM_FIELD_TYPE, GENDER_TYPE, BIRTHDAY_FORMAT_TYPE, MONTH, CUSTOM_FIELD_TYPE } from '../../../enums';
import { SingleSelectDropdown, InputControl } from '..';

interface Props {
    field: FormFieldModel;
}

export default class Field extends Component<Props> {

    getBirthdayDropdown(month: string, defaultOption: string, isMonth: boolean, isDay: boolean, isYear: boolean) {
        const { styles } = this.props.field;
        let options: Array<any> = [];
        if (isMonth) {
            options = Object.values(MONTH).map((value) => {
                return {
                    value: value
                };
            });
        } else if (isDay) {
            const daysInMonth = month === MONTH.FEBRUARY ? 29 : 31;
            for (let i = 1; i <= daysInMonth; i++) {
                options.push({
                    value: i
                });
            }
        } else if (isYear) {
            var currentYear = new Date().getFullYear()
            for (let i = 1; i <= 100; i++) {
                options.push({
                    value: currentYear - i
                });
            }
        }
        return <SingleSelectDropdown
            valueKey={"value"}
            nameKey={"value"}
            className={`form-control birthday-select`}
            styles={styles}
            defaultOption={defaultOption}
            options={options}
        />
    }

    getBithdayHtml(formField: FieldModel) {
        switch (formField.birthdayFormatType) {
            case BIRTHDAY_FORMAT_TYPE.MONTH:
                return this.getBirthdayDropdown(MONTH.JANUARY, "Month", true, false, false);
            case BIRTHDAY_FORMAT_TYPE.MONTH_DAY:
                return <div style={{ display: 'flex' }}>
                    <div className={"col-md-8 no-padding"}>{this.getBirthdayDropdown(MONTH.JANUARY, "Month", true, false, false)}</div>
                    <div className={"col-md-4 padding-right-0"}>{this.getBirthdayDropdown(MONTH.JANUARY, "Day", false, true, false)}</div>
                </div>
            case BIRTHDAY_FORMAT_TYPE.DAY_MONTH_YEAR:
                return <div style={{ display: 'flex' }}>
                    <div className={"col-md-4 padding-left-0"}>{this.getBirthdayDropdown(MONTH.JANUARY, "Month", true, false, false)}</div>
                    <div className={"col-md-4 no-padding"}>{this.getBirthdayDropdown(MONTH.JANUARY, "Day", false, true, false)}</div>
                    <div className={"col-md-4 padding-right-0"}>{this.getBirthdayDropdown(MONTH.JANUARY, "Year", false, false, true)}</div>
                </div>
            default:
                return <></>
        }
    }

    private getFieldTypeHtml(formField: FieldModel): ReactNode {
        const { styles } = this.props.field;
        switch (formField.formFields) {
            case FORM_FIELDS.GENDER:
                const genderOptions = Object.values(GENDER_TYPE).map((value) => {
                    const data: any = {
                        value: value
                    }
                    return data;
                });
                return <SingleSelectDropdown
                    valueKey={"value"}
                    nameKey={"value"}
                    styles={styles}
                    options={genderOptions}
                />
            case FORM_FIELDS.BIRTHDAY:
                return this.getBithdayHtml(formField);
            default:
                switch (formField.formFieldType) {
                    case FORM_FIELD_TYPE.CUSTOM:
                        switch (formField.customFieldType) {
                            case CUSTOM_FIELD_TYPE.LONG_TEXT:
                                return <textarea style={styles} />
                            case CUSTOM_FIELD_TYPE.DATE:
                                return <></>
                            case CUSTOM_FIELD_TYPE.YES_NO:
                            case CUSTOM_FIELD_TYPE.SELECT_ONE:
                                return <SingleSelectDropdown
                                    valueKey={"value"}
                                    nameKey={"label"}
                                    options={formField.options}
                                    styles={styles}
                                    defaultOption={"Select..."}
                                />
                            case CUSTOM_FIELD_TYPE.SELECT_MULTIPLE:
                                return <SingleSelectDropdown
                                    valueKey={"value"}
                                    nameKey={"label"}
                                    options={formField.options}
                                    styles={styles}
                                    isMulti={true}
                                    defaultOption={"Select..."}
                                />
                        }
                        return <></>
                    case FORM_FIELD_TYPE.STANDARD:
                        let maxLength = 50;
                        switch (formField.formFields) {
                            case FORM_FIELDS.MOBILE_PHONE:
                            case FORM_FIELDS.HOME_PHONE:
                            case FORM_FIELDS.WORK_PHONE:
                            case FORM_FIELDS.ZIP:
                                maxLength = 14;
                                break;
                        }
                        return <InputControl
                            isRequired={formField.isRequired}
                            readOnly={false}
                            styles={styles}
                            maxLength={maxLength}
                        />
                    default:
                        return <></>
                }
        }
    }

    formField(formField: FieldModel, idx: number) {
        if (!formField) {
            return <></>
        }
        const { color } = this.props.field.labelStyles;
        const marginLeft = formField.formFields === FORM_FIELDS.BIRTHDAY ? '5px' : '';
        return <div key={idx} className={`row no-margin padding-top-10`}>
            <p style={{
                color,
                lineHeight: '1.25',
                fontWeight: 'normal',
                fontStyle: 'normal',
                marginBottom: '5px',
                fontSize: '16px',
            }}>
                {formField.fieldName} {formField.isRequired && <span style={{ color: "#ff0000", marginLeft }}> *</span>}
            </p>
            {this.getFieldTypeHtml(formField)}
        </div>
    }

    render() {
        const { fields } = this.props.field;
        return fields.map((field, idx) => this.formField(field, idx))
    }
}
