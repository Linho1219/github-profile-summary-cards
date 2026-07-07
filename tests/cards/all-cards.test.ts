import {Mock, vi, describe, expect, it, beforeEach} from 'vitest';
import {createProfileDetailsCard} from '../../src/cards/profile-details-card';
import {createReposPerLanguageCard} from '../../src/cards/repos-per-language-card';
import {createCommitsPerLanguageCard} from '../../src/cards/most-commit-language-card';
import {createProductiveTimeCard} from '../../src/cards/productive-time-card';
import {createStatsCard} from '../../src/cards/stats-card';
import {writeSVG} from '../../src/utils/file-writer';
import {getProfileDetails} from '../../src/github-api/profile-details';
import {getRepoLanguages} from '../../src/github-api/repos-per-language';
import {getCommitLanguage} from '../../src/github-api/commits-per-language';
import {getProductiveTime} from '../../src/github-api/productive-time';
import {getContributionByYear} from '../../src/github-api/contributions-by-year';

// Mock all dependencies
vi.mock('../../src/utils/file-writer');
vi.mock('../../src/github-api/profile-details');
vi.mock('../../src/github-api/repos-per-language');
vi.mock('../../src/github-api/commits-per-language');
vi.mock('../../src/github-api/productive-time');
vi.mock('../../src/github-api/contributions-by-year');

const mockWriteSVG = writeSVG as Mock;

describe('Cards Generation (Integration)', () => {
    const TOKEN = 'dummy_token';
    const USERNAME = 'testuser';

    beforeEach(() => {
        vi.resetAllMocks();

        // Setup default mock returns
        (getProfileDetails as Mock).mockResolvedValue({
            name: 'Test User',
            email: 'test@example.com',
            contributionYears: [2024],
            totalPublicRepos: 10,
            totalStars: 100,
            totalPullRequestContributions: 5,
            totalIssueContributions: 5,
            totalRepositoryContributions: 2,
            contributions: [{date: new Date(), contributionCount: 5}],
            createdAt: '2020-01-01T00:00:00Z'
        });
        (getContributionByYear as Mock).mockResolvedValue({
            totalContributions: 500,
            totalCommitContributions: 400
        });
        (getRepoLanguages as Mock).mockResolvedValue({
            getLanguageMap: () => new Map([['TypeScript', {count: 100, color: '#abcdef'}]])
        });
        (getCommitLanguage as Mock).mockResolvedValue({
            getLanguageMap: () => new Map([['TypeScript', {count: 500, color: '#abcdef'}]])
        });
        (getProductiveTime as Mock).mockResolvedValue({
            productiveDate: [new Date().toISOString()]
        });
    });

    it('createProfileDetailsCard should write SVG', async () => {
        await createProfileDetailsCard(USERNAME, TOKEN, ['default']);
        // Expect writeSVG to be called for each theme (we have ~30 themes)
        expect(mockWriteSVG).toHaveBeenCalledTimes(1);
        expect(mockWriteSVG).toHaveBeenCalledWith('default', '0-profile-details', expect.stringContaining('<svg'));
    });

    it('createReposPerLanguageCard should write SVG', async () => {
        await createReposPerLanguageCard(USERNAME, [], TOKEN, ['default']);
        expect(mockWriteSVG).toHaveBeenCalledTimes(1);
        expect(mockWriteSVG).toHaveBeenCalledWith('default', '1-repos-per-language', expect.stringContaining('<svg'));
    });

    it('createCommitsPerLanguageCard should write SVG', async () => {
        await createCommitsPerLanguageCard(USERNAME, [], TOKEN, ['default']);
        expect(mockWriteSVG).toHaveBeenCalledTimes(1);
        expect(mockWriteSVG).toHaveBeenCalledWith('default', '2-most-commit-language', expect.stringContaining('<svg'));
    });

    it('createStatsCard should write SVG', async () => {
        await createStatsCard(USERNAME, TOKEN, ['default']);
        expect(mockWriteSVG).toHaveBeenCalledTimes(1);
        expect(mockWriteSVG).toHaveBeenCalledWith('default', '3-stats', expect.stringContaining('<svg'));
    });

    it('createProductiveTimeCard should write SVG', async () => {
        await createProductiveTimeCard(USERNAME, 0, TOKEN, ['default']);
        expect(mockWriteSVG).toHaveBeenCalledTimes(1);
        expect(mockWriteSVG).toHaveBeenCalledWith('default', '4-productive-time', expect.stringContaining('<svg'));
    });
});
