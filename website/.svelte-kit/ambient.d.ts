
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SSH_AUTH_SOCK: string;
	export const USER: string;
	export const TERMINFO_DIRS: string;
	export const TERM_FEATURES: string;
	export const TERM_SESSION_ID: string;
	export const CONDA_DEFAULT_ENV: string;
	export const COLORTERM: string;
	export const TMPDIR: string;
	export const XPC_FLAGS: string;
	export const __CFBundleIdentifier: string;
	export const XPC_SERVICE_NAME: string;
	export const ITERM_PROFILE: string;
	export const _CE_CONDA: string;
	export const PWD: string;
	export const CONDA_SHLVL: string;
	export const TMUX_PANE: string;
	export const MASON: string;
	export const TERM_PROGRAM: string;
	export const fish_user_paths: string;
	export const CONDA_PYTHON_EXE: string;
	export const LANG: string;
	export const CONDA_PREFIX: string;
	export const VIM: string;
	export const _CE_M: string;
	export const TMUX_PLUGIN_MANAGER_PATH: string;
	export const LOGNAME: string;
	export const GOPATH: string;
	export const TMUX: string;
	export const CONDA_PROMPT_MODIFIER: string;
	export const SHELL: string;
	export const MYVIMRC: string;
	export const TERM: string;
	export const NVIM_LOG_FILE: string;
	export const HOME: string;
	export const CONDA_EXE: string;
	export const VIMRUNTIME: string;
	export const LC_TERMINAL_VERSION: string;
	export const COMMAND_MODE: string;
	export const NVIM: string;
	export const COLORFGBG: string;
	export const SHLVL: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const PATH: string;
	export const ITERM_SESSION_ID: string;
	export const LC_TERMINAL: string;
	export const BUN_INSTALL: string;
	export const TERM_PROGRAM_VERSION: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SSH_AUTH_SOCK: string;
		USER: string;
		TERMINFO_DIRS: string;
		TERM_FEATURES: string;
		TERM_SESSION_ID: string;
		CONDA_DEFAULT_ENV: string;
		COLORTERM: string;
		TMPDIR: string;
		XPC_FLAGS: string;
		__CFBundleIdentifier: string;
		XPC_SERVICE_NAME: string;
		ITERM_PROFILE: string;
		_CE_CONDA: string;
		PWD: string;
		CONDA_SHLVL: string;
		TMUX_PANE: string;
		MASON: string;
		TERM_PROGRAM: string;
		fish_user_paths: string;
		CONDA_PYTHON_EXE: string;
		LANG: string;
		CONDA_PREFIX: string;
		VIM: string;
		_CE_M: string;
		TMUX_PLUGIN_MANAGER_PATH: string;
		LOGNAME: string;
		GOPATH: string;
		TMUX: string;
		CONDA_PROMPT_MODIFIER: string;
		SHELL: string;
		MYVIMRC: string;
		TERM: string;
		NVIM_LOG_FILE: string;
		HOME: string;
		CONDA_EXE: string;
		VIMRUNTIME: string;
		LC_TERMINAL_VERSION: string;
		COMMAND_MODE: string;
		NVIM: string;
		COLORFGBG: string;
		SHLVL: string;
		__CF_USER_TEXT_ENCODING: string;
		PATH: string;
		ITERM_SESSION_ID: string;
		LC_TERMINAL: string;
		BUN_INSTALL: string;
		TERM_PROGRAM_VERSION: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
