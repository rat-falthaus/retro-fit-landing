
// https://rat-falthaus.github.io/retro-fit-landing will be the current dev-path for the website later will be changed to real domain or other subdomain
export default defineConfig(({ mode }) => {
	// THIS WORKS PERFECT WHEN Vue Router is setup also correctly all other possible ways dont
	const prodBase = process.env.VITE_APP_BASE_PATH ?? '/'
	return {
		plugins: [
			vue(),
			tailwindcss(),
			Components({
				dts: true,
				deep: true,
				resolvers: [PrimeVueResolver()]
			})
		],
		resolve:{
			alias:{
				'@': '/src'
			}
		},
		worker: {
			format: 'es'
		},
		base: mode === 'production' ? prodBase : '/'
	}
})
