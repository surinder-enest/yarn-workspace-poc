import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { MobilePageModel, MobilePage, MobilePageService } from '@mindme/shared';
import { MetaData } from '../../components';

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
        <link
          href="https://fonts.googleapis.com/css?family=https://fonts.googleapis.com/css?family=Dancing+Script|Abril+Fatface|Dancing+Script|Great+Vibes|Josefin+Sans|Lato|Lobster|Merriweather|Montserrat|Open+Sans|Oswald|Pacifico|Playfair+Display|Poiret+One|Poppins|Quicksand|Raleway|Roboto|Sacramento|Ubuntu|Arial|Sofia"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <script
          src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
          async
          defer
        ></script>
        <script type="text/javascript">document.addEventListener('DOMContentLoaded', function (event) {});</script>
        <style>
          {`
            body {
              height: 100%;
              width: 100%;
              background: #ededed;
              margin: 0;
              font-family: 'Open Sans', Helvetica, Arial, sans-serif;
              min-height: 667px;
              overflow-y: hidden;
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
            .checkbox {
              padding-left: 0px;
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
              margin-left: 0px;
              border: 1px solid #aaaaaa;
              border-radius: 3px;
              background-color: #f8f8f8;
              -webkit-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
              -o-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
              transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
              top: 1px;
            }
            .checkbox-primary input[type='checkbox']:checked + label::after {
              color: #ffffff;
            }
            .checkbox input[type='checkbox']:checked + label::after {
              font-family: 'FontAwesome';
              content: '\f00c';
            }
            .checkbox-primary input[type='checkbox']:checked + label::after {
              color: #ffffff;
            }
            .checkbox label::after {
              display: inline-block;
              position: absolute;
              width: 14px;
              height: 14px;
              left: 1px;
              top: -2px;
              margin-left: 0px;
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
            .checkbox input[type='checkbox'] {
              opacity: 0;
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
             h1{
              font-size:2em;
              margin: 0.67em 0;
             }
            .g-recaptcha + div {
              width: 280px;
              margin: 0 auto;
            }
            .g-recaptcha iframe {
              width: 304px;
            }
            .g-recaptcha {
              margin: 0 auto;
              width: 300px;
              position: relative;
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
