import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";

export function User() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Avatar className="w-8 h-8 rounded-lg">
						<AvatarImage
							src="https://avatars.githubusercontent.com/u/64861490?v=4"
							alt="@shadcn"
							className="rounded-full"
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">Фамилия Имя</span>
						<span className="truncate text-xs">Электронная почта</span>
					</div>
					<ChevronsUpDown className="ml-auto size-4" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
}
