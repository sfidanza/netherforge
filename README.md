# Netherforge

Collection of esbuild plugins to power great apps.

## How to use it?

- clean: empties the target folder
- hash: when hash of entryPoints are added to their filenames, `hash` will update the filenames references inside the referenced file (index.html typically)
- eslint: esbuild wrapper for eslint
- stylelint: esbuild wrapper for stylelint
- tpl: package list of files in one json structure
- worldWatcher: `chokidar`-based watcher for esbuild

Here is a sample `esbuild.config.js` to illustrate all the tools:

```js
import * as esbuild from 'esbuild';
import { clean, hash, eslint, stylelint, tpl, worldWatcher } from '@sfidanza/netherforge';

const config = {
    entryPoints: [ 'src/app.js', 'src/app.css' ],
    entryNames: '[name]-[hash]',
    bundle: true,
    sourcemap: true,
    metafile: true,
    outdir: 'target/static/',
    plugins: [
        eslint(), // it will read its config from usual eslint config
        stylelint(), // it will read its config from usual stylelint config
        clean({
            onStartPatterns: [ 'target/*' ] // typically clean target before a new full build
        }),
        hash({
            srcdir: 'src/',
            index: [ 'index.html' ] // will replace references to app.js and app.css by their hashed versions
        }),
        tpl({
            files: [ 'src/templates/**/*.html' ], // all these files will be packaged into app.json
            dest: 'app.json'
        })
        // typically you would copy static assets as well with esbuild-plugin-copy
    ]
};

worldWatcher.oversee(esbuild, config); // builds, plus watches if --watch is passed as command argument
```

Trigger build/watch mode through:

```js
    "build": "node esbuild.config.js",
    "debug": "node esbuild.config.js --watch",
```
