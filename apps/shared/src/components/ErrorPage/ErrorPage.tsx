import React from 'react';
import config from '../../config';
interface Props {
  isPageNotFound: boolean;
  isAccountActive: boolean;
}

function ErrorPage(props: Props) {
  const { isPageNotFound, isAccountActive } = props;

  return (
    <div
      style={{ textAlign: 'center', marginTop: '20%', background: '#ededed' }}
    >
      <div>
        <img
          src={`${config.APP_ENDPOINT}images/pagenotavaliable.svg`}
          alt="Page Not Found"
          width="195px"
        />
      </div>
      <div>
        <div
          style={{
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            fontSize: '30px',
            textAlign: 'center',
            color: 'rgb(104, 104, 104)',
            marginTop: '30px !important',
          }}
        >
          {isPageNotFound
            ? 'Page Unavailable'
            : !isAccountActive
            ? 'Account Inactive'
            : 'Page Unavailable'}
        </div>
        <div
          style={{
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            fontSize: '18px',
            textAlign: 'center',
            color: 'rgb(85, 85, 85)',
            margin: ' 0 auto',
            marginTop: '20px',
            width: '47%',
          }}
        >
          {isPageNotFound
            ? ' This page is no longer available.'
            : !isAccountActive
            ? ' This page is no longer available because the account is inactive or cancelled.'
            : ' This page is no longer available. It may be inactive or deleted.'}
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
