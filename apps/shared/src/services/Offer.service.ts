import { HttpClient } from './http-client';
import { apiUrl } from './api-urls';
import { OfferModel } from '../models';
import { APIOffer } from '../interfaces';

class OfferService {
  private httpClient = new HttpClient({});

  async getOfferDetailsForSnapShot(accountId: string, offerId: string) {
    try {
      let param = new URLSearchParams();
      param.append('accountId', accountId);
      param.append('offerId', offerId);
      const response = await this.httpClient.get(
        apiUrl.getOfferDetailsForSnapShot,
        param
      );
      if (response.data.Success) {
        const apiOffer: APIOffer = {
          OfferExpirationActionType: '',
          OfferExpirationMessage: '',
          OfferRedemptionActionType: '',
          OfferRedemptionMessage: '',
          Style: response.data.Data?.OfferStyle,
          OfferData: response.data.Data
        }
        return OfferModel.deserialize(apiOffer);
      }
      return OfferModel;
    } catch (error) {
      console.log('error', error);
      return OfferModel;
    }
  }
}

export default new OfferService();
