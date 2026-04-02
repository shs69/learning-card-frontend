import createClient from "openapi-fetch";
import type { paths } from "@/client/schema";

let refreshPromise: Promise<string | null> | null = null;

export const client = createClient<paths>({
	baseUrl: "http://localhost:8000",
	fetch: (request: Request) =>
		fetch(request, {
			credentials: "include",
		}),
});

async function refreshAccessToken(): Promise<string | null> {
	if (!refreshPromise) {
		refreshPromise = client
			.POST("/api/v1/auth/refresh", {})
			.then(({ data, error }) => {
				if (error || !data?.access_token) {
					localStorage.removeItem("access_token");
					return null;
				}
				localStorage.setItem("access_token", data.access_token);
				return data.access_token;
			})
			.finally(() => {
				refreshPromise = null;
			});
	}
	return refreshPromise;
}

client.use({
	async onResponse({ request, response }) {
		if (response.status !== 403) {
			return response;
		}
		const body = await response.json().catch(() => null);
		if (body?.detail !== "Could not validate credentials") {
			return response;
		}
		const newToken = await refreshAccessToken();
		if (!newToken) {
			return response;
		}
		const newRequest = new Request(request, {
			headers: new Headers(request.headers),
		});
		newRequest.headers.set("Authorization", `Bearer ${newToken}`);
		return fetch(newRequest);
	},
});
