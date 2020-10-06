import React from 'react';
import {
  MobilePageModel,
  BuilderElementModel,
  ContactModel,
} from '../../models';
import { BuilderElement } from '../BuilderElement';

interface IProps {
  pageData: MobilePageModel;
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
                            contact={this.state.contact}
                            accountId={accountId}
                            accountCountryId={accountCountryId}
                            responseCapturedFromModule="MobilePage"
                            countriesAndStates={countriesAndStates}
                            isActualRendering={true}
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
