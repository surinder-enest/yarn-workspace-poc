import { ToastContainer, WebForm, WebFormModel, WebFormService } from '@mindme/shared';
import React from 'react';
import { PageHeader } from '../../../components';

interface Props {
  formData: WebFormModel;
}

class WebFormRender extends React.Component<Props> {
  static async getInitialProps({ query: { accountId = '', webFormId = '' } }) {
    const apiResponse = await WebFormService.getWebFormDetailById(accountId, webFormId);
    return { formData: apiResponse };
  }
  render() {
    return (
      <>
        <PageHeader />
        <ToastContainer />
        <WebForm formData={this.props.formData} isActualRendering={true} />
      </>
    );
  }
}
export default WebFormRender;
