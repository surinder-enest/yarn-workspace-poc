import React, { ReactNode } from 'react';
import { BuilderElementModel, CountryModel } from '../../models';
import { BUILDER_ELEMENTS } from '../../enums';
import { Form } from './Form';
import { BuilderElementService } from '../../services';
import Title from './Title/Title';
import Paragraph from './Paragraph/Paragraph';
import Spacer from './Spacer/Spacer';
import Embed from './Embed/Embed';
import Divider from './Divider/Divider';
import Phone from './Phone/Phone';
import Video from './Video/Video';
import Link from './Link/Link';
import MobilePageElement from './MobilePageElement/MobilePageElement';
import Image from './Image/Image';
import Audio from './Audio/Audio';
import Button from './Button/Button';
import Offer from './Offer/Offer';
import Map from './Map/Map';
import Question from './Question/Question';

interface Props {
  builderElement: BuilderElementModel;
  moduleId?: string;
  contactId?: string;
  accountId?: string;
  className?: string;
  isActualRendering: boolean;
  responseCapturedFromModule?: string;
  countriesAndStates?: Array<CountryModel>;
  accountCountryId?: string;
  setContactId?: Function;
}

class BuilderElement extends React.Component<Props> {
  private async responseCapture(
    email?: string,
    mobileNumber?: string,
    selectedOption?: string
  ) {
    const {
      moduleId,
      contactId,
      accountId,
      responseCapturedFromModule,
      builderElement,
      isActualRendering,
      setContactId,
    } = this.props;

    if (!isActualRendering) return;

    let newCreatedContactId = contactId || '';

    switch (builderElement.builderElementType) {
      case BUILDER_ELEMENTS.QUESTION:
        const { builderElementType, id } = builderElement;
        newCreatedContactId = await BuilderElementService.saveContactCapture(
          builderElementType,
          accountId || '',
          id,
          moduleId || '',
          responseCapturedFromModule || '',
          email || '',
          mobileNumber || ''
        );

        if (typeof setContactId === 'function')
          setContactId(newCreatedContactId);
        break;
    }

    return await BuilderElementService.saveBuilderElementResponse(
      builderElement,
      moduleId || '',
      newCreatedContactId,
      accountId || '',
      responseCapturedFromModule || '',
      selectedOption || ''
    );
  }

  private getBuilderElement(builderElement: BuilderElementModel): ReactNode {
    if (!builderElement) {
      return <></>;
    }
    const {
      moduleId,
      contactId,
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
          <Phone
            phone={builderElement.phone}
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
          <Link
            link={builderElement.link}
            responseCapture={() => this.responseCapture()}
          />
        );
      case BUILDER_ELEMENTS.MOBILE_PAGE:
        return (
          <MobilePageElement
            mobilePageElement={builderElement.mobilePageElement}
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
            contactId={contactId || ''}
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
            responseCapture={() => this.responseCapture()}
          />
        );
      case BUILDER_ELEMENTS.MAP:
        return <Map map={builderElement.map} />;
      case BUILDER_ELEMENTS.QUESTION:
        return (
          <Question
            question={builderElement.question}
            isActualRendering={isActualRendering}
            responseCapture={(
              email?: string,
              mobileNumber?: string,
              selectedOption?: string
            ) => this.responseCapture(email, mobileNumber, selectedOption)}
            contactId={contactId || ''}
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
