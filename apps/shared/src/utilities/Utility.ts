import { BUTTON_LINK_TYPE } from '../enums';
import { Regex } from './Regex';

export class Utility {
    public static WhiteColorCode = "#ffffff";
    public static BlackColorCode = "#000000";
    public static recaptchSitekey = '6Le_C0YUAAAAAHQPLFx0qZ89ZFPRATD5Ym7rmqBg';

    public static replace(str: string, replaceChar: string, replaceWith: string): string {
        return str.replace(new RegExp(replaceChar, 'g'), replaceWith);
    }

    public static addStringBeforeCapitalLetter(str: string, join: string): string {
        const array = str?.match(Regex.getCapitalLetterRegex);
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

    public static isLeapYear(year: number): boolean {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    public static redirectToOtherPage = (redirectUrl: string, isOpenInNewTab?: boolean) => {
        if (redirectUrl) {
            if (!Regex.httpProtocolRegex.test(redirectUrl)) {
                redirectUrl = 'http://' + redirectUrl;
            }
            const redirectLink = document.createElement('a');
            redirectLink.href = redirectUrl;
            if (isOpenInNewTab) {
                redirectLink.target = '_blank';
            }
            document.body.appendChild(redirectLink);
            redirectLink.click();
        }
    };

    public static getYoutubeEmbedUrl(url: string): string {
        const youtubeId = url?.match(Regex.youtubeUrl) ? RegExp.$1 : '';
        if (youtubeId) return `https://www.youtube.com/embed/${youtubeId}`;
        return '';
    }

    public static getVimeoUrl(url: string): string {
        const parsed = url?.match(Regex.vimeoUrl);
        if (parsed) return `//player.vimeo.com/video/${parsed[5]}`;
        return '';
    }

    public static getWistiaUrl(url: string): string {
        const parsed = url.match(Regex.wistiaUrl);
        if (parsed) return '//fast.wistia.net/embed/iframe/' + parsed[0].split('/')[2];
        return '';
    }

    public static getEmbedWistiaUrl(url: string): string {
        const parsed = url.match(Regex.wistiaUrl);
        if (parsed) {
            const embededCode = parsed[0].split('.jsonp');
            return '//fast.wistia.net/embed/iframe/' + embededCode[0].split('/medias/')[1];
        }
        return '';
    }

    public static getFrameSourceValue(value: string): string {
        return value?.trim()?.match(Regex.frameSourceValue) ? RegExp.$1 : ''
    }

    public static getValueWithClickType(type: string, value: string, redirectUrl: string, contactId: string): string {
        switch (type) {
            case BUTTON_LINK_TYPE.CLICK_TO_CALL:
                return `tel:${value}`;
            case BUTTON_LINK_TYPE.EMAIL:
                return `mailto:${value}`;
            case BUTTON_LINK_TYPE.LINK:
                if (!Regex.httpProtocolRegex.test(value)) {
                    return `http://${value}`;
                }
                break;
            case BUTTON_LINK_TYPE.MOBILE_PAGE:
                return `${redirectUrl}${contactId ? `?contId=${contactId}` : ''}`;
        }
        return value;
    }
}