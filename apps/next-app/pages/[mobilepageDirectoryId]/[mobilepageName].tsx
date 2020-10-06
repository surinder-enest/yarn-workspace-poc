import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { MobilePageModel, MobilePage, MobilePageService, ToastMainContainer } from '@mindme/shared';
import { MetaData } from '../../components';

interface Props {
  mobilePageData: MobilePageModel;
  router: any;
}

class MobilePageName extends React.Component<Props> {
  static async getInitialProps({ query: { mobilepageDirectoryId = '0000', mobilepageName = 'test', contId = '' } }) {
    if (!mobilepageDirectoryId || !mobilepageName) return { mobilePageData: {} };

    const apiResponse = await MobilePageService.getMobilePageDetailsForRender(
      's.mobilepages.co',
      mobilepageDirectoryId,
      mobilepageName,
      contId
    );
    return { mobilePageData: apiResponse };
  }

  render() {
    const { mobilePageData } = this.props;
    const { metaData, pageLink } = mobilePageData;
    return (
      <>
        <Head>
          <script type="text/javascript">
            var giftofspeed1 = document.createElement('link'); giftofspeed1.rel = 'stylesheet'; giftofspeed1.href
            ='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'; giftofspeed1.type =
            'text/css'; var godefer1 = document.getElementsByTagName('link')[0];
            godefer1.parentNode.insertBefore(giftofspeed1, godefer1); var giftofspeed2 = document.createElement('link');
            giftofspeed2.rel = 'stylesheet'; giftofspeed2.href
            ='https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css'; giftofspeed2.type =
            'text/css'; var godefer2 = document.getElementsByTagName('link')[0];
            godefer2.parentNode.insertBefore(giftofspeed2, godefer2); var giftofspeed3 = document.createElement('link');
            giftofspeed3.rel = 'stylesheet'; giftofspeed3.href
            ='https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'; giftofspeed3.type = 'text/css';
            var godefer3 = document.getElementsByTagName('link')[0]; godefer3.parentNode.insertBefore(giftofspeed3,
            godefer3); var giftofspeed4 = document.createElement('link'); giftofspeed4.rel = 'stylesheet';
            giftofspeed4.href ='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800';
            giftofspeed4.type = 'text/css'; var godefer4 = document.getElementsByTagName('link')[0];
            godefer4.parentNode.insertBefore(giftofspeed4, godefer4); var giftofspeed5 = document.createElement('link');
            giftofspeed5.rel = 'stylesheet'; giftofspeed5.href
            ='https://fonts.googleapis.com/css?family=https://fonts.googleapis.com/css?family=Dancing+Script|Abril+Fatface|Dancing+Script|Great+Vibes|Josefin+Sans|Lato|Lobster|Merriweather|Montserrat|Open+Sans|Oswald|Pacifico|Playfair+Display|Poiret+One|Poppins|Quicksand|Raleway|Roboto|Sacramento|Ubuntu|Arial|Sofia';
            giftofspeed5.type = 'text/css'; var godefer5 = document.getElementsByTagName('link')[0];
            godefer5.parentNode.insertBefore(giftofspeed5, godefer5); var giftofspeed6 = document.createElement('link');
            giftofspeed6.rel = 'stylesheet'; giftofspeed6.href
            ='https://unpkg.com/react-toastify@4.5.2/dist/ReactToastify.css'; giftofspeed6.type = 'text/css'; var
            godefer6 = document.getElementsByTagName('link')[0]; godefer6.parentNode.insertBefore(giftofspeed6,
            godefer6); var head = document.getElementsByTagName('head')[0]; var recaptchaElement =
            document.getElementsByClassName('g-recaptcha')[0]; var script1 = document.createElement('script');
            script1.type = 'text/javascript'; script1.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
            if (recaptchaElement) head.appendChild(script1); var googleMapElement =
            document.getElementsByClassName('googlemap')[0]; var script2 = document.createElement('script');
            script2.type = 'text/javascript'; script2.src =
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyA9U_KJvouX-etw42VnHAFJngJnp98Hvrw&v=3.exp&libraries=places,geometry,drawing';
            if(googleMapElement) head.appendChild(script2);
          </script>
          <style type="text/css">
            {`
            body {
              height: 100%;
              width: 100%;
              background: #ededed;
              margin: 0;
              font-family: 'Open Sans', Helvetica, Arial, sans-serif !important;
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
            .checkbox label::after {
              display: inline-block;
              position: absolute;
              width: 12px;
              height: 12px;
              left: 1px;
              top: 3px;
              margin-left: 0px;
              padding-left: 2px;
              padding-top: 1px;
              font-size: 11px;
              color: #555555;
              font-family: 'FontAwesome';
              content:''
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
             .checkbox-primary input[type='checkbox']:checked + label::after {
              color: #ffffff;
            }
           .checkbox input[type='checkbox']:checked + label::after {
              background: url(https://i.ibb.co/WzbWf7S/right.png) no-repeat ;
              background-size: 100%;
              background-position: center;
            }
            
            .checkbox-primary input[type='checkbox']:checked + label::after {
              color: #ffffff;
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
            .btn-builder p{
              line-height: 1.12;
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
            .radio label::before {
              content: "";
              display: inline-block;
              position: absolute;
              width: 15px;
              height: 15px;
              left: 0;
              top: 0;
              margin-left: 0;
              border: 1px solid #979797;
              border-radius: 50%;
              background-color: #ffffff;
              -webkit-transition: border 0.15s ease-in-out;
              -o-transition: border 0.15s ease-in-out;
              transition: border 0.15s ease-in-out;
            }
            .radio label::after {
              display: inline-block;
              position: absolute;
              content: "";
              width: 9px;
              height: 9px;
              left: 3px;
              top: 3px;
              margin-left: 0;
              border-radius: 50%;
              background-color: #57AC2D;
              -webkit-transform: scale(0, 0);
              -ms-transform: scale(0, 0);
              -o-transform: scale(0, 0);
              transform: scale(0, 0);
              -webkit-transition: -webkit-transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);
              -moz-transition: -moz-transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);
              -o-transition: -o-transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);
              transition: transform 0.1s cubic-bezier(0.8, -0.33, 0.2, 1.33);
            }
            .radio input[type="radio"]:checked+label::after {
              -webkit-transform: scale(1, 1);
              transform: scale(1, 1);
            }
            .Toastify__toast{
              padding:0px !important;
            }
            .Toastify__close-button--default{
              display:none;
            }
            .Toastify__toast-container{
              width: 388px !important;
            }
          `}
          </style>
          <MetaData pageLink={pageLink} metaData={metaData} />
        </Head>
        <ToastMainContainer />
        <MobilePage pageData={this.props.mobilePageData} />
      </>
    );
  }
}
export default withRouter(MobilePageName);
