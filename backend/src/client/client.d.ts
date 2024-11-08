/// <reference types="svelte" />
/// <reference types="vite/client" />

type Writable<T> = import('svelte/store').Writable<T>;

type NicePrimitive = number | string | null | undefined | boolean | Date | NiceObject;
type NiceObject = { [k: string]: NicePrimitive | NicePrimitive[] };

interface BasePageProps<T extends NiceObject = any> {
	user?: User | null;
	__meta?: T;
}

type PageProps<T extends NiceObject = any, M extends NiceObject = any> = T & BasePageProps<M>;

declare module '*.svelte' {
	const component: ConstructorOfATypedSvelteComponent;
	export default component;
}

declare module '$meta' {
	export const route: Writable<string>;
	export const path: Writable<string>;
	export const params: Writable<Record<string, number>>;
	export const user: Writable<User>;
	export const extra: Writable<User>;
}

