import { APIDownload } from '../../interfaces';
import { ResponseElementModel } from './ResponseElement.model';
import { StyleModel } from './Style.model';

export class DownloadModel {
  layout: string;
  elementDetail: ResponseElementModel;
  imageUrl: string;
  imageSize: string;
  fileUrl: string;
  fileName: string;
  elementStyle: StyleModel;

  constructor(data?: DownloadModel) {
    this.layout = data?.layout || '';
    this.elementDetail = data?.elementDetail || new ResponseElementModel();
    this.imageUrl = data?.imageUrl || '';
    this.imageSize = data?.imageSize || '';
    this.fileUrl = data?.fileUrl || '';
    this.fileName = data?.fileName || '';
    this.elementStyle = data?.elementStyle || new StyleModel();
  }

  static deserialize(apiModel: APIDownload): DownloadModel {
    const { background, borderWidth, borderColor, borderStyle,
      marginTop, marginBottom, paddingTop, paddingBottom, paddingRight, paddingLeft } = StyleModel.deserialize(apiModel?.Style);
    const buttonStyle = StyleModel.deserializeButtonStyles(apiModel?.Style.Button);
    const data: DownloadModel = {
      layout: apiModel?.Layout,
      elementDetail: new ResponseElementModel({
        ...ResponseElementModel.deserialize(apiModel),
        buttonStyle
      }),
      imageUrl: apiModel?.Style?.Media?.Url,
      imageSize: apiModel?.Style?.Media?.Size === "100%" ? 'cover' : apiModel?.Style?.Media?.Size,
      fileUrl: apiModel?.FileUrl,
      fileName: apiModel?.FileName,
      elementStyle: new StyleModel({
        background, borderWidth, borderColor,
        borderStyle, marginTop, marginBottom, paddingTop, paddingBottom, paddingRight, paddingLeft
      }),
    };
    return new DownloadModel(data);
  }

}
