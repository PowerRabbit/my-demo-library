
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { litScss } from 'rollup-plugin-scss-lit';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        typescript(),
        litScss({
            minify: true,
            options: { loadPaths: ['node_modules'] }
        }),
        resolve(),
    ],

    preserveEntrySignatures: 'strict',

};