import React, { Component, ReactNode } from 'react';
import { SelectDropdown } from '../../..';
import {
  MONTH,
  BIRTHDAY_FORMAT_TYPE,
  FORM_FIELDS,
  GENDER_TYPE,
} from '../../../../enums';
import { FieldModel, StyleModel } from '../../../../models';
import { Utility } from '../../../../utilities';

interface Props {
  formField: FieldModel;
  styles: StyleModel;
  updatedFieldDetails: Function;
  validateField: Function;
}

export default class StandardField extends Component<Props> {
  nameKey = 'label';
  valueKey = 'value';
  private onValueChange(value: string) {
    const updatedField = this.props.validateField({
      ...this.props.formField,
      value,
    });
    this.props.updatedFieldDetails(updatedField);
  }

  private onBlurHandler() {
    const { value, errorMessage, formFields } = this.props.formField;
    let updatedValue: string = value;
    if (!errorMessage) {
      switch (formFields) {
        case FORM_FIELDS.MOBILE_PHONE:
        case FORM_FIELDS.HOME_PHONE:
        case FORM_FIELDS.WORK_PHONE:
          updatedValue = Utility.formatPhoneNumber(updatedValue);
          break;
      }
      this.props.updatedFieldDetails({
        ...this.props.formField,
        value: updatedValue
      });
    }
  }

  private onBirthdayDropDownChange(
    value: number,
    isMonth: boolean,
    isDay: boolean,
    isYear: boolean
  ) {
    const { birthdayFormatType } = this.props.formField;
    let dateOfBirth = { ...this.props.formField.dateOfBirth };
    dateOfBirth.dob = '';
    if (isMonth) {
      dateOfBirth.month = value;
    } else if (isDay) {
      dateOfBirth.day = value;
    } else if (isYear) {
      dateOfBirth.year = value;
    }
    const { month, day, year } = dateOfBirth;
    let birthday = new Date();
    switch (birthdayFormatType) {
      case BIRTHDAY_FORMAT_TYPE.MONTH:
        if (month > 0) {
          birthday.setMonth(month - 1);
          dateOfBirth.dob = birthday.toString();
        }
        break;
      case BIRTHDAY_FORMAT_TYPE.MONTH_DAY:
        if (month > 0 && day > 0) {
          birthday.setMonth(month - 1);
          birthday.setDate(day);
          dateOfBirth.dob = birthday.toString();
        }
        break;
      case BIRTHDAY_FORMAT_TYPE.DAY_MONTH_YEAR:
        if (month > 0 && day > 0 && year > 0) {
          birthday.setFullYear(year);
          birthday.setMonth(month - 1);
          birthday.setDate(day);
          dateOfBirth.dob = birthday.toString();
        }
        break;
    }
    const updatedField = this.props.validateField({
      ...this.props.formField,
      value: dateOfBirth.dob || '',
      dateOfBirth
    });
    this.props.updatedFieldDetails(updatedField);
  }

  private getBirthdayDropdown(
    month: number,
    day: number,
    year: number,
    defaultOption: string,
    isMonth: boolean,
    isDay: boolean,
    isYear: boolean
  ): ReactNode {
    const { styles } = this.props;
    let options: Array<any> = [];
    this.nameKey = 'value';
    let value = month;
    var currentYear = new Date().getFullYear();
    var date = new Date(
      year > 0 ? year : currentYear,
      month > 0 ? month : 1,
      0
    );
    if (isMonth) {
      this.nameKey = 'label';
      options = Object.values(MONTH).map((value, idx) =>
        Object.assign({
          label: value,
          value: idx + 1,
        })
      );
    } else if (isDay) {
      value = day;
      for (let i = 1; i <= date.getDate(); i++) {
        options.push({ value: i });
      }
    } else if (isYear) {
      value = year;
      for (let i = 1; i <= 100; i++) {
        options.push({ value: currentYear - i });
      }
    }
    return (
      <SelectDropdown
        value={value.toString()}
        valueKey={this.valueKey}
        nameKey={this.nameKey}
        className={`form-control birthday-select`}
        styles={styles}
        defaultOption={defaultOption}
        options={options}
        onSelectChange={(value: string) =>
          this.onBirthdayDropDownChange(parseInt(value), isMonth, isDay, isYear)
        }
      />
    );
  }

  private getBithdayHtml(formField: FieldModel): ReactNode {
    switch (formField.birthdayFormatType) {
      case BIRTHDAY_FORMAT_TYPE.MONTH:
        return this.getBirthdayDropdown(
          formField.dateOfBirth.month,
          formField.dateOfBirth.day,
          formField.dateOfBirth.year,
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
                formField.dateOfBirth.month,
                formField.dateOfBirth.day,
                formField.dateOfBirth.year,
                'Month',
                true,
                false,
                false
              )}
            </div>
            <div className={'col-md-4 padding-right-0'}>
              {this.getBirthdayDropdown(
                formField.dateOfBirth.month,
                formField.dateOfBirth.day,
                formField.dateOfBirth.year,
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
                formField.dateOfBirth.month,
                formField.dateOfBirth.day,
                formField.dateOfBirth.year,
                'Month',
                true,
                false,
                false
              )}
            </div>
            <div className={'col-md-4 no-padding'}>
              {this.getBirthdayDropdown(
                formField.dateOfBirth.month,
                formField.dateOfBirth.day,
                formField.dateOfBirth.year,
                'Day',
                false,
                true,
                false
              )}
            </div>
            <div className={'col-md-4 padding-right-0'}>
              {this.getBirthdayDropdown(
                formField.dateOfBirth.month,
                formField.dateOfBirth.day,
                formField.dateOfBirth.year,
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

  private getStandardField(): ReactNode {
    const { formField, styles } = this.props;
    switch (formField.formFields) {
      case FORM_FIELDS.GENDER:
        const genderOptions = Object.values(GENDER_TYPE).map(value =>
          Object.assign({ value })
        );
        this.nameKey = 'value';
        return (
          <SelectDropdown
            value={formField.value}
            valueKey={this.nameKey}
            nameKey={this.nameKey}
            styles={styles}
            options={genderOptions}
            onSelectChange={(value: string) => this.onValueChange(value)}
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
            maxLength={maxLength}
            style={styles}
            value={formField.value}
            onChange={event => this.onValueChange(event.currentTarget.value)}
            onBlur={() => this.onBlurHandler()}
          />
        );
    }
  }
  render() {
    return this.getStandardField();
  }
}
