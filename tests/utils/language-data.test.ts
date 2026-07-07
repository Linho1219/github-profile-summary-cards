import {groupOtherLanguages, OTHER_LANGUAGES_COLOR, OTHER_LANGUAGES_NAME} from '../../src/utils/language-data';

describe('Language data', () => {
    it('groups languages after the top five as others', () => {
        expect(
            groupOtherLanguages([
                {name: 'TypeScript', value: 10, color: '#3178c6'},
                {name: 'JavaScript', value: 9, color: '#f1e05a'},
                {name: 'Python', value: 8, color: '#3572a5'},
                {name: 'Rust', value: 7, color: '#dea584'},
                {name: 'Go', value: 6, color: '#00add8'},
                {name: 'Shell', value: 5, color: '#89e051'},
                {name: 'HTML', value: 4, color: '#e34c26'}
            ])
        ).toEqual([
            {name: 'TypeScript', value: 10, color: '#3178c6'},
            {name: 'JavaScript', value: 9, color: '#f1e05a'},
            {name: 'Python', value: 8, color: '#3572a5'},
            {name: 'Rust', value: 7, color: '#dea584'},
            {name: 'Go', value: 6, color: '#00add8'},
            {name: OTHER_LANGUAGES_NAME, value: 9, color: OTHER_LANGUAGES_COLOR}
        ]);
    });

    it('keeps data unchanged when there are five or fewer languages', () => {
        const languageData = [
            {name: 'TypeScript', value: 10, color: '#3178c6'},
            {name: 'JavaScript', value: 9, color: '#f1e05a'}
        ];

        expect(groupOtherLanguages(languageData)).toEqual(languageData);
    });
});
