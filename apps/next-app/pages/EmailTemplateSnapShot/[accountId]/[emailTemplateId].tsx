import { BuilderElement, EmailTemplateModel, BuilderElementModel, TemplateService } from '@mindme/shared';
import React, { Component } from 'react';
import { PageHeader } from '../../../components';

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
        <div style={{ margin: '0', height: '100%', background: '#ededed' }}>
          <div style={{ width: '100%', padding: '0', height: '100%' }}>
            <div
              style={{
                display: 'table',
                height: '100%',
                width: '100%',
              }}
            >
              <div
                style={{
                  verticalAlign: 'middle',
                  height: 'calc(100vh - 0px)',
                  overflowY: 'auto',
                }}
              >
                <div
                  style={{
                    maxWidth: '600px',
                    margin: '0px auto 15px auto',
                    backgroundColor: '#fff',
                    minHeight: '380px',
                  }}
                >
                  <div style={{ margin: '0' }}>
                    <div style={{ wordWrap: 'break-word' }}>
                      {isNotFoundOrDeleted || isSubAccountDeleted ? (
                        this.pageNotFound()
                      ) : (
                        <div id="divScreenShotElements">
                          {builderElements?.map((detail: BuilderElementModel, idx: number) => (
                            <BuilderElement
                              key={idx}
                              builderElement={detail}
                              responseCapturedFromModule="MobilePage"
                              isSnapshot={true}
                              isActualRendering={false}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
