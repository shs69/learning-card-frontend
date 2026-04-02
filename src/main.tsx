import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isLoggedIn } from "./hooks/useAuth";
import { routeTree } from "./routeTree.gen";
import { useEventSource } from "./shared/hooks";

const queryClient = new QueryClient();
const router = createRouter({
	routeTree,
	basepath: "/learning-card-frontend",
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root");
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider defaultTheme="light">
					<SSEProvider>
						<RouterProvider router={router} />
					</SSEProvider>
				</ThemeProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</StrictMode>,
	);
}

function SSEProvider({ children }: { children: React.ReactNode }) {
	const eventSource = useEventSource(
		"http://localhost:8000/api/v1/cards/sse",
		undefined,
		{
			onMessage: (data) => {
				queryClient.invalidateQueries({ queryKey: ["card", data.data] });
				queryClient.invalidateQueries({ queryKey: ["cards"] });
			},
		},
	);

	useEffect(() => {
		if (isLoggedIn()) {
			eventSource.open();
		}
	}, [isLoggedIn]);

	return <>{children}</>;
}
