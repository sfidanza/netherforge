/* global process */

import chokidar from 'chokidar';
import * as esbuild from 'esbuild';

const LCINFO = '\x1b[34m%s\x1b[0m'; //blue
const LCWARN = '\x1b[33m%s\x1b[0m'; //yellow

let watchDir = './src';

export const worldWatcher = {
	setRealm: function (src) {
		watchDir = src;
	},
	oversee: async function (config) {
		const isWatching = process.argv.includes('--watch');

		try {
			await esbuild.build(config);
		} catch (err) {
			console.error(err);
			if (!isWatching) {
				process.exit(1);
			}
		}

		if (isWatching) {
			const ctx = await esbuild.context(config);
			// Replace esbuild's watch by chokidar's to trigger rebuild on html and images as well
			// await ctx.watch();

			console.log(LCINFO, '[watch] build finished, watching for changes...');
			chokidar.watch(watchDir, { backend: 'polling', ignoreInitial: true }).on('all', async (event, path) => {
				console.log(LCWARN, event, path);
				try {
					await ctx.rebuild();
				} catch (err) {
					console.error(err);
				}
				console.log(LCINFO, '[watch] build finished, watching for changes...');
			});
		}
	}
};