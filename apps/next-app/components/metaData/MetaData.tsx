import React from 'react';
import { MetaDataModel, LocationModel } from '@mindme/shared';

interface Props {
  pageLink: string;
  metaData: MetaDataModel;
}

class MetaData extends React.Component<Props> {
  render() {
    const { metaData } = this.props;
    // const pageLink = `http://d.mobilepages.co/${metaData.accountShortUniqueId}/${metaData.htmlPageName}`;
    return (
      <>
        {/* Primary Meta Tags */}
        <title>{metaData.pageTitle}</title>
        <meta name="title" content={metaData.pageTitle} />
        <meta name="description" content={metaData.description} />
        <meta name="url" content={metaData.pageLink} />
        <meta property="image" content={metaData.previewImageLink} />
        <meta property="keywords" content={metaData.metaKeywords} />
        <meta name="robots" content={metaData.noIndex} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaData.pageLink} />
        <meta property="og:title" content={metaData.pageTitle} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.previewImageLink} />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metaData.pageLink} />
        <meta property="twitter:title" content={metaData.pageTitle} />
        <meta property="twitter:description" content={metaData.description} />
        <meta property="twitter:image" content={metaData.previewImageLink} />
        {metaData.geoLocationDetails.map((groLocaltion: LocationModel, idx: number) => {
          return <meta key={idx} name="geo.position" content={`${groLocaltion.latitude};${groLocaltion.longitute}`} />;
        })}
      </>
    );
  }
}
export default MetaData;
