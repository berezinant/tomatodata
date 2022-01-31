#!/usr/bin/env node

const cssModulesPlugin = require('esbuild-css-modules-plugin');

require('esbuild')
  .build({
    logLevel: 'info',
    entryPoints: ['src/index.jsx'],
    bundle: true,
    outfile: 'build/index.js',
    plugins: [cssModulesPlugin({
      inject: false,
    })],
  })
  .catch(() => process.exit(1));
