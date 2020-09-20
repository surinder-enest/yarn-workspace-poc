import React, { Component } from 'react';

interface Props {
    text: string;
    builderElementType?: string;
}

export default class PlaceHolder extends Component<Props> {
    render() {
        const { text } = this.props;
        return <div style={{
            paddingTop: '20px',
            paddingBottom: "20px",
            minHeight: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            WebkitBoxAlign: "center",
            WebkitBoxPack: "center"
        }}>
            <div style={{
                paddingTop: "20px",
                paddingBottom: "15px",
                textAlign: "center"
            }}>
                <i className="video-icon" />
                <div style={{
                    color: "#789bb6",
                    marginBottom: 0
                }}>{text}</div>
            </div>
        </div>;
    }
}