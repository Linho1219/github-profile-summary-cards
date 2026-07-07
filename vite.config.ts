import {defineConfig} from 'vite';
import {builtinModules} from 'node:module';

const nodeBuiltins = new Set([...builtinModules, ...builtinModules.map(moduleName => `node:${moduleName}`)]);

export default defineConfig({
    build: {
        emptyOutDir: false,
        lib: {
            entry: 'src/app.ts',
            formats: ['cjs'],
            fileName: () => 'index.js'
        },
        minify: true,
        outDir: 'dist',
        rollupOptions: {
            external: id => nodeBuiltins.has(id),
            output: {
                exports: 'auto'
            }
        },
        sourcemap: true,
        target: 'node24'
    }
});
