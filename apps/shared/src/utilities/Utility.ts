import { Regex } from './Regex';


export class Utility {
    public static WhiteColorCode = "#ffffff";
    public static BlackColorCode = "#000000"; 

    public static replace(str: string, replaceChar: string, replaceWith: string): string {
        return str.replace(new RegExp(replaceChar, 'g'), replaceWith);
    }

    public static addStringBeforeCapitalLetter(str: string, join: string): string {
        const array = str.match(Regex.getCapitalLetterRegex);
        return array ? array.join(join) : "";
    }
}