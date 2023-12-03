import type { z } from 'zod';
import type { Route, RouteMethod, Params } from './types.js';
import type { RequestEvent } from '@sveltejs/kit';
type Options = {
	contentType: string;
	headers: {
		client: Record<string, string>;
		server: Record<string, string>;
	};
};
type TContext<T> = T extends undefined ? RequestEvent : T;
class SvelteKitREST<Ttop = undefined> {
	public get;
	public post;
	public put;
	public delete;
	constructor() {
		const router = this.getRouter<undefined>();
		this.get = router.get;
		this.post = router.post;
		this.put = router.put;
		this.delete = router.delete;
	}

	input<U>(inp: z.ZodSchema<U>) {
		return this.getRouter<U>(inp);
	}
	private getRouter<T>(schema?: z.ZodSchema<T> | undefined) {
		return {
			get: <U>(
				cb: (
					inp: Params<T, Ttop>
				) => U
			): Route<T, U, Ttop> => {
				return {
					method: 'GET',
					cb,
					schema: schema
				};
			},

			post: <U>(
				cb: (inp: Params<T, Ttop>) => U
			): Route<T, U, Ttop> => {
				return {
					method: 'POST',
					cb,
					schema: schema
				};
			},
			put: <U>(
				cb: (inp: Params<T, Ttop>) => U
			): Route<T, U, Ttop> => {
				return {
					method: 'PUT',
					cb,
					schema: schema
				};
			},
			patch: <U>(
				cb: (inp: Params<T, Ttop>) => U
			): Route<T, U, Ttop> => {
				return {
					method: 'PATCH',
					cb,
					schema: schema
				};
			},
			delete: <U>(
				cb: (inp: Params<T, Ttop>) => U
			): Route<T, U, Ttop> => {
				return {
					method: 'DELETE',
					cb,
					schema: schema
				};
			}
		};
	}
}

export const initSveltekitRest = {
	withContext: <T>(): { create: () => SvelteKitREST<T> } => ({
		create: () => new SvelteKitREST<T>()
	}),
	create: (): SvelteKitREST<undefined> => {
		return new SvelteKitREST<undefined>();
	}
};
