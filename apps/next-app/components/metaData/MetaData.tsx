import React from "react";
import { MetaDataModel } from "@mindme/shared";

interface Props {
    pageLink: string;
    metaData: MetaDataModel;
}

class MetaData extends React.Component<Props>{
    render() {
        const { pageLink, metaData } = this.props;
        return (
            <>
                <meta charSet="utf-8" />
                <title>{metaData.pageTitle}</title>
                <meta property="og:type" content="website" />
                <meta name="title" content={metaData.pageTitle} />
                <meta property="og:title" content={metaData.pageTitle} />
                <meta name="description" content={metaData.description} />
                <meta property="og:description" content={metaData.description} />
                <meta property="twitter:description" content={metaData.description} />
                <meta name="url" content={pageLink} />
                <meta property="og:url" content={pageLink} />
                <meta property="twitter:url" content={pageLink} />
                <meta property="image" content={metaData.previewImageLink} />
                <meta property="og:image" content={metaData.previewImageLink} />
                <meta property="twitter:image" content={metaData.previewImageLink} />
                <meta property="keywords" content={metaData.metaKeywords} />
                <meta name="robots" content={metaData.noIndex} />
                {/* {
                    metaData.geoLocationDetails.map((geoAddreess: any) => {
                        return (<>
                            {
                                locationDetails
                                && <meta name="geo.position" content={`${locationDetails.latitude};${locationDetails.longitute}`} />
                            }
                        </>
                        )
                    })
                } */}
            </>
        );
    }
}
export default MetaData
