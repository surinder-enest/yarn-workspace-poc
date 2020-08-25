import React from 'react'
import { Title, Paragraph, BUILDERELEMENTS } from '@mindme/shared';

interface Props {
    mobilePageData: any;
}

class MobilePage extends React.Component<Props>{

    builderElement(builderElement: any, idx: number) {
        if (!builderElement) {
            return <></>
        }
        switch (builderElement.builderElementType) {
            case BUILDERELEMENTS.TITLE:
                return <Title key={idx} title={builderElement.title.text} />
            case BUILDERELEMENTS.PARAGRAPH:
                return <Paragraph key={idx} description={builderElement.paragraph.leftParagraphTextEditorRawContent} />
            default:
                return <div>No results found</div>
        }
    }

    render() {
        const mobilePageBuilderComponents = this.props?.mobilePageData?.mobilePageBuilderComponents;
        return mobilePageBuilderComponents
            ? mobilePageBuilderComponents.map((detail: any, idx: number) => {
                return this.builderElement(detail, idx)
            })
            : <div>No results found</div>
    }
}

export default MobilePage;

