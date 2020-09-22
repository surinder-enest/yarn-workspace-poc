import { APIMap, APIMapAddress, APIMapLocation } from '../../interfaces';
import { StyleModel } from './Style.model';
export class MapModel {
  address: Array<AddressModel>;
  showMap: boolean;
  allowScrolling: boolean;
  showZoom: boolean;
  showStreetView: boolean;
  showButton: boolean;
  isDisplayAddresses: boolean;
  buttonText: string;
  style: StyleModel;
  elementStyle: StyleModel;

  constructor(data?: MapModel) {
    this.address = data?.address || [];
    this.showMap = data?.showMap || false;
    this.allowScrolling = data?.allowScrolling || false;
    this.showZoom = data?.showZoom || false;
    this.showStreetView = data?.showStreetView || false;
    this.showButton = data?.showButton || false;
    this.isDisplayAddresses = data?.isDisplayAddresses || false;
    this.buttonText = data?.buttonText || '';
    this.style = data?.style || new StyleModel();
    this.elementStyle = data?.elementStyle || new StyleModel();
  }

  static deserialize(apiModel: APIMap): MapModel {
    const data: MapModel = {
      address: AddressModel.deserializeList(apiModel?.Address),
      showMap: apiModel?.ShowMap,
      allowScrolling: apiModel?.AllowScrolling,
      showZoom: apiModel?.ShowZoom,
      showStreetView: apiModel?.ShowStreetView,
      showButton: apiModel?.ShowButton,
      isDisplayAddresses: apiModel?.IsDisplayAddresses,
      buttonText: apiModel?.ButtonText,
      elementStyle: new StyleModel({
        ...StyleModel.deserialize(apiModel?.Style),
        textAlign: 'center',
        paddingTop: '20px',
        paddingBottom: '20px',
      }),
      style: StyleModel.deserializeButtonStyles(apiModel?.Style.Button),
    };
    return new MapModel(data);
  }
}

export class AddressModel {
  placeId: string;
  location: LocationModel;
  formattedAddress: string;
  isInfoWindowOpen: boolean;
  constructor(data?: AddressModel) {
    this.placeId = data?.placeId || '';
    this.location = data?.location || new LocationModel();
    this.formattedAddress = data?.formattedAddress || '';
    this.isInfoWindowOpen = data?.isInfoWindowOpen || false;
  }

  static deserialize(apiModel: APIMapAddress): AddressModel {
    const data: AddressModel = {
      placeId: apiModel?.PlaceId,
      location: LocationModel.deserialize(apiModel?.Location),
      formattedAddress: apiModel?.FormattedAddress,
      isInfoWindowOpen: apiModel?.IsInfoWindowOpen,
    };
    return new AddressModel(data);
  }
  static deserializeList(apiList: APIMapAddress[]): AddressModel[] {
    return apiList
      ? apiList.map((apiAddress: APIMapAddress) => {
          return AddressModel.deserialize(apiAddress);
        })
      : [];
  }
}

export class LocationModel {
  latitude: string;
  longitute: string;

  constructor(data?: LocationModel) {
    this.latitude = data?.latitude || '';
    this.longitute = data?.longitute || '';
  }

  static deserialize(apiModel: APIMapLocation): LocationModel {
    const data: LocationModel = {
      latitude: apiModel?.Latitude,
      longitute: apiModel?.Longitutd,
    };
    return new LocationModel(data);
  }
}
