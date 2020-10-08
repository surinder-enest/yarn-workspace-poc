import React from 'react';
import { withRouter } from 'next/router';
import { MobilePageModel, MobilePageService } from '@mindme/shared';
import { MobilePage } from '../../components';

interface Props {
  mobilePageData: MobilePageModel;
  router: any;
}

class MobilePageName extends React.Component<Props> {
  static async getInitialProps({
    query: { mobilepageDirectoryId = '0000', contId = '' },
    req: {
      headers: { host = '' },
    },
  }) {
    if (!mobilepageDirectoryId) return { mobilePageData: {} };
    const apiResponse = await MobilePageService.getMobilePageDetailsForRender(host, '', mobilepageDirectoryId, contId);
    return { mobilePageData: apiResponse };
  }

  render() {
    return <MobilePage mobilePageData={this.props.mobilePageData} />;
  }
}
export default withRouter(MobilePageName);
