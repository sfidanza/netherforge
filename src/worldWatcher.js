/* global process */

import chokidar from 'chokidar';

const LCINFO = '\x1b[34m%s\x1b[0m'; //blue
const LCWARN = '\x1b[33m%s\x1b[0m'; //yellow

export const worldWatcher = {
	oversee: async function (esbuild, config) {
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
			chokidar.watch('./src', { ignoreInitial: true, usePolling: true }).on('all', async (event, path) => {
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