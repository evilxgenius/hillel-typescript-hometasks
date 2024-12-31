type Translations = {
    [languageKey: string]: string | undefined;
};
type OptionalTranslations = Translations & {
    default?: string;
};

const appTranslations: Translations = {
    en: "Hello",
    ua: "Привіт",
};
const optionalTranslations: OptionalTranslations = {
    es: "Hola",
    fr: undefined,
    default: "Fallback translation",
};
const anotherTranslations: Translations = optionalTranslations;

const uaKey: string = "ua";

console.log(appTranslations[uaKey]); // Привіт
console.log(appTranslations["de"]); // undefined
console.log(optionalTranslations.default); // "Fallback translation"
