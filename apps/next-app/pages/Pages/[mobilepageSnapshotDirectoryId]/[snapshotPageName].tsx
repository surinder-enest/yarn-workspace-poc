import { MobilePageModel, MobilePageService } from '@mindme/shared';
import { withRouter } from 'next/router';
import React, { Component } from 'react';
import { MobilePage } from '../../../components';

interface Props {
  mobilePageData: MobilePageModel;
  router: any;
  isActualRendering: boolean;
}
class MobilePageSnapshot extends Component<Props> {
  static async getInitialProps({
    query: { mobilepageSnapshotDirectoryId = '', snapshotPageName = '', contId = '', snapShotPageId = '' },
    req: {
      headers: { host = '' },
    },
  }) {
    if (!mobilepageSnapshotDirectoryId && !snapshotPageName) return { mobilePageData: {} };
    const apiResponse = await MobilePageService.getMobilePageDetailsForRender(
      host,
      mobilepageSnapshotDirectoryId,
      snapshotPageName,
      contId,
      snapShotPageId
    );

    return { mobilePageData: apiResponse };
  }

  render() {
    return <MobilePage isSnapshot={true} isActualRendering={false} mobilePageData={this.props.mobilePageData} />;
  }
}

export default withRouter(MobilePageSnapshot);
