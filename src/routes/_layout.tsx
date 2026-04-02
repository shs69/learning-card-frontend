import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { useState } from "react";
import { client } from "@/client/client";
import { ModeToggle } from "@/components/mode-toggle";
import { SearchDialog } from "@/components/Search/Search";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useAuth, { isLoggedIn } from "@/hooks/useAuth";

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
	beforeLoad: async () => {
		if (!isLoggedIn()) {
			throw redirect({
				to: "/login",
			});
		}
	},
});

function RouteComponent() {
	const [searchOpen, setSearchOpen] = useState(false);
	const { user } = useAuth();
	const { data: items, isPending } = useQuery({
		queryKey: ["cards"],
		queryFn: async () => {
			const { data, error } = await client.GET("/api/v1/cards/all", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			});
			if (error) throw error;
			return data;
		},
	});
	const defaultOpen = Cookies.get("sidebar_state") === "true";

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar
				onOpenSearch={() => setSearchOpen(true)}
				items={items?.cards}
				isLoading={isPending}
				user={user}
			/>
			<div className="flex-1 flex flex-col p-4 w-full h-screen overflow-hidden sidebar-scroll bg-background">
				<header className="sticky top-0 z-10 flex justify-between items-center gap-2 w-full mb-2">
					<SidebarTrigger className="ml-1 text-muted-foreground cursor-pointer" />
					<ModeToggle />
				</header>
				<main className="flex-1 overflow-y-auto p-6 md:p-4">
					<div className="mx-auto max-w-7xl relative h-full">
						<Outlet />
					</div>
				</main>
			</div>
			<SearchDialog searchOpen={searchOpen} onOpenSearch={setSearchOpen} />
		</SidebarProvider>
	);
}
