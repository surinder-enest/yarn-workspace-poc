import React from "react";
import MobilePage from "../../components/mobilePage/MobilePage"
import { withRouter } from 'next/router'
import { MobilePageService } from "../../services";
import Head from "next/head";

interface Props {
    mobilePageApiData: any;
    router: any;
}

class MobilePageName extends React.Component<Props>{

    static async getInitialProps({ query: { mobilepageDirectoryId = '0000', mobilepageName = 'test' } }) {
        if (!mobilepageDirectoryId || !mobilepageName)
            return { mobilePageApiData: {} };

        const apiResponse: string = await MobilePageService.getMobilePageDetailsForRender('s.mobilepages.co', mobilepageDirectoryId, mobilepageName);
        return { mobilePageApiData: apiResponse };
    }

    render() {
        const { router } = this.props
        const pageName = router?.query?.mobilepageName;
        const pageMainURL = `http://s.mobilepages.co:5001${router?.asPath}`;
        const pageSearchDetails = this.props?.mobilePageApiData?.mobilePageData?.seoSearchDetails;
        const isEnablePageTracking = pageSearchDetails?.isEnableMobileDiscoveryOnSeo === true;
        const pageSEOPreviewDetails = this.props?.mobilePageApiData?.mobilePageData?.mobilePageSEOPreviewDetails;
        const previewImageLink = pageSEOPreviewDetails?.imageLink;
        const geoLocationAddressDetails = this.props?.mobilePageApiData?.mobilePageData?.geoLocationDetails.address;
        console.log(pageMainURL);
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{pageName}</title>
                    <meta name="title" content={pageName} />
                    <meta name="description" content="Mindme mobile pages." />
                    <meta name="url" content={pageMainURL} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={pageName} />
                    <meta property="og:url" content={pageMainURL} />
                    <meta property="twitter:url" content={pageMainURL} />
                    <meta property="og:description" content="Mindme mobile pages." />
                    {
                        pageSearchDetails && pageSearchDetails.metaKeywords
                        && <meta property="keywords" content={pageSearchDetails.metaKeywords} /> 
                    } 
                    {
                        pageSearchDetails && pageSearchDetails.metaCategories
                        && <>
                            <meta name="description" content={pageSearchDetails.metaCategories} />
                            <meta property="og:description" content={pageSearchDetails.metaCategories} />
                            <meta property="twitter:description" content={pageSearchDetails.metaCategories} />
                        </>
                    }
                    {
                        isEnablePageTracking && <meta name="robots" content="noindex" />
                    }
                    {
                        previewImageLink
                        && <meta property="image" content={previewImageLink} />
                        && <meta property="og:image" content={previewImageLink} />
                        && <meta property="twitter:image" content={previewImageLink} />
                    }
                    {
                        geoLocationAddressDetails && geoLocationAddressDetails.map((geoAddreess: any) => {
                            const locationDetails = geoAddreess?.Location
                            return (<>
                                {
                                    locationDetails
                                    && <meta name="geo.position" content={`${locationDetails.Latitude};${locationDetails.Longitutd}`} />
                                }
                            </>
                            )
                        })
                    }
                </Head>
                <MobilePage mobilePageData={this.props.mobilePageApiData?.mobilePageData} />
            </div>
        );
    }
}
export default withRouter(MobilePageName)
