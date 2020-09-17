export class Regex {
    public static getCapitalLetterRegex = /[A-Z][a-z]+/g;
    public static validateName = /^(?=.*[a-zA-Z0-9 ])(([-'&])?[ a-zA-Z0-9])+$/;
    public static validate5DigitZip = /^[\d]{5,8}$/;
    public static validateZip = /^[\d]{5,5}-[\d]{4,4}$/;
    public static validateAddress = /^[a-zA-Z0-9\s,'-]*$/;
    public static validateEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    public static validateNumber = /^[+-]?([0-9]*[.])?[0-9]+$/;
    public static validateMobileNumberFormat = /^\(?\d{3}\)?[-\.\s]?\d{3}[-\.\s]?\d{4}$/i;
    public static validateWebsite = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
        'i'
    );
    public static httpProtocolRegex = /^https?:\/\//i;
    public static youtubeUrl = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    public static frameSourceValue = /(?:(?:<iframe.*?src=")|(?:\[embed\]))(.*?)(?:\"|(?=\[\/embed\]))/;
}