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
import { Spinner } from "../ui/spinner";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { User } from "./User";

interface AppSidebarProps {
	defaultOpen?: boolean;
	onOpenSearch?: () => void;
	items?: {
		id: string;
		title: string;
		created_at: string;
		content: {
			[x: string]: {
				[x: string]: string;
			};
		};
	}[];
	isLoading: boolean;
	user:
		| {
				email: string;
				full_name: string | null;
				role: string;
		  }
		| undefined;
}

export function AppSidebar({
	defaultOpen = true,
	onOpenSearch,
	items = [],
	isLoading,
	user,
}: AppSidebarProps) {
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
									{isLoading ? (
										<SidebarMenuItem>
											<div className="flex flex-col justify-center items-center p-10 gap-4">
												<Spinner className="size-10 text-muted-foreground" />
												<p className="text-sm">Загрузка...</p>
											</div>
										</SidebarMenuItem>
									) : (
										items.map((item) => (
											<SidebarMenuSubItem key={item.id}>
												<SidebarMenuSubButton asChild>
													<Link
														to="/card/$id"
														params={{ id: item.id.toString() }}
														className="flex items-center gap-2"
													>
														<NotepadText />
														<span className="text-sm font-normal">
															{item.title.length > 0 ? item.title : item.id}
														</span>
													</Link>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))
									)}
								</SidebarMenuSub>
							</SidebarGroupContent>
						</CollapsibleContent>
					</Collapsible>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<User fullName={user?.full_name} email={user?.email} />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
