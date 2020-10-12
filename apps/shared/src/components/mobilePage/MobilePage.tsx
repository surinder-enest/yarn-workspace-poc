import React from 'react';
import { ELEMENT_CALLED_FROM } from '../../enums';
import {
  MobilePageModel,
  BuilderElementModel,
  ContactModel,
} from '../../models';
import { BuilderElement } from '../BuilderElement';
import ErrorPage from '../ErrorPage/ErrorPage';

interface IProps {
  pageData: MobilePageModel;
  isActualRendering: boolean;
  isSnapshot: boolean;
}

interface IState {
  contact: ContactModel;
}

class MobilePage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      contact: {
        id: '',
        name: '',
        email: '',
        mobileNumber: '',
        isNotYouAllowed: false,
      },
    };
  }

  componentDidMount() {
    const { contact } = this.props.pageData;
    if (contact) {
      this.setContactDetail(contact);
    }
  }

  private setContactDetail(contact: ContactModel) {
    this.setState({ contact });
  }

  render() {
    const {
      pageStyles,
      builderElements,
      accountId,
      id,
      countriesAndStates,
      accountCountryId,
      isAccountActive,
      isPageNotFound,
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
                      {builderElements.length === 0 ? (
                        <ErrorPage
                          isAccountActive={isAccountActive}
                          isPageNotFound={isPageNotFound}
                        />
                      ) : (
                        <div id="divScreenShotElements">
                          {builderElements.map(
                            (detail: BuilderElementModel, idx: number) => (
                              <BuilderElement
                                key={idx}
                                builderElement={detail}
                                moduleId={id}
                                contact={this.state.contact}
                                accountId={accountId}
                                accountCountryId={accountCountryId}
                                isSnapshot={this.props.isSnapshot}
                                responseCapturedFromModule={
                                  ELEMENT_CALLED_FROM.MOBILE_PAGE
                                }
                                countriesAndStates={countriesAndStates}
                                isActualRendering={this.props.isActualRendering}
                                setContactDetail={(contact: ContactModel) =>
                                  this.setContactDetail(contact)
                                }
                              />
                            )
                          )}
                        </div>
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
