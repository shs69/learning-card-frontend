import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
	<>
		<HeadContent />
		<Outlet />
	</>
);

export const Route = createRootRoute({ component: RootLayout });
