import {ThemeMap} from '../const/theme';

export function getAllThemeNames(): string[] {
    return Array.from(ThemeMap.keys());
}

export function parseThemeNames(input: string): string[] {
    const themeNames = input
        .split(',')
        .map(theme => theme.trim())
        .filter(Boolean);

    const selectedThemes = themeNames.length > 0 ? Array.from(new Set(themeNames)) : getAllThemeNames();
    const unknownThemes = selectedThemes.filter(theme => !ThemeMap.has(theme));

    if (unknownThemes.length > 0) {
        throw new Error(`Theme does not exist: ${unknownThemes.join(', ')}`);
    }

    return selectedThemes;
}
