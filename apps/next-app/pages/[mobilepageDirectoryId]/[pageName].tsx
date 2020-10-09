import React from 'react';
import { withRouter } from 'next/router';
import { MobilePageModel, MobilePageService } from '@mindme/shared';
import { MobilePage } from '../../components';

interface Props {
  mobilePageData: MobilePageModel;
  router: any;
  isActualRendering: boolean;
}

class PageName extends React.Component<Props> {
  static async getInitialProps({
    query: { mobilepageDirectoryId = '0000', pageName = 'test', contId = '', snapShotPageId = '' },
    req: {
      headers: { host = '' },
    },
  }) {
    console.log({ mobilepageDirectoryId, pageName });
    if (!mobilepageDirectoryId && !pageName) return { mobilePageData: {} };
    const apiResponse = await MobilePageService.getMobilePageDetailsForRender(
      host,
      mobilepageDirectoryId,
      pageName,
      contId,
      snapShotPageId
    );
    return { mobilePageData: apiResponse };
  }

  render() {
    return <MobilePage isActualRendering={true} mobilePageData={this.props.mobilePageData} />;
  }
}
export default withRouter(PageName);
