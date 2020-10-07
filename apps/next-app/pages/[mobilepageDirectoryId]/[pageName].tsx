import React from 'react';
import { withRouter } from 'next/router';
import { MobilePageModel, MobilePageService } from '@mindme/shared';
import { MobilePage } from '../../components';

interface Props {
  mobilePageData: MobilePageModel;
  router: any;
}

class PageName extends React.Component<Props> {
  static async getInitialProps({
    query: { mobilepageDirectoryId = '0000', pageName = 'test', contId = '' },
    req: {
      headers: { host = '' },
    },
  }) {
    if (!mobilepageDirectoryId && !pageName) return { mobilePageData: {} };
    const apiResponse = await MobilePageService.getMobilePageDetailsForRender(
      host,
      mobilepageDirectoryId,
      pageName,
      contId
    );
    return { mobilePageData: apiResponse };
  }

  render() {
    return <MobilePage mobilePageData={this.props.mobilePageData} />;
  }
}
export default withRouter(PageName);
