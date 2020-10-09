import React from 'react';
import { withRouter } from 'next/router';
import { MobilePageModel, MobilePageService } from '@mindme/shared';
import { MobilePage } from '../../components';

interface Props {
  mobilePageData: MobilePageModel;
  router: any;
  isActualRendering: boolean;
}

class MobilePageName extends React.Component<Props> {
  static async getInitialProps({
    query: { mobilepageDirectoryId = '0000', contId = '', snapShotPageId = '' },
    req: {
      headers: { host = '' },
    },
  }) {
    if (!mobilepageDirectoryId) return { mobilePageData: {} };
    const apiResponse = await MobilePageService.getMobilePageDetailsForRender(
      host,
      '',
      mobilepageDirectoryId,
      contId,
      snapShotPageId
    );
    return { mobilePageData: apiResponse };
  }

  render() {
    return <MobilePage isActualRendering={true} mobilePageData={this.props.mobilePageData} />;
  }
}
export default withRouter(MobilePageName);
