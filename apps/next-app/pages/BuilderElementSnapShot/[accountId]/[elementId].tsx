import { BuilderElement, BuilderElementModel, BuilderElementService } from '@mindme/shared';
import { withRouter } from 'next/router';
import React, { Component } from 'react';
import { PageHeader, SnapShotWrapper } from '../../../components';

interface Props {
  elementList: Array<BuilderElementModel>;
  router: any;
}
class BuilderElementSnapShot extends Component<Props> {
  static async getInitialProps({ query: { accountId = '', elementId = '' } }) {
    if (!accountId && !elementId) return { elementList: {} };
    const apiResponse = await BuilderElementService.getBuilderElementDetailForSnapShot(accountId, elementId);
    return { elementList: apiResponse };
  }
  render() {
    const { elementList } = this.props;

    return (
      <>
        <PageHeader />
        <SnapShotWrapper>
          {elementList?.map((detail: BuilderElementModel, idx: number) => (
            <BuilderElement
              key={idx}
              builderElement={detail}
              responseCapturedFromModule="MobilePage"
              isSnapshot={true}
              isActualRendering={false}
            />
          ))}
        </SnapShotWrapper>
      </>
    );
  }
}
export default withRouter(BuilderElementSnapShot);
