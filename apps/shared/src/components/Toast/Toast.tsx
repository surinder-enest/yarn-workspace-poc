import React from 'react';
import { toast } from 'react-toastify';
import config from '../../config';
import { TOAST_TYPE } from '../../enums';

interface Props {
  [otherProps: string]: any;
}

export const Toast = (props: Props) => {
  const { toastType } = props;
  switch (toastType) {
    case TOAST_TYPE.ERROR:
    case TOAST_TYPE.SUCCESS:
    case TOAST_TYPE.INFO:
    case TOAST_TYPE.WARNING:
      return toast(<ToastInnerBody {...props} />, {
        toastId: '',
      });
    default:
      return <></>;
  }
};

const ToastInnerBody = (props: Props) => {
  const { toastType, message } = props;
  switch (toastType) {
    case TOAST_TYPE.WARNING:
      return (
        <div
          style={{
            background: '#ffebe1',
            border: '2px solid #ff7024',
            boxSizing: 'border-box',
            boxShadow: '0px 1px 10px rgba(136, 136, 136, 0.5)',
            minHeight: '64px',
            padding: '10px',
            display: 'flex',
          }}
        >
          <img
            src={`${config.APP_ENDPOINT}images/warning-svg.svg`}
            style={{ float: 'left', marginRight: '8px' }}
          />
          <div
            style={{
              fontStyle: 'normal',
              fontWeight: 'normal',
              lineHeight: 'normal',
              fontSize: '16px',
              color: '#ff5900',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {message}
          </div>
        </div>
      );
    case TOAST_TYPE.SUCCESS:
      return (
        <div
          style={{
            background: '#ddefd3',
            border: '2px solid #57ac2d',
            boxSizing: 'border-box',
            boxShadow: '0px 1px 10px rgba(136, 136, 136, 0.5)',
            minHeight: '64px',
            padding: '10px',
            display: 'flex',
          }}
        >
          <img
            src={`${config.APP_ENDPOINT}images/Check.svg`}
            style={{ float: 'left', marginRight: '8px' }}
          />
          <div
            style={{
              fontStyle: 'normal',
              fontWeight: 'normal',
              lineHeight: 'normal',
              fontSize: '16px',
              color: '#57ac2d',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {message}
          </div>
        </div>
      );
    case TOAST_TYPE.ERROR:
      return (
        <div
          style={{
            background: '#f7dddd',
            border: '2px solid #ff0000',
            boxSizing: 'border-box',
            boxShadow: '0px 1px 10px rgba(136, 136, 136, 0.5)',
            minHeight: '64px',
            padding: '10px',
            display: 'flex',
          }}
        >
          <img
            src={`${config.APP_ENDPOINT}images/Errorcross.svg`}
            style={{ float: 'left', marginRight: '8px' }}
          />
          <div
            style={{
              fontStyle: 'normal',
              fontWeight: 'normal',
              lineHeight: 'normal',
              fontSize: '16px',
              color: '#ff0000',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {message}
          </div>
        </div>
      );
    case TOAST_TYPE.INFO:
      return (
        <div
          style={{
            background: '#e1f2ff',
            border: '2px solid #789bb6',
            boxSizing: 'border-box',
            boxShadow: '0px 1px 10px rgba(136, 136, 136, 0.5)',
            minHeight: '64px',
            padding: '10px',
            display: 'flex',
          }}
        >
          <img
            src={`${config.APP_ENDPOINT}images/info-svg.svg`}
            style={{ float: 'left', marginRight: '8px' }}
          />
          <div
            style={{
              fontStyle: 'normal',
              fontWeight: 'normal',
              lineHeight: 'normal',
              fontSize: '16px',
              color: '#6386a3',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {message}
          </div>
        </div>
      );
    default:
      return <></>;
  }
};
