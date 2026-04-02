import { Link } from "@tanstack/react-router";
import favicon from "@/assets/favicon.png";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export function Header() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton asChild size="lg">
					<Link to="/">
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
							<img src={favicon} alt="Logo" className="size-8" />
						</div>
						<span className="truncate">Learning Cards from PDF</span>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
