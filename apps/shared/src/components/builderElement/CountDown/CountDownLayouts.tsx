import React from 'react';
import { CountDownModel } from '../../../models';
import { Utility } from '../../../utilities';

interface IProps {
  element: CountDownModel;
}
export const PlainLayout = (props: IProps) => {
  const {
    isShowExpireTime,
    expirationDate,
    expirationTime,
    expirationTimeFormat,
    timeZoneAbbreviation,
    elementBlockStyles,
    elementTextStyles,
    elementLabelStyles,
  } = props.element;

  const lineHeight = {
    lineHeight: '1',
    marginBottom: '10px',
  };

  return (
    <div className="row Plain_Timer" style={elementBlockStyles}>
      <div className="col-md-12 col-sm-12 col-xs-12 dasktop-padding">
        <div className="Plain-day-section">
          <div className="Timer_Plain" style={elementTextStyles}>
            <div style={lineHeight}>00</div>
            <div className="WeekDays_Plain" style={elementLabelStyles}>
              <b className="font-weight">Days</b>
            </div>
          </div>
        </div>
        <div className="colons">:</div>
        <div className="Plain-day-section">
          <div className="Timer_Plain" style={elementTextStyles}>
            <div style={lineHeight}>00</div>
            <div className="WeekDays_Plain" style={elementLabelStyles}>
              <b className="font-weight">Hours</b>
            </div>
          </div>
        </div>
        <div className="colons">:</div>
        <div className="Plain-day-section">
          <div className="Timer_Plain" style={elementTextStyles}>
            <div style={lineHeight}>00</div>
            <div className="WeekDays_Plain" style={elementLabelStyles}>
              <b className="font-weight">Minutes</b>
            </div>
          </div>
        </div>
        <div className="colons">:</div>
        <div className="Plain-day-section">
          <div className="Timer_Plain" style={elementTextStyles}>
            <div style={lineHeight}>00</div>
            <div className="WeekDays_Plain" style={elementLabelStyles}>
              <b className="font-weight">Seconds</b>
            </div>
          </div>
        </div>
      </div>
      {isShowExpireTime && (
        <div className="row no-margin" style={{ textAlign: 'center' }}>
          <div
            className="col-md-12 col-sm-12 col-xs-12 padding-top-10"
            style={elementLabelStyles}
          >
            {`Expires ${Utility.formatDateInMMDDYY(
              expirationDate
            )} at ${Utility.secondsToHHMM12HourFormat(
              expirationTime
            )} ${expirationTimeFormat} ${timeZoneAbbreviation}`}
          </div>
        </div>
      )}
    </div>
  );
};
export const PanelLayout = (props: IProps) => {
  const {
    isShowExpireTime,
    expirationDate,
    expirationTime,
    expirationTimeFormat,
    timeZoneAbbreviation,
    elementBlockStyles,
    elementTextStyles,
    elementLabelStyles,
    elementInnerStyles,
  } = props.element;

  const panelLayoutStyle = {
    background: elementInnerStyles.background,
    color: elementTextStyles.color,
  };

  return (
    <div className="row Panel_timer" style={elementBlockStyles}>
      <div className="col-md-12">
        <div className="Panel-day-section margin-left-15">
          <div className="timer_Panel">
            <div className="background_Panel" style={panelLayoutStyle}>
              0
            </div>
            <div className="background_Panel" style={panelLayoutStyle}>
              0
            </div>
          </div>
          <div className="weekdays_Panel" style={elementLabelStyles}>
            {' '}
            <b className="font-weight">Days</b>
          </div>
        </div>
        <div className="Panel-day-section">
          <div className="timer_Panel">
            <div className="background_Panel" style={panelLayoutStyle}>
              0
            </div>
            <div className="background_Panel" style={panelLayoutStyle}>
              0
            </div>
          </div>
          <div className="weekdays_Panel" style={elementLabelStyles}>
            {' '}
            <b className="font-weight">Hours</b>
          </div>
        </div>
        <div className="Panel-day-section">
          <div className="timer_Panel">
            <div className="background_Panel" style={panelLayoutStyle}>
              0
            </div>
            <div className="background_Panel" style={panelLayoutStyle}>
              0
            </div>
          </div>
          <div className="weekdays_Panel" style={elementLabelStyles}>
            {' '}
            <b className="font-weight">Minutes</b>
          </div>
        </div>
        <div className="Panel-day-section">
          <div className="timer_Panel">
            <div className="background_Panel" style={panelLayoutStyle}>
              0
            </div>
            <div className="background_Panel" style={panelLayoutStyle}>
              0
            </div>
          </div>
          <div className="weekdays_Panel" style={elementLabelStyles}>
            {' '}
            <b className="font-weight">Seconds</b>
          </div>
        </div>
      </div>
      {isShowExpireTime && (
        <div className="row no-margin" style={{ textAlign: 'center' }}>
          <div
            className="col-md-12 col-sm-12 col-xs-12 padding-top-10"
            style={elementLabelStyles}
          >
            {`Expires ${Utility.formatDateInMMDDYY(
              expirationDate
            )} at ${Utility.secondsToHHMM12HourFormat(
              expirationTime
            )} ${expirationTimeFormat} ${timeZoneAbbreviation}`}
          </div>
        </div>
      )}
    </div>
  );
};
export const SquareLayout = (props: IProps) => {
  const {
    isShowExpireTime,
    expirationDate,
    expirationTime,
    expirationTimeFormat,
    timeZoneAbbreviation,
    elementBlockStyles,
    elementTextStyles,
    elementLabelStyles,
    elementInnerStyles,
  } = props.element;

  const squareLayout = {
    background: elementInnerStyles.background,
    color: elementTextStyles.color,
  };
  return (
    <div className="row Square_Timer" style={elementBlockStyles}>
      <div className="col-md-12 no-padding">
        <div className="Square-day-section">
          <div className="Timer_Square">
            <div className="background_Square" style={squareLayout}>
              00
            </div>
            <div className="WeekDays_Square" style={elementLabelStyles}>
              {' '}
              <b className="font-weight">Days</b>
            </div>
          </div>
        </div>
        <div className="Square-day-section">
          <div className="Timer_Square">
            <div className="background_Square" style={squareLayout}>
              00
            </div>
            <div className="WeekDays_Square" style={elementLabelStyles}>
              {' '}
              <b className="font-weight">Hours</b>
            </div>
          </div>
        </div>
        <div className="Square-day-section">
          <div className="Timer_Square">
            <div className="background_Square" style={squareLayout}>
              {' '}
              00
            </div>
            <div className="WeekDays_Square" style={elementLabelStyles}>
              {' '}
              <b className="font-weight">Minutes</b>
            </div>
          </div>
        </div>
        <div className="Square-day-section">
          <div className="Timer_Square">
            <div className="background_Square" style={squareLayout}>
              00
            </div>
            <div className="WeekDays_Square" style={elementLabelStyles}>
              {' '}
              <b className="font-weight">Seconds</b>
            </div>
          </div>
        </div>
      </div>

      {isShowExpireTime && (
        <div className="row no-margin" style={{ textAlign: 'center' }}>
          <div
            className="col-md-12 col-sm-12 col-xs-12 padding-top-10"
            style={elementLabelStyles}
          >
            {`Expires ${Utility.formatDateInMMDDYY(
              expirationDate
            )} at ${Utility.secondsToHHMM12HourFormat(
              expirationTime
            )} ${expirationTimeFormat} ${timeZoneAbbreviation}`}
          </div>
        </div>
      )}
    </div>
  );
};
export const CircleLayout = (props: IProps) => {
  const {
    isShowExpireTime,
    expirationDate,
    expirationTime,
    expirationTimeFormat,
    timeZoneAbbreviation,
    elementBlockStyles,
    elementTextStyles,
    elementLabelStyles,
    elementInnerStyles,
  } = props.element;

  const circleLayout = {
    background: elementInnerStyles.background,
    color: elementTextStyles.color,
  };
  return (
    <div className="row Circle_Timer" style={elementBlockStyles}>
      <div className="col-md-12 no-padding">
        <div className="Circle-day-section">
          <div className="Timer_Circle">
            <div className="background_Circle" style={circleLayout}>
              00
            </div>
            <div className="WeekDays_Circle" style={elementLabelStyles}>
              {' '}
              <b className="font-weight">Days</b>
            </div>
          </div>
        </div>
        <div className="Circle-day-section">
          <div className="Timer_Circle">
            <div className="background_Circle" style={circleLayout}>
              00
            </div>
            <div className="WeekDays_Circle" style={elementLabelStyles}>
              {' '}
              <b className="font-weight">Hours</b>
            </div>
          </div>
        </div>

        <div className="Circle-day-section">
          <div className="Timer_Circle">
            <div className="background_Circle" style={circleLayout}>
              00
            </div>
            <div className="WeekDays_Circle" style={elementLabelStyles}>
              {' '}
              <b className="font-weight">Minutes</b>
            </div>
          </div>
        </div>

        <div className="Circle-day-section">
          <div className="Timer_Circle">
            <div className="background_Circle" style={circleLayout}>
              00
            </div>
            <div className="WeekDays_Circle" style={elementLabelStyles}>
              {' '}
              <b className="font-weight">Seconds</b>
            </div>
          </div>
        </div>
      </div>
      {isShowExpireTime && (
        <div className="row no-margin" style={{ textAlign: 'center' }}>
          <div
            className="col-md-12 col-sm-12 col-xs-12 padding-top-10"
            style={elementLabelStyles}
          >
            {`Expires ${Utility.formatDateInMMDDYY(
              expirationDate
            )} at ${Utility.secondsToHHMM12HourFormat(
              expirationTime
            )} ${expirationTimeFormat} ${timeZoneAbbreviation}`}
          </div>
        </div>
      )}
    </div>
  );
};
