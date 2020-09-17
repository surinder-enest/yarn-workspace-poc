import React, { Component } from 'react';
import ReactPlayer from 'react-player'; 

interface Props {
    [otherProps: string]: any;
}

export default class CustomPlayer extends Component<Props> {
    render() { 
        return <ReactPlayer
            {...this.props}
        />
    }
}
