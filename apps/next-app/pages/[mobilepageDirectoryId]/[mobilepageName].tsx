import React from "react";
import { withRouter } from 'next/router'
import { MobilePageService } from "../../services";
import Head from "next/head";
import { MobilePageModel } from "@mindme/shared";
import { MetaData, MobilePage } from "../../components";

interface Props {
    mobilePageData: MobilePageModel;
    router: any;
}

class MobilePageName extends React.Component<Props>{

    static async getInitialProps({ query: { mobilepageDirectoryId = '0000', mobilepageName = 'test' } }) {
        if (!mobilepageDirectoryId || !mobilepageName)
            return { mobilePageData: {} };

        const apiResponse = await MobilePageService.getMobilePageDetailsForRender('s.mobilepages.co', mobilepageDirectoryId, mobilepageName);
        return { mobilePageData: apiResponse };
    }

    render() {
        const { mobilePageData } = this.props;
        const { metaData, pageLink } = mobilePageData;
        return (
            <>
                <style jsx global>
                    {`body {  height: 100%;
                                width: 100%;
                                background: #fff;
                                margin: 0;
                                font-family: "Open Sans", Helvetica, Arial, sans-serif;
                                min-height: 667px; 
                            } 
                            .padding-right-0 {
                                padding-right: 0 !important;
                            }
                            .no-padding {
                                padding: 0 !important;
                            }
                            .padding-left-0{
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
                                border-color:#3AA6DD;
                              }
                              .no-margin{
                                  margin:0 !important;
                              }
                              .padding-top-10{
                                  padding-top:10px;
                              }
                              .col-md-4,.col-sm-8{
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
                                padding-left: 20px;
                                white-space: nowrap;
                                overflow: hidden !important;
                                text-overflow: ellipsis;
                                position: relative;
                                display: block;
                                margin-top: 10px;
                                margin-bottom: 10px;
                            }`}
                </style>
                <Head>
                    <MetaData pageLink={pageLink} metaData={metaData} />
                </Head>
                <MobilePage pageData={this.props.mobilePageData} />
            </>
        );
    }
}
export default withRouter(MobilePageName)
