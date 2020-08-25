import React from 'react'
import { BUILDERELEMENTS } from '@mindme/shared/dist/enums/index';
import { Title, Paragraph } from '@mindme/shared';

interface Props {
    builderElement?: any;
}

class BuilderElement extends React.Component<Props>{
    render() { 
        const { builderElement } = this.props;
        console.log(builderElement);
        switch (builderElement.builderElementType) {
            case BUILDERELEMENTS.TITLE:
                return <Title title={builderElement.title.text} />
            case BUILDERELEMENTS.PARAGRAPH:
                return <Paragraph description={'ssss'} />
        }
    }
}
export default BuilderElement;

