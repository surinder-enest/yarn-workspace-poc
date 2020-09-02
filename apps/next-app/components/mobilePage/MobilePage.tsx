import React from 'react'
import { Title, BUILDER_ELEMENTS, MobilePageModel, BuilderElementModel, Form } from '@mindme/shared';

interface Props {
    pageData: MobilePageModel;
}

class MobilePage extends React.Component<Props>{

    builderElement(builderElement: BuilderElementModel, idx: number) {
        if (!builderElement) {
            return <></>
        }
        switch (builderElement.builderElementType) {
            case BUILDER_ELEMENTS.TITLE:
                return <Title key={idx} builderElement={builderElement} />
            case BUILDER_ELEMENTS.FORM:
                return <Form key={idx} builderElement={builderElement} />
            default:
                return <div>No results found</div>
        }
    }

    render() {
        const { pageStyles, builderElements } = this.props.pageData;
        const { borderStyle, borderWidth, borderColor, backgroundColor } = pageStyles;
        return <div style={{
            margin: "0px",
            height: "100%"
        }}>
            <div style={{
                backgroundColor,
                verticalAlign: "middle",
                height: "calc(100vh - 0px)",
                overflowY: "auto",
            }}>
                <div style={{
                    width: "100%",
                    padding: "0px"
                }}>
                    <div style={{
                        maxWidth: "600px",
                        margin: "15px auto",
                        backgroundColor: "rgb(255, 255, 255)",
                    }}>
                        <div style={{ margin: "0px" }}>
                            <div style={{
                                borderStyle,
                                borderWidth,
                                borderColor
                            }} >
                                {
                                    builderElements.map((detail: BuilderElementModel, idx: number) => this.builderElement(detail, idx))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default MobilePage;

