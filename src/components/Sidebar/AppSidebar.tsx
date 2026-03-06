import { Link } from "@tanstack/react-router";
import { ChevronDown, NotepadText } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "../ui/sidebar";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { User } from "./User";

interface AppSidebarProps {
	defaultOpen?: boolean;
	onOpenSearch?: () => void;
}

export function AppSidebar({
	defaultOpen = true,
	onOpenSearch,
}: AppSidebarProps) {
	const items = Array(20)
		.fill(0)
		.map((_, index) => index);

	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarHeader>
				<Header />
			</SidebarHeader>
			<SidebarContent className="sidebar-scroll">
				<Menu onOpenSearch={() => onOpenSearch?.()} />
				<SidebarGroup>
					<Collapsible defaultOpen={defaultOpen} className="group/collapsible">
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger className="flex items-center gap-2 cursor-pointer">
								Ваши чаты
								<ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenuSub className="border-l-0 ml-0.5 pl-0">
									{items.map((item) => (
										<SidebarMenuSubItem key={item}>
											<SidebarMenuSubButton asChild>
												<Link
													to="/card/$id"
													params={{ id: item.toString() }}
													className="flex items-center gap-2"
												>
													<NotepadText />
													<span>Карточка №{item}</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</SidebarGroupContent>
						</CollapsibleContent>
					</Collapsible>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<User />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
