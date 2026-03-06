import { createFileRoute, Outlet } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { SearchDialog } from "@/components/Search/Search";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	const [searchOpen, setSearchOpen] = useState(false);

	const defaultOpen = Cookies.get("sidebar_state") === "true";
	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar onOpenSearch={() => setSearchOpen(true)} />
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
