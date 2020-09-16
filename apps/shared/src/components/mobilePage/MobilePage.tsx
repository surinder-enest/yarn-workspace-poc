import React from 'react';
import { MobilePageModel, BuilderElementModel } from '../../models';
import { BuilderElement } from '..';

interface Props {
  pageData: MobilePageModel;
}

class MobilePage extends React.Component<Props> {
  render() {
    const {
      pageStyles,
      builderElements,
      accountId,
      contactId,
      id,
      countriesAndStates,
      accountCountryId,
    } = this.props.pageData;
    const {
      borderStyle,
      borderWidth,
      borderColor,
      backgroundColor,
    } = pageStyles;
    return (
      <div
        style={{
          margin: '0px',
          height: '100%',
        }}
      >
        <div style={{ width: '100%', padding: '0px', height: '100%' }}>
          <div style={{ display: 'table', height: '100%', width: '100%' }}>
            <div
              style={{
                backgroundColor,
                verticalAlign: 'middle',
                height: 'calc(100vh - 0px)',
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  width: '100%',
                  padding: '0px',
                }}
              >
                <div
                  style={{
                    maxWidth: '600px',
                    margin: '15px auto',
                    backgroundColor: 'rgb(255, 255, 255)',
                  }}
                >
                  <div style={{ margin: '0px' }}>
                    <div
                      style={{
                        borderStyle,
                        borderWidth,
                        borderColor,
                      }}
                    >
                      {builderElements.map(
                        (detail: BuilderElementModel, idx: number) => (
                          <BuilderElement
                            key={idx}
                            builderElement={detail}
                            moduleId={id}
                            contactId={contactId}
                            accountId={accountId}
                            accountCountryId={accountCountryId}
                            responseCapturedFromModule="MobilePage"
                            countriesAndStates={countriesAndStates}
                            isActualRendering={true}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MobilePage;
