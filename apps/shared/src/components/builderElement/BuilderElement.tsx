import React, { ReactNode } from 'react';
import { BuilderElementModel, ContactModel, CountryModel } from '../../models';
import { BUILDER_ELEMENTS } from '../../enums';
import { Form } from './Form';
import { BuilderElementService } from '../../services';
import Title from './Title/Title';
import Paragraph from './Paragraph/Paragraph';
import Spacer from './Spacer/Spacer';
import Embed from './Embed/Embed';
import Divider from './Divider/Divider';
import Video from './Video/Video';
import Image from './Image/Image';
import Audio from './Audio/Audio';
import Button from './Button/Button';
import Offer from './Offer/Offer';
import Map from './Map/Map';
import CountDown from './CountDown/CountDown';
import Download from './Download/Download';
import { ResponseElement } from './ResponseElement';

interface Props {
  builderElement: BuilderElementModel;
  moduleId?: string;
  accountId?: string;
  className?: string;
  isActualRendering: boolean;
  responseCapturedFromModule?: string;
  countriesAndStates?: Array<CountryModel>;
  accountCountryId?: string;
  contact?: ContactModel;
  setContactDetail?: Function;
}

class BuilderElement extends React.Component<Props> {
  private async saveResponse(contactId: string, selectedOption: string) {
    const {
      moduleId,
      accountId,
      responseCapturedFromModule,
      builderElement,
    } = this.props;

    return await BuilderElementService.saveBuilderElementResponse(
      builderElement,
      moduleId || '',
      contactId,
      accountId || '',
      responseCapturedFromModule || '',
      selectedOption || ''
    );
  }

  private async responseCapture(
    email?: string,
    mobileNumber?: string,
    selectedOption?: string
  ) {
    const {
      moduleId,
      contact,
      accountId,
      responseCapturedFromModule,
      builderElement,
      isActualRendering,
      setContactDetail,
    } = this.props;

    if (!isActualRendering) return;

    switch (builderElement.builderElementType) {
      case BUILDER_ELEMENTS.QUESTION:
      case BUILDER_ELEMENTS.POLL:
      case BUILDER_ELEMENTS.FEEDBACK:
      case BUILDER_ELEMENTS.DOWNLOAD:
        const { builderElementType, id } = builderElement;
        const newCreatedContactId = await BuilderElementService.saveContactCapture(
          builderElementType,
          accountId || '',
          id,
          moduleId || '',
          responseCapturedFromModule || '',
          email || '',
          mobileNumber || ''
        );
        if (typeof setContactDetail === 'function') {
          const isNotYouAllowed =
            (contact?.isNotYouAllowed &&
              newCreatedContactId === contact?.id) === true;
          const updatedContact: ContactModel = {
            id: newCreatedContactId,
            email: email || '',
            mobileNumber: mobileNumber || '',
            name: contact?.name || '',
            isNotYouAllowed: isNotYouAllowed,
          };
          setContactDetail(updatedContact);
        }
        return await this.saveResponse(
          newCreatedContactId,
          selectedOption || ''
        );
      default:
        return await this.saveResponse(contact?.id || '', selectedOption || '');
    }
  }

  private getBuilderElement(builderElement: BuilderElementModel): ReactNode {
    if (!builderElement) {
      return <></>;
    }
    const {
      moduleId,
      contact,
      accountId,
      responseCapturedFromModule,
      isActualRendering,
      countriesAndStates,
      accountCountryId,
    } = this.props;
    switch (builderElement.builderElementType) {
      case BUILDER_ELEMENTS.TITLE:
        return <Title title={builderElement.title} />;
      case BUILDER_ELEMENTS.PARAGRAPH:
        return <Paragraph paragraph={builderElement.paragraph} />;
      case BUILDER_ELEMENTS.SPACER:
        return <Spacer spacer={builderElement.spacer} />;
      case BUILDER_ELEMENTS.EMBED:
        return <Embed embed={builderElement.embed} />;
      case BUILDER_ELEMENTS.DIVIDER:
        return <Divider divider={builderElement.divider} />;
      case BUILDER_ELEMENTS.PHONE:
        return (
          <Button
            button={builderElement.phone}
            responseCapture={() => this.responseCapture()}
          />
        );
      case BUILDER_ELEMENTS.VIDEO:
        return (
          <Video
            elementId={builderElement.id}
            video={builderElement.video}
            isActualRendering={isActualRendering}
            responseCapture={() => this.responseCapture()}
          />
        );
      case BUILDER_ELEMENTS.LINK:
        return (
          <Button
            button={builderElement.link}
            responseCapture={() => this.responseCapture()}
          />
        );
      case BUILDER_ELEMENTS.MOBILE_PAGE:
        return (
          <Button
            button={builderElement.mobilePageElement}
            responseCapture={() => this.responseCapture()}
          />
        );
      case BUILDER_ELEMENTS.BUTTON:
        return (
          <Button
            button={builderElement.button}
            responseCapture={() => this.responseCapture()}
          />
        );
      case BUILDER_ELEMENTS.FORM:
        return (
          <Form
            builderElement={builderElement}
            moduleId={moduleId || ''}
            contactId={contact?.id || ''}
            accountId={accountId || ''}
            responseCapturedFromModule={responseCapturedFromModule || ''}
            isActualRendering={isActualRendering}
            countriesAndStates={countriesAndStates || []}
            accountCountryId={accountCountryId || ''}
          />
        );
      case BUILDER_ELEMENTS.IMAGE:
        return (
          <Image
            image={builderElement.image}
            isActualRendering={isActualRendering}
            responseCapture={() => this.responseCapture()}
          />
        );
      case BUILDER_ELEMENTS.AUDIO:
        return (
          <Audio
            elementId={builderElement.id}
            audio={builderElement.audio}
            isActualRendering={isActualRendering}
            responseCapture={() => this.responseCapture()}
          />
        );
      case BUILDER_ELEMENTS.OFFER:
        return (
          <Offer
            offer={builderElement.offer}
            isActualRendering={isActualRendering}
            elementId={builderElement.id}
            moduleId={moduleId || ''}
            contact={contact || new ContactModel()}
            accountId={accountId || ''}
            responseCapturedFromModule={responseCapturedFromModule || ''}
          />
        );
      case BUILDER_ELEMENTS.MAP:
        return <Map map={builderElement.map} />;
      case BUILDER_ELEMENTS.QUESTION:
        return (
          <ResponseElement
            elementDetail={builderElement.question}
            elementType={builderElement.builderElementType}
            isActualRendering={isActualRendering}
            responseCapture={(
              email?: string,
              mobileNumber?: string,
              selectedOption?: string
            ) => this.responseCapture(email, mobileNumber, selectedOption)}
            contact={contact || new ContactModel()}
          />
        );
      case BUILDER_ELEMENTS.POLL:
        return (
          <ResponseElement
            elementDetail={builderElement.poll}
            elementType={builderElement.builderElementType}
            isActualRendering={isActualRendering}
            responseCapture={(
              email?: string,
              mobileNumber?: string,
              selectedOption?: string
            ) => this.responseCapture(email, mobileNumber, selectedOption)}
            contact={contact || new ContactModel()}
          />
        );
      case BUILDER_ELEMENTS.FEEDBACK:
        return (
          <ResponseElement
            elementDetail={builderElement.feedback}
            elementType={builderElement.builderElementType}
            isActualRendering={isActualRendering}
            responseCapture={(
              email?: string,
              mobileNumber?: string,
              selectedOption?: string
            ) => this.responseCapture(email, mobileNumber, selectedOption)}
            contact={contact || new ContactModel()}
          />
        );
      case BUILDER_ELEMENTS.COUNT_DOWN:
        return (
          <CountDown
            elementId={builderElement.id}
            countDown={builderElement.countDown}
            responseCapture={() => this.responseCapture()}
            isActualRendering={isActualRendering}
          />
        );
      case BUILDER_ELEMENTS.DOWNLOAD:
        return (
          <Download
            download={builderElement.download}
            isActualRendering={isActualRendering}
            responseCapture={(
              email?: string,
              mobileNumber?: string,
              selectedOption?: string
            ) => this.responseCapture(email, mobileNumber, selectedOption)}
            contact={contact || new ContactModel()}
          />
        );
      default:
        return <></>;
    }
  }

  private getBuilderSectionStyles(builderElement: BuilderElementModel): any {
    let styles: any = {};
    styles.position = 'relative';
    if (builderElement.isTextRoute) {
      styles.background = '#FFFFFF';
      styles.padding = '4px 10px';
      styles.borderRadius = '2px 2px 0px 0px';
      styles.borderBottom = '1px solid #DDDDDD';
    }
    return styles;
  }

  private getBuilderSectionAction(
    builderElement: BuilderElementModel
  ): ReactNode {
    const elementKey = { 'data-key': builderElement.key };
    return (
      <div style={this.getBuilderSectionStyles(builderElement)}>
        {(builderElement.isElementActive || builderElement.isTextRoute) && (
          <>
            {builderElement.isElementActive && (
              <i
                id="deleteBuilderElement"
                className="fa fa-trash-o response-delete clickable"
                {...elementKey}
              />
            )}
            {builderElement.isTextRoute ? (
              <span>{builderElement.elementLabel}</span>
            ) : (
              <>
                <i
                  id="copyBuilderElement"
                  {...elementKey}
                  className="fa fa-clone folder-icon clickable"
                />
                <i className="fa fa-bars bar-icon" />
              </>
            )}
          </>
        )}
      </div>
    );
  }

  render() {
    const { builderElement, className } = this.props;
    const pointerEvents = !this.props.isActualRendering ? 'none' : 'inherit';
    return (
      <div className={className}>
        {this.getBuilderSectionAction(builderElement)}
        <div style={{ pointerEvents }}>
          {this.getBuilderElement(builderElement)}
        </div>
      </div>
    );
  }
}

export default BuilderElement;
