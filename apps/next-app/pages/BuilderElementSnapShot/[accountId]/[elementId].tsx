import { BuilderElement, BuilderElementModel, BuilderElementService } from '@mindme/shared';
import { withRouter } from 'next/router';
import React, { Component } from 'react';
import { PageHeader } from '../../../components';

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
                      <div id="divScreenShotElements">
                        {elementList?.map((detail: BuilderElementModel, idx: number) => (
                          <BuilderElement
                            key={idx}
                            builderElement={detail}
                            responseCapturedFromModule="MobilePage"
                            isSnapshot={true}
                            isActualRendering={false}
                          />
                        ))}
                      </div>
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
export default withRouter(BuilderElementSnapShot);
