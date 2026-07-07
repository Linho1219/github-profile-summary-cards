import {ThemeMap} from '../const/theme';
import {getRepoLanguages} from '../github-api/repos-per-language';
import {createDonutChartCard} from '../templates/donut-chart-card';
import {writeSVG} from '../utils/file-writer';
import {groupOtherLanguages, LanguageData} from '../utils/language-data';
import {getAllThemeNames} from '../utils/theme-selector';

export const createReposPerLanguageCard = async function (
    username: string,
    exclude: Array<string>,
    token: string,
    themes: string[] = getAllThemeNames()
) {
    const langData = await getRepoLanguageData(username, exclude, token);
    for (const themeName of themes) {
        const svgString = getReposPerLanguageSVG(langData, themeName);
        // output to folder, use 1- prefix for sort in preview
        writeSVG(themeName, '1-repos-per-language', svgString);
    }
};

export const getReposPerLanguageSVGWithThemeName = async function (
    username: string,
    themeName: string,
    exclude: Array<string>,
    token: string
) {
    if (!ThemeMap.has(themeName)) throw new Error('Theme does not exist');
    const langData = await getRepoLanguageData(username, exclude, token);
    return getReposPerLanguageSVG(langData, themeName);
};

const getReposPerLanguageSVG = function (langData: {name: string; value: number; color: string}[], themeName: string) {
    const svgString = createDonutChartCard('Top Languages by Repo', langData, ThemeMap.get(themeName)!);
    return svgString;
};

const getRepoLanguageData = async function (username: string, exclude: Array<string>, token: string) {
    const repoLanguages = await getRepoLanguages(username, exclude, token);
    const langData: LanguageData[] = [];

    // make a pie data
    for (const [key, value] of repoLanguages.getLanguageMap()) {
        langData.push({
            name: key,
            value: value.count,
            color: value.color
        });
    }
    langData.sort(function (a, b) {
        return b.value - a.value;
    });
    return groupOtherLanguages(langData);
};
