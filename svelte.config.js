import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from "svelte-preprocess";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [preprocess({ typescript: true, scss: true}), vitePreprocess()],

	kit: {
		adapter: adapter(),
		alias: {
			$lib: 'src/lib',
			$models: 'src/models',
		}
	}
};

export default config;
