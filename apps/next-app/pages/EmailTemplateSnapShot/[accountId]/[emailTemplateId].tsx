import { BuilderElement, EmailTemplateModel, BuilderElementModel, TemplateService, ErrorPage } from '@mindme/shared';
import React, { Component } from 'react';
import { PageHeader, SnapShotWrapper } from '../../../components';

interface Props {
  templateData: EmailTemplateModel;
  router: any;
}

export default class EmailTemplate extends Component<Props> {
  static async getInitialProps({ query: { accountId = '', emailTemplateId = '' } }) {
    if (!accountId && !emailTemplateId) return { elementList: {} };
    const apiResponse = await TemplateService.getEmailTemplateBuilderDetailForSnapShot(emailTemplateId, accountId);
    return { templateData: apiResponse };
  }

  private pageNotFound = () => {
    const { isSubAccountDeleted, builderElements } = this.props.templateData;
    const isPageNotFound = isSubAccountDeleted === false && builderElements.length === 0;
    const isAccountActive = !isSubAccountDeleted;
    return <ErrorPage isPageNotFound={isPageNotFound} isAccountActive={isAccountActive} />;
  };

  render() {
    const { builderElements, isNotFoundOrDeleted, isSubAccountDeleted } = this.props.templateData;
    return (
      <>
        <PageHeader />
        <SnapShotWrapper>
          {isNotFoundOrDeleted || isSubAccountDeleted
            ? this.pageNotFound()
            : builderElements?.map((detail: BuilderElementModel, idx: number) => (
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
