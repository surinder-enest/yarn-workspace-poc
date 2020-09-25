import React, { Component } from 'react';
import { GoogleMapApiUrl } from '../../../enums';
import { AddressModel, MapModel } from '../../../models';
import { GoogleMapComponent } from './GoogleMapComponent';

interface Props {
  map: MapModel;
}

interface State {
  refresh: boolean;
  isMapVisible: boolean;
}

export default class GoogleMap extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      refresh: false,
      isMapVisible: false,
    };
  }

  private onToggleHandler = (
    currentLocation: AddressModel,
    toggleValue: boolean
  ) => {
    const { address } = this.props.map;
    address.map((location: any) => {
      if (currentLocation.placeId === location.placeId) {
        location.isInfoWindowOpen = toggleValue;
      } else {
        location.isInfoWindowOpen = false;
      }
    });
    this.setState({ refresh: !this.state.refresh });
  };

  private handleClick = () => {
    this.setState({ isMapVisible: !this.state.isMapVisible });
  };

  render() {
    const { style, elementStyle, buttonText, showMap } = this.props.map;
    const { isMapVisible } = this.state;
    return (
      <div>
        {showMap || isMapVisible ? (
          <GoogleMapComponent
            googleMapURL={GoogleMapApiUrl.Url}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `250px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            mapState={this.props.map}
            onToggle={this.onToggleHandler}
          />
        ) : (
          <div style={elementStyle} onClick={() => this.handleClick()}>
            <div
              className="btn-builder"
              style={style}
              dangerouslySetInnerHTML={{
                __html: buttonText,
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
