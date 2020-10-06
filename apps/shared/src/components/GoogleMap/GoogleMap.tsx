import React, { Component } from 'react';
import {
  withGoogleMap as CustomWithGoogleMap,
  GoogleMap as CustomGoogleMap,
  Marker as CustomMarker,
  InfoWindow as CustomInfoWindow,
} from 'react-google-maps';

interface IProps {
  [otherProps: string]: any;
}

export class GoogleMap extends Component<IProps> {
  render() {
    return <CustomGoogleMap {...this.props} />;
  }
}

export class Marker extends Component<IProps> {
  render() {
    return <CustomMarker {...this.props} />;
  }
}

export class InfoWindow extends Component<IProps> {
  render() {
    return <CustomInfoWindow {...this.props} />;
  }
}

export const withGoogleMap = CustomWithGoogleMap;
