import React from 'react';
import { AddressModel, MapModel } from '../../../models';
import { defaultMapPosition } from '../../../enums/builderElement/Map.enum';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

interface Props {
  [otherProps: string]: any;
  mapState: MapModel;
  onToggle: Function;
}

export const GoogleMapComponent = withScriptjs(
  withGoogleMap((Props: Props) => {
    const {
      address,
      isDisplayAddresses,
      showStreetView,
      showZoom,
      allowScrolling,
    } = Props.mapState;

    const centerLocationInfo = address && address[address.length - 1];
    const centerLat =
      centerLocationInfo?.location?.latitude || defaultMapPosition.Lat;
    const centerLng =
      centerLocationInfo?.location?.longitute || defaultMapPosition.Lng;

    const mapOptions = {
      mapTypeControl: false,
      navigationControl: false,
      scaleControl: false,
      streetViewControl: showStreetView,
      zoomControl: showZoom,
      scrollwheel: allowScrolling,
    };

    const mapRef = React.createRef();

    return (
      <GoogleMap
        defaultZoom={8}
        center={{ lat: parseFloat(centerLat), lng: parseFloat(centerLng) }}
        defaultCenter={{
          lat: defaultMapPosition.Lat,
          lng: defaultMapPosition.Lng,
        }}
        options={mapOptions}
        ref={mapRef}
      >
        {address?.map((locationInfo: AddressModel, idx: number) => {
          return (
            <div key={idx}>
              <Marker
                onClick={() => Props.onToggle(locationInfo, true)}
                key={locationInfo.placeId}
                position={{
                  lat: parseFloat(locationInfo.location.latitude),
                  lng: parseFloat(locationInfo.location.longitute),
                }}
              >
                {locationInfo.isInfoWindowOpen && isDisplayAddresses && (
                  <InfoWindow
                    onCloseClick={() => Props.onToggle(locationInfo, false)}
                  >
                    <div key={idx}>{locationInfo.formattedAddress}</div>
                  </InfoWindow>
                )}
              </Marker>
            </div>
          );
        })}
      </GoogleMap>
    );
  })
);