import React from 'react';
import { withRouter } from 'next/router';
import { MobilePageModel, MobilePageService } from '@mindme/shared';
import { MobilePage } from '../../components';

interface Props {
  mobilePageData: MobilePageModel;
  router: any;
  isSnapshot: boolean;
}

class PageName extends React.Component<Props> {
  static async getInitialProps({
    query: { mobilepageDirectoryId = '', pageName = '', contId = '', snapShotPageId = '' },
    req: {
      headers: { host = '' },
    },
  }) {
    if (!mobilepageDirectoryId && !pageName) return { mobilePageData: {} };
    const apiResponse = await MobilePageService.getMobilePageDetailsForRender(
      host,
      mobilepageDirectoryId,
      pageName,
      contId,
      snapShotPageId
    );
    return { mobilePageData: apiResponse, isSnapshot: !snapShotPageId === false };
  }

  render() {
    const { isSnapshot, mobilePageData } = this.props;
    return <MobilePage isActualRendering={!isSnapshot} isSnapshot={isSnapshot} mobilePageData={mobilePageData} />;
  }
}
export default withRouter(PageName);
