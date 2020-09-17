import React, { ReactNode } from 'react';
import { BuilderElementModel, CountryModel } from '../../models';
import { BUILDER_ELEMENTS } from '../../enums';
import { Title, Paragraph, Spacer, Embed, Divider, Phone } from '..';
import { Form } from './Form';

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
}

class BuilderElement extends React.Component<Props> {
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
        return <Phone phone={builderElement.phone} />;
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
