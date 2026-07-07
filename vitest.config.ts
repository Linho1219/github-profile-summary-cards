import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        clearMocks: true,
        coverage: {
            enabled: true,
            exclude: ['dist/**', 'node_modules/**', 'scripts/**', '*.config.ts'],
            include: ['src/**/*.ts'],
            provider: 'v8',
            reporter: ['text', 'json', 'lcov', 'clover']
        },
        globals: true,
        include: ['tests/**/*.test.ts'],
        outputFile: {
            junit: './junit.xml'
        },
        reporters: ['default', 'junit']
    }
});
