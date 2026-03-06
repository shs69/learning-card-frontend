import { Link } from "@tanstack/react-router";
import { NotebookPen, Search } from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";

interface AppSidebarProps {
	onOpenSearch?: () => void;
}

export function Menu({ onOpenSearch }: AppSidebarProps) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Меню</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild tooltip="Создать новую карточку">
							<Link to="/card/new" className="flex items-center gap-2">
								<NotebookPen />
								<span>Новая карточка</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							tooltip="Поиск"
							onClick={() => onOpenSearch?.()}
						>
							<div className="flex items-center gap-2 cursor-pointer">
								<Search />
								<span>Поиск</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
