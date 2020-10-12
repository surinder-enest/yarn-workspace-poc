import { ContactModel, ELEMENT_CALLED_FROM, ErrorPage, Offer, OfferModel, OfferService } from '@mindme/shared';
import React from 'react';
import { PageHeader, SnapShotWrapper } from '../../../components';

interface Props {
  offerData: OfferModel;
  accountId: string;
}

class OfferSnapshot extends React.Component<Props> {
  static async getInitialProps({ query: { offerAccountId = '', offerId = '' } }) {
    const apiResponse = await OfferService.getOfferDetailsForSnapShot(offerAccountId, offerId);
    return { accountId: offerAccountId, offerData: apiResponse };
  }

  private pageNotFound = () => {
    return <ErrorPage isPageNotFound={!this.props.offerData?.id} isAccountActive={false} />;
  };

  render() {
    return (
      <>
        <PageHeader />
        {!this.props.offerData?.id ? (
          this.pageNotFound()
        ) : (
          <SnapShotWrapper>
            <Offer
              offer={this.props.offerData}
              isActualRendering={false}
              elementId={this.props.offerData?.id}
              moduleId={this.props.offerData?.id}
              contact={new ContactModel()}
              accountId={this.props.accountId}
              isSnapshot={false}
              responseCapturedFromModule={ELEMENT_CALLED_FROM.WEB_FORM}
            />
          </SnapShotWrapper>
        )}
      </>
    );
  }
}
export default OfferSnapshot;
