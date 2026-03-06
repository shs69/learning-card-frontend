import { Link } from "@tanstack/react-router";
import { File } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export function Header() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton asChild size="lg">
					<Link to="/">
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
							<File className="stroke-1 size-5" />
						</div>
						<span className="truncate">Learning Cards from PDF</span>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
