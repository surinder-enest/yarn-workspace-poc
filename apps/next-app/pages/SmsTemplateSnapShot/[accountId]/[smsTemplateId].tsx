import { ErrorPage, SmsTemplateModel, TemplateService } from '@mindme/shared';
import React, { Component } from 'react';
import { PageHeader, SnapShotWrapper } from '../../../components';

interface Props {
  templateData: SmsTemplateModel;
  router: any;
}

export default class SmsTemplate extends Component<Props> {
  static async getInitialProps({ query: { accountId = '', smsTemplateId = '' } }) {
    if (!accountId && !smsTemplateId) return { elementList: {} };
    const apiResponse = await TemplateService.getSmsTemplateBuilderDetailForSnapShot(smsTemplateId, accountId);
    console.log(apiResponse);
    return { templateData: apiResponse };
  }

  private replaceMessageSpanLinkWithTinyUrl(messageHTML: string, tinyBaseURL: string) {
    let updatedMessageHTML = '';

    if (!messageHTML) return updatedMessageHTML;
    if (typeof document !== 'undefined') {
      let dummyDivElement = null;
      dummyDivElement = document.createElement('div');
      dummyDivElement.id = 'message_native_receiver1';
      dummyDivElement.style.display = 'none';
      dummyDivElement.innerHTML = messageHTML;
      document.getElementById('__next')?.appendChild(dummyDivElement);
      const smsSpanLinks = document.querySelectorAll('#message_native_receiver1 [data-target="sms-tiny-link"]');
      for (let j = 0; j < smsSpanLinks.length; j++) {
        smsSpanLinks[j].style = 'color:#3AA6DD;';
        smsSpanLinks[j].innerText = `${tinyBaseURL}#####`;
        smsSpanLinks[j].className = '';
        smsSpanLinks[j].removeAttribute('data-target');
        smsSpanLinks[j].removeAttribute('name');
      }
      updatedMessageHTML = dummyDivElement.innerHTML;
      dummyDivElement.remove();
    }
    return updatedMessageHTML;
  }

  render() {
    const { isNotFoundOrDeleted, isSubAccountDeleted, templateInitialSettings } = this.props.templateData;
    const { sourceNumber, templateMessage, tinyBaseURL } = templateInitialSettings;
    const { fromName, message } = templateMessage;
    return (
      <>
        <style type="text/css">{`
          .phoneWrapper{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            width: 320px;
            height: 510px;
            border-radius: 40px;
            border: 8px solid #789bb6;
            box-sizing: border-box;
            overflow: hidden;
            z-index: 1;
            margin: 20px auto;
          }
          .phoneWrapper  .heading-voice {
            border-bottom: none !important;
          }

          .phoneHeader{
            background-color: #fff;
            height: 50px;
            width: 100%;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .heading-voice{
            margin:0;
          }

          .phoneHeader .heading-voice {
            font-weight: 700;
            font-size: 16px;
          }
          .phoneHeaderText{
            display: inline-block;
            margin: 0;
            font-family: 'Open Sans', sans-serif;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
          }

          .phoneScreen{
            background-color: #eceeef;
            width: 100%;
            height: 410px;
            overflow-y: scroll;
            // display:flex;
            padding: 20px 12px;
            border-top: 1px solid #789bb6;
            border-bottom: 1px solid #789bb6;
          }

          .phoneScreen::-webkit-scrollbar {
            width: 2px;
          }
          .phoneScreen::-webkit-scrollbar-thumb {
             background-color: #152837;
          }
          .phoneFooter{
            box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
            height: 50px;
            width: 100%;
            z-index: 2;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
          }

          .builder-middle-container, .greeting-middle-header {
            width: 700px;
            margin: 0 auto !important;
          }

          .chatBubble{
            display: block;
            position: relative;
            height: -webkit-max-content;
            height: -moz-max-content;
            height: max-content;
            background-color: #fff;
            border-radius: 24px;
            box-shadow: 0px 2px 4px #cccccc;
            box-sizing: border-box;
            padding: 15px 10px;
            z-index: 2;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
          }
          .chatBubbleText{
            font-family: 'Open Sans', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            word-break: break-word;
            color: #555;
            margin-bottom: 1em;
          }
          .chatBubbleText .message_native_drag {
            font-size: 16px !important;
          }
          .messageBuilderBoxWrapper {
            pointer-events: none;
          }
          

        `}</style>
        <PageHeader />
        <SnapShotWrapper>
          {isNotFoundOrDeleted || isSubAccountDeleted ? (
            <ErrorPage isPageNotFound={isNotFoundOrDeleted} isAccountActive={!isSubAccountDeleted} />
          ) : (
            <div className="row no-margin builder-middle-container" style={{ background: '#ededed' }}>
              <div className="col-md-12 col-sm-12 col-xs-12 no-padding">
                <div className="phoneWrapper">
                  <div className="phoneHeader">
                    <p className="phoneHeaderText">
                      <p className="heading-voice">{sourceNumber}</p>
                    </p>
                  </div>
                  <div className="phoneScreen">
                    <div className="chatBubble">
                      <div className="chatBubbleText no-margin">
                        {fromName}
                        {fromName ? ':' : ''}
                      </div>
                      <div className="chatBubbleText text-message-box" id="textMessageBox">
                        <div
                          className="messageBuilderBoxWrapper"
                          contentEditable={true}
                          dangerouslySetInnerHTML={{
                            __html: this.replaceMessageSpanLinkWithTinyUrl(message, tinyBaseURL),
                          }}
                        />
                      </div>
                      <div className="chatBubbleText">Reply STOP to end</div>
                    </div>
                  </div>
                  <div className="phoneFooter" />
                </div>
              </div>
            </div>
          )}
        </SnapShotWrapper>
      </>
    );
  }
}
