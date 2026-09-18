# Netherforge

Collection of esbuild plugins to power great apps.

## How to use it?

- clean: empties the target folder
- hash: when hash of entryPoints are added to their filenames, `hash` will update the filenames references inside the referenced file (index.html typically)
- eslint: esbuild wrapper for eslint
- stylelint: esbuild wrapper for stylelint
- tpl: package list of files in one json structure
- worldWatcher: `chokidar`-based watcher for esbuild
