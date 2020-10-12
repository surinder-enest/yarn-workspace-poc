import React from 'react';
import { MobilePageModel, ToastContainer, MobilePage as MobilePageComponent, MobilePageService } from '@mindme/shared';
import PageHeader from '../pageHeader/PageHeader';

interface Props {
  mobilePageData: MobilePageModel;
  isActualRendering: boolean;
  isSnapshot: boolean;
}

class MobilePage extends React.Component<Props> {
  componentDidMount() {
    const { accountId, id, contact } = this.props.mobilePageData;
    let isSaveMobilePageOpenDetails = true;
    const mobilePageId = id;
    const mobilePageOpenTime = localStorage.getItem('mobilePageOpenDate');
    const openedMobilePageId = localStorage.getItem(mobilePageId);

    if (mobilePageOpenTime && openedMobilePageId) {
      const nowTime = new Date();
      const lastOpenedTime = new Date(mobilePageOpenTime);
      let minuteDifference = Math.floor((nowTime.getTime() - lastOpenedTime.getTime()) / 1000 / 60);
      isSaveMobilePageOpenDetails = id === openedMobilePageId && minuteDifference >= 5;
    }

    //SAVE MOBILE PAGE OPEN DETAILS
    if (isSaveMobilePageOpenDetails) {
      //UPDATE MOBILE PAGE OPEN COUNTS
      MobilePageService.saveMobilePageOpenDetails(accountId, id, contact.id);
      localStorage.setItem('mobilePageOpenDate', `${new Date()}`);
      localStorage.setItem(mobilePageId, id);
    }
  }
  render() {
    const { mobilePageData, isActualRendering, isSnapshot } = this.props;
    const { metaData } = mobilePageData;
    return (
      <>
        <PageHeader metaData={metaData} />
        <ToastContainer />
        <MobilePageComponent
          isSnapshot={isSnapshot}
          isActualRendering={isActualRendering}
          pageData={this.props.mobilePageData}
        />
      </>
    );
  }
}
export default MobilePage;
