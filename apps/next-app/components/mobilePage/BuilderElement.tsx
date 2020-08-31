import React from 'react'
import { Title, Paragraph, BUILDER_ELEMENTS } from '@mindme/shared';

interface Props {
    builderElement: any;
}

class BuilderElement extends React.Component<Props>{
    render() {
        const { builderElement } = this.props; 
        switch (builderElement.builderElementType) {
            case BUILDER_ELEMENTS.TITLE:
                return <Title builderElement={builderElement} />
            case BUILDER_ELEMENTS.PARAGRAPH:
                return <Paragraph description={'ssss'} />
        }
    }
}
export default BuilderElement;

