import { TitleModel } from './Title.model';
import { ParagraphModel } from './Paragraph.model';
import { APIBuilderElement } from '../interfaces';
import { FormModel } from './Form.model';
import { SpacerModel } from './Spacer.model';

export class BuilderElementModel {
	id: string;
	key: string;
	elementLabel?: string;
	builderElementType: string;
	isElementActive?: boolean;
	isTextRoute?: boolean;
	title: TitleModel;
	paragraph: ParagraphModel;
	spacer: SpacerModel;
	form: FormModel;

	constructor(data?: BuilderElementModel) {
		this.id = data?.id || '';
		this.key = data?.key || '';
		this.elementLabel = data?.elementLabel || '';
		this.builderElementType = data?.builderElementType || '';
		this.isElementActive = data?.isElementActive || false;
		this.isTextRoute = data?.isTextRoute || false;
		this.title = data?.title || new TitleModel();
		this.paragraph = data?.paragraph || new ParagraphModel();
		this.spacer = data?.spacer || new SpacerModel();
		this.form = data?.form || new FormModel();
	}

	static deserialize(apiModel: APIBuilderElement): BuilderElementModel {
		const data: BuilderElementModel = {
			id: apiModel?.Id,
			key: apiModel?.Key,
			builderElementType: apiModel?.BuilderElementType,
			title: TitleModel.deserialize(apiModel?.Title),
			paragraph: ParagraphModel.deserialize(apiModel?.Paragraph),
			spacer: SpacerModel.deserialize(apiModel?.Spacer),
			form: FormModel.deserialize(apiModel?.Form),
		};
		return new BuilderElementModel(data);
	}

	static deserializeList(
		apiBuilderElementList: APIBuilderElement[]
	): BuilderElementModel[] {
		return apiBuilderElementList
			? apiBuilderElementList.map(
				(apiBuilderElement: APIBuilderElement) =>
					new BuilderElementModel(
						BuilderElementModel.deserialize(apiBuilderElement)
					)
			)
			: [];
	}
}
