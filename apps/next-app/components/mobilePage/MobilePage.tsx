import React from 'react'
import { Title, Paragraph, BUILDER_ELEMENTS, MobilePageModel } from '@mindme/shared';

interface Props {
    pageData: MobilePageModel;
}

class MobilePage extends React.Component<Props>{

    builderElement(builderElement: any, idx: number) {
        if (!builderElement) {
            return <></>
        }
        switch (builderElement.builderElementType) {
            case BUILDER_ELEMENTS.TITLE:
                return <Title key={idx} builderElement={builderElement} />
            case BUILDER_ELEMENTS.PARAGRAPH:
                return <Paragraph key={idx} description={builderElement?.paragraph} />
            default:
                return <div>No results found</div>
        }
    }

    render() {
        const { pageStyles } = this.props.pageData;
        return <div style={pageStyles} >
            SSR WOKRING !
        </div>
    }
}

export default MobilePage;

