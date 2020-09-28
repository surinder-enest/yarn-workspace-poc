import React from 'react';
import { toast } from 'react-toastify';
import { TOAST_TYPE } from '../../enums';

interface Props {
  [otherProps: string]: any;
}

export const Toast = (props: Props) => {
  const { toastType, message } = props;
  return (
    <>
      {toastType === TOAST_TYPE.ERROR
        ? toast(<ToastInnerBody messageToShow={message} type={toastType} />, {
            toastId: '',
          })
        : ''}
      {toastType === TOAST_TYPE.SUCCESS
        ? toast(<ToastInnerBody messageToShow={message} type={toastType} />, {
            toastId: '',
          })
        : ''}
      {toastType === TOAST_TYPE.INFO
        ? toast(<ToastInnerBody messageToShow={message} type={toastType} />, {
            toastId: '',
          })
        : ''}
      {toastType === TOAST_TYPE.WARNING
        ? toast(<ToastInnerBody messageToShow={message} type={toastType} />, {
            toastId: '',
          })
        : ''}
    </>
  );
};

export const ToastInnerBody = (props: Props) => {
  const { type, messageToShow } = props;
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
            src="https://staging.mindmemobile.com/images/warning-svg.svg"
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
            {messageToShow}
          </div>
        </div>
      );
    default:
      return <></>;
  }
};
