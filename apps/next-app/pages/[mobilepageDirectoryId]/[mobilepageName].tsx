import React from 'react';
import { withRouter } from 'next/router';
import { MobilePageService } from '../../services';
import Head from 'next/head';
import { MobilePageModel } from '@mindme/shared';
import { MetaData, MobilePage } from '../../components';

interface Props {
  mobilePageData: MobilePageModel;
  router: any;
}

class MobilePageName extends React.Component<Props> {
  static async getInitialProps({ query: { mobilepageDirectoryId = '0000', mobilepageName = 'test' } }) {
    if (!mobilepageDirectoryId || !mobilepageName) return { mobilePageData: {} };

    const apiResponse = await MobilePageService.getMobilePageDetailsForRender(
      's.mobilepages.co',
      mobilepageDirectoryId,
      mobilepageName
    );
    return { mobilePageData: apiResponse };
  }

  render() {
    const { mobilePageData } = this.props;
    const { metaData, pageLink } = mobilePageData;
    return (
      <>
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" />
        <style jsx global>
          {`
            body {
              height: 100%;
              width: 100%;
              background: #fff;
              margin: 0;
              font-family: 'Open Sans', Helvetica, Arial, sans-serif;
              min-height: 667px;
            }
            .padding-right-0 {
              padding-right: 0 !important;
            }
            .no-padding {
              padding: 0 !important;
            }
            .padding-left-0 {
              padding-left: 0 !important;
            }
            .form-control {
              height: 30px;
            }
            .birthday-select {
              font-size: 18px;
              border-color: transparent;
              color: #555555;
              box-shadow: none;
              padding: 2px;
              text-align: right;
              max-width: 100%;
              width: auto;
              max-height: 200px;
              cursor: pointer;
              font-weight: 300;
            }
            .birthday-select:focus {
              border-color: #3aa6dd;
            }
            .no-margin {
              margin: 0 !important;
            }
            .padding-top-10 {
              padding-top: 10px;
            }
            .col-md-4,
            .col-sm-8 {
              position: relative;
              min-height: 1px;
              padding-right: 15px;
              padding-left: 15px;
            }
            .col-md-4 {
              width: 33.33333333%;
            }
            .col-md-8 {
              width: 66.66666667%;
            }
            .col-md-12 {
              width: 100%;
            }
            .checkbox {
              padding-left: 8px;
              white-space: nowrap;
              overflow: hidden !important;
              text-overflow: ellipsis;
              position: relative;
              display: block;
              margin-top: 10px;
              margin-bottom: 10px;
            }
            .circle-checkbox .checkbox label::before {
              border-radius: 100px;
            }
            .checkbox label::before {
              content: '';
              display: inline-block;
              position: absolute;
              width: 15px;
              height: 15px;
              left: 0;
              margin-left: -20px;
              border: 1px solid #aaaaaa;
              border-radius: 3px;
              background-color: #f8f8f8;
              -webkit-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
              -o-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
              transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
            }
            .checkbox-primary input[type='checkbox']:checked + label::after {
              color: #ffffff;
            }
            .checkbox input[type='checkbox']:checked + label::after {
              content: '✓';
            }
            .checkbox-primary input[type='checkbox']:checked + label::after {
              color: #ffffff;
            }
            .checkbox label::after {
              display: inline-block;
              position: absolute;
              width: 14px;
              height: 14px;
              left: 2px;
              top: -2px;
              margin-left: -20px;
              padding-left: 2px;
              padding-top: 1px;
              font-size: 11px;
              color: #555555;
            }
            .checkbox label {
              display: inline-block;
              position: relative;
              padding-left: 5px;
              color: #555555;
              font-size: 14px;
              font-weight: 600;
              line-height: 1.4em;
            }
            .checkbox-primary input[type='checkbox']:checked + label::before {
              background-color: #57ac2d;
              border-color: #57ac2d;
            }
            .circle-checkbox .checkbox label::before {
              border-radius: 100px;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p {
              color: #333333;
              line-height: 1.25;
              font-weight: normal;
              font-style: normal;
              font-family: 'Open Sans', sans-serif;
              margin-bottom: 1em;
            }
          `}
        </style>
        <Head>
          <MetaData pageLink={pageLink} metaData={metaData} />
        </Head>
        <MobilePage pageData={this.props.mobilePageData} />
      </>
    );
  }
}
export default withRouter(MobilePageName);
