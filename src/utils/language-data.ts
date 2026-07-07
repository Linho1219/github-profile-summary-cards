export const OTHER_LANGUAGES_NAME = 'Others';
export const OTHER_LANGUAGES_COLOR = '#ededed';

export type LanguageData = {
    name: string;
    value: number;
    color: string;
};

export function groupOtherLanguages(languageData: LanguageData[], limit = 5): LanguageData[] {
    if (languageData.length <= limit) {
        return languageData;
    }

    const visibleLanguages = languageData.slice(0, limit);
    const otherLanguageValue = languageData.slice(limit).reduce((total, language) => total + language.value, 0);

    if (otherLanguageValue > 0) {
        visibleLanguages.push({
            name: OTHER_LANGUAGES_NAME,
            value: otherLanguageValue,
            color: OTHER_LANGUAGES_COLOR
        });
    }

    return visibleLanguages;
}
