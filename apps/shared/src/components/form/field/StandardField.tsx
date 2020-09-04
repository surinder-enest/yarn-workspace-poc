import React, { Component, ReactNode } from 'react';
import {
  MONTH,
  BIRTHDAY_FORMAT_TYPE,
  FORM_FIELDS,
  GENDER_TYPE,
} from '../../../enums';
import { FieldModel, StyleModel } from '../../../models';
import { SelectDropdown } from '..';

interface Props {
  formField: FieldModel;
  styles: StyleModel;
  updatedFieldDetails: Function;
  validateField: Function;
}

export default class StandardField extends Component<Props> {
  private onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let updatedField = { ...this.props.formField };
    updatedField.value = event.currentTarget.value;
    this.props.updatedFieldDetails(updatedField);
  }
  private onSelectDropdownChange(
    event: React.MouseEvent<HTMLSelectElement, MouseEvent>
  ) {
    let updatedField = { ...this.props.formField };
    updatedField.value = event.currentTarget.value;
    this.props.updatedFieldDetails(updatedField);
  }

  private getBirthdayDropdown(
    month: string,
    defaultOption: string,
    isMonth: boolean,
    isDay: boolean,
    isYear: boolean
  ): ReactNode {
    const { styles } = this.props;
    let options: Array<any> = [];
    if (isMonth) {
      options = Object.values(MONTH);
    } else if (isDay) {
      const days = month === MONTH.FEBRUARY ? 29 : 31;
      options = Array(days).map(value => Object.assign({ value }));
    } else if (isYear) {
      var currentYear = new Date().getFullYear();
      options = Array(100).map(i => Object.assign({ value: currentYear - i }));
    }
    return (
      <SelectDropdown
        valueKey={'value'}
        nameKey={'value'}
        className={`form-control birthday-select`}
        styles={styles}
        defaultOption={defaultOption}
        options={options}
        onSelectChange={this.onSelectDropdownChange}
      />
    );
  }

  private getBithdayHtml(formField: FieldModel): ReactNode {
    switch (formField.birthdayFormatType) {
      case BIRTHDAY_FORMAT_TYPE.MONTH:
        return this.getBirthdayDropdown(
          MONTH.JANUARY,
          'Month',
          true,
          false,
          false
        );
      case BIRTHDAY_FORMAT_TYPE.MONTH_DAY:
        return (
          <div style={{ display: 'flex' }}>
            <div className={'col-md-8 no-padding'}>
              {this.getBirthdayDropdown(
                MONTH.JANUARY,
                'Month',
                true,
                false,
                false
              )}
            </div>
            <div className={'col-md-4 padding-right-0'}>
              {this.getBirthdayDropdown(
                MONTH.JANUARY,
                'Day',
                false,
                true,
                false
              )}
            </div>
          </div>
        );
      case BIRTHDAY_FORMAT_TYPE.DAY_MONTH_YEAR:
        return (
          <div style={{ display: 'flex' }}>
            <div className={'col-md-4 padding-left-0'}>
              {this.getBirthdayDropdown(
                MONTH.JANUARY,
                'Month',
                true,
                false,
                false
              )}
            </div>
            <div className={'col-md-4 no-padding'}>
              {this.getBirthdayDropdown(
                MONTH.JANUARY,
                'Day',
                false,
                true,
                false
              )}
            </div>
            <div className={'col-md-4 padding-right-0'}>
              {this.getBirthdayDropdown(
                MONTH.JANUARY,
                'Year',
                false,
                false,
                true
              )}
            </div>
          </div>
        );
      default:
        return <></>;
    }
  }

  private getStandardField() {
    const { formField, styles } = this.props;
    switch (formField.formFields) {
      case FORM_FIELDS.GENDER:
        const genderOptions = Object.values(GENDER_TYPE);
        return (
          <SelectDropdown
            valueKey={'value'}
            nameKey={'value'}
            styles={styles}
            selectedValue={formField.value}
            options={genderOptions}
            onSelectChange={this.onSelectDropdownChange}
          />
        );
      case FORM_FIELDS.BIRTHDAY:
        return this.getBithdayHtml(formField);
      default:
        let maxLength = 50;
        switch (formField.formFields) {
          case FORM_FIELDS.MOBILE_PHONE:
          case FORM_FIELDS.HOME_PHONE:
          case FORM_FIELDS.WORK_PHONE:
          case FORM_FIELDS.ZIP:
            maxLength = 14;
            break;
        }
        return (
          <input
            type="text"
            id={formField.id}
            maxLength={maxLength}
            style={styles}
            value={formField.value}
            onChange={event => this.onInputChange(event)}
          />
        );
    }
  }
  render() {
    return this.getStandardField();
  }
}
