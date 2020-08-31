import { APIStyle } from './API-style.interface';

export interface APITitle {
    Text: string;
    Style: APIStyle
} 

export interface APIBuilderElement {
    Key: string;
    BuilderElementType: string;
    Title: APITitle
}