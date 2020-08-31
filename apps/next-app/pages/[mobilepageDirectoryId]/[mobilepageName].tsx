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
