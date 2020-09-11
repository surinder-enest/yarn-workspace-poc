import React, { ReactNode } from 'react';
import { BuilderElementModel } from '../../models';
import { BUILDER_ELEMENTS } from '../../enums';
import { Title, Paragraph, Spacer } from '..';
import { Form } from '../form';


interface Props {
  builderElement: BuilderElementModel;
  moduleId?: string;
  contactId?: string;
  accountId?: string;
  className?: string;
  isActualRendering: boolean;
  responseCapturedFromModule?: string;
}

class MobilePage extends React.Component<Props> {
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
    } = this.props;
    switch (builderElement.builderElementType) {
      case BUILDER_ELEMENTS.TITLE:
        return (
          <Title key={builderElement.key} builderElement={builderElement} />
        );
      case BUILDER_ELEMENTS.PARAGRAPH:
        return (
          <Paragraph key={builderElement.key} builderElement={builderElement} />
        );
      case BUILDER_ELEMENTS.SPACER:
        return (
          <Spacer key={builderElement.key} builderElement={builderElement} />
        );
      case BUILDER_ELEMENTS.FORM:
        return (
          <Form
            key={builderElement.key}
            builderElement={builderElement}
            moduleId={moduleId || ''}
            contactId={contactId || ''}
            accountId={accountId || ''}
            responseCapturedFromModule={responseCapturedFromModule || ''}
            isActualRendering={isActualRendering}
          />
        );
      default:
        return <></>;
    }
  }

  private getBuilderSectionAction(
    builderElement: BuilderElementModel
  ): ReactNode {
    const elementKey = { 'data-key': builderElement.key };
    return (
      <div style={{ position: 'relative' }}>
        {builderElement.isElementActive && (
          <>
            <i
              id="deleteBuilderElement"
              className="fa fa-trash-o response-delete clickable"
              {...elementKey}
            />
            <i
              id="copyBuilderElement"
              {...elementKey}
              className="fa fa-clone folder-icon clickable"
            />
            <i className="fa fa-bars bar-icon" />
          </>
        )}
      </div>
    );
  }

  render() {
    const { builderElement, className } = this.props;
    return (
      <div className={className}>
        {this.getBuilderSectionAction(builderElement)}
        {this.getBuilderElement(builderElement)}
      </div>
    );
  }
}

export default MobilePage;
