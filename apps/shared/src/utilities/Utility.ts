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

    public static formatPhoneNumber(phoneNumberString: string): string {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = match[1] ? '+1 ' : '';
            return [intlCode, match[2], '-', match[3], '-', match[4]].join('');
        }
        return "";
    }

    public static isLeapYear(year: number) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
}