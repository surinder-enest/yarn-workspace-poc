import React from 'react';
import { toast } from 'react-toastify';
import config from '../../config';
import { TOAST_TYPE } from '../../enums';

interface Props {
  [otherProps: string]: any;
}

export const Toast = (props: Props) => {
  const { type } = props;
  switch (type) {
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
  const { type, message } = props;
  switch (type) {
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
    default:
      return <></>;
  }
};
