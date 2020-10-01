import React, { Component, ReactNode } from 'react';
import { TitleOptions, CountdownLayoutStyles } from '../../../enums';
import { CountDownModel } from '../../../models';
import { Utility } from '../../../utilities';
import {
  CircleLayout,
  PanelLayout,
  PlainLayout,
  SquareLayout,
} from './CountDownLayouts';

interface Props {
  countDown: CountDownModel;
  responseCapture: Function;
  isActualRendering: boolean;
  elementId: string;
}

export default class CountDown extends Component<Props> {
  private getButton = (): ReactNode => {
    const { redirectUrl, buttonStyle, buttonText } = this.props.countDown;

    return (
      <a
        href={redirectUrl}
        style={{
          display: 'block',
          textAlign: 'center',
          paddingTop: '10px',
        }}
        target="_blank"
        onClick={() => this.onClick()}
      >
        <div
          style={{
            display: 'table',
            width: '100%',
            minHeight: 'inherit',
          }}
        >
          <div
            style={{
              display: 'table-row',
              minHeight: 'inherit',
            }}
          >
            <div
              style={{
                display: 'table-cell',
                verticalAlign: 'middle',
              }}
            >
              <div
                className="btn-builder"
                style={buttonStyle}
                dangerouslySetInnerHTML={{
                  __html: buttonText,
                }}
              ></div>
            </div>
          </div>
        </div>
      </a>
    );
  };
  private onClick() {
    this.props.responseCapture();
  }

  private getLayout = (): ReactNode => {
    const { countDown } = this.props;
    const { countDownLayout } = countDown;
    switch (countDownLayout) {
      case CountdownLayoutStyles.Plain:
        return <PlainLayout element={countDown} />;
      case CountdownLayoutStyles.Panel:
        return <PanelLayout element={countDown} />;
      case CountdownLayoutStyles.Square:
        return <SquareLayout element={countDown} />;
      case CountdownLayoutStyles.Circle:
        return <CircleLayout element={countDown} />;
      default:
        return <></>;
    }
  };

  render() {
    const {
      title,
      description,
      styles,
      elementBlockStyles,
      elementLabelStyles,
      isShowExpireTime,
      titleOptions,
      expirationDate,
      expirationTime,
      isButtonVisible,
      timeZoneAbbreviation,
      expirationTimeFormat,
      url,
    } = this.props.countDown;

    return (
      <div style={styles}>
        {titleOptions === TitleOptions.Above && (
          <div className="row no-margin">
            <div
              className="col-md-12"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          </div>
        )}
        {this.props.isActualRendering ? (
          <div style={elementBlockStyles}>
            <img src={`${url}${this.props.elementId}`} alt="CountDown" />
            {isShowExpireTime && (
              <div style={elementLabelStyles}>
                {`Expires ${Utility.formatDateInMMDDYY(
                  expirationDate
                )} at ${Utility.secondsToHHMM12HourFormat(
                  expirationTime
                )} ${expirationTimeFormat} ${timeZoneAbbreviation}`}
              </div>
            )}
          </div>
        ) : (
          this.getLayout()
        )}
        {titleOptions === TitleOptions.Below && (
          <div className="row" style={{ marginTop: '20px' }}>
            <div
              className="col-md-12"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          </div>
        )}
        {description && (
          <div className="row" style={{ marginTop: '20px' }}>
            <div
              className="col-md-12"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
        )}
        {isButtonVisible && this.getButton()}
      </div>
    );
  }
}
