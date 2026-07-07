import {getAllThemeNames, parseThemeNames} from '../../src/utils/theme-selector';

describe('Theme selector', () => {
    it('returns all themes when input is empty', () => {
        expect(parseThemeNames('')).toEqual(getAllThemeNames());
    });

    it('parses comma separated theme names', () => {
        expect(parseThemeNames('default, github_dark,default')).toEqual(['default', 'github_dark']);
    });

    it('throws when a theme does not exist', () => {
        expect(() => parseThemeNames('default,missing_theme')).toThrow('Theme does not exist: missing_theme');
    });
});
