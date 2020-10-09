import React from 'react';
import config from '../../config';
import { ELEMENT_CALLED_FROM } from '../../enums';
import {
  MobilePageModel,
  BuilderElementModel,
  ContactModel,
} from '../../models';
import { BuilderElement } from '../BuilderElement';

interface IProps {
  pageData: MobilePageModel;
  isActualRendering: boolean;
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

  private pageNotFound = () => {
    const { isAccountActive, isPageNotFound } = this.props.pageData;

    return (
      <div
        style={{ textAlign: 'center', marginTop: '20%', background: '#ededed' }}
      >
        <div>
          <img
            src={`${config.APP_ENDPOINT}/images/pagenotavaliable.svg`}
            alt="Page Not Found"
            width="195px"
          />
        </div>
        <div>
          <div
            style={{
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal',
              fontSize: '30px',
              textAlign: 'center',
              color: 'rgb(104, 104, 104)',
              marginTop: '30px !important',
            }}
          >
            {isPageNotFound
              ? 'Page Unavailable'
              : !isAccountActive
              ? 'Account Inactive'
              : 'Page Unavailable'}
          </div>
          <div
            style={{
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              fontSize: '18px',
              textAlign: 'center',
              color: 'rgb(85, 85, 85)',
              margin: ' 0 auto',
              marginTop: '20px',
              width: '47%',
            }}
          >
            {isPageNotFound
              ? ' This page is no longer available.'
              : !isAccountActive
              ? ' This page is no longer available because the account is inactive or cancelled.'
              : ' This page is no longer available. It may be inactive or deleted.'}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      pageStyles,
      builderElements,
      accountId,
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
                      {builderElements.length === 0
                        ? this.pageNotFound()
                        : builderElements.map(
                            (detail: BuilderElementModel, idx: number) => (
                              <BuilderElement
                                key={idx}
                                builderElement={detail}
                                moduleId={id}
                                contact={this.state.contact}
                                accountId={accountId}
                                accountCountryId={accountCountryId}
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
