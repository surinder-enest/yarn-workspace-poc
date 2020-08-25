import React from "react";
// import MobilePage from "../../components/mobilePage/MobilePage"
import { withRouter } from 'next/router'
import { MobilePageService } from "../../services";
import Head from "next/head";

interface Props {
    mobilePageData: any;
    router: any;
}

class MobilePageName extends React.Component<Props>{

    private readonly defaultPreviewImage: string = 'https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297__340.jpg'

    static async getInitialProps({ query: { mobilepageDirectoryId = '0000', mobilepageName = 'test' } }) {
        if (!mobilepageDirectoryId || !mobilepageName)
            return { mobilePageData: {} };

        const apiResponse: string = await MobilePageService.getMobilePageDetailsForRender('s.mobilepages.co', mobilepageDirectoryId, mobilepageName);
        return { mobilePageData: apiResponse };
    }

    render() {
        const { router, mobilePageData } = this.props;
        const pageName = router?.query?.mobilepageName || 'MindMe Mobile';
        const pageMainURL = `http://s.mobilepages.co:5001${router?.asPath}`;
        const pageTitle = mobilePageData?.pageTitle || pageName;
        const pageDescription = mobilePageData?.pageDescription || ''; 
        const previewImageLink = mobilePageData?.previewImageLink || this.defaultPreviewImage;
        // const noindex = mobilePageData?.mobilePageData?.seoSearchDetails?.isEnableMobileDiscoveryOnSeo ? 'noindex' : '';
        // const geoLocationAddressDetails = mobilePageData?.mobilePageData?.geoLocationDetails.address || [];
        const metaKeywords = mobilePageData?.metaKeywords || '';
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{pageTitle}</title>
                    <meta property="og:type" content="website" />
                    <meta name="title" content={pageTitle} />
                    <meta property="og:title" content={pageTitle} />
                    <meta name="description" content={pageDescription} />
                    <meta property="og:description" content={pageDescription} />
                    <meta property="twitter:description" content={pageDescription} /> 
                    <meta name="url" content={pageMainURL} />
                    <meta property="og:url" content={pageMainURL} />
                    <meta property="twitter:url" content={pageMainURL} />
                    <meta property="image" content={previewImageLink} />
                    <meta property="og:image" content={previewImageLink} />
                    <meta property="twitter:image" content={previewImageLink} />
                    <meta property="keywords" content={metaKeywords} />
                    {/* <meta name="robots" content={noindex} />
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
                    } */}
                </Head>
                {/* <MobilePage mobilePageData={this.props.mobilePageApiData?.mobilePageData} /> */}
                SSR WOKRING !
            </div>
        );
    }
}
export default withRouter(MobilePageName)
