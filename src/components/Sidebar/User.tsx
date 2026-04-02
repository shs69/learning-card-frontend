import { ChevronsUpDown, LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";

interface UserProps {
	fullName?: string | null;
	email?: string;
}

export function User({ fullName = "Фамилия Имя", email }: UserProps) {
	const { isMobile } = useSidebar();
	const { logoutMutation } = useAuth();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
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
						<span className="truncate font-medium">{fullName}</span>
						<span className="truncate text-xs">{email}</span>
					</div>
					<ChevronsUpDown className="ml-auto size-4" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				side={isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel className="p-0.5 font-normal">
						<div className="flex gap-3">
							<Avatar className="w-8 h-8 rounded-lg">
								<AvatarImage
									src="https://avatars.githubusercontent.com/u/64861490?v=4"
									alt="@shadcn"
									className="rounded-full"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{fullName}</span>
								<span className="truncate text-xs">{email}</span>
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="text-foreground cursor-pointer"
						onClick={() => logoutMutation.mutate()}
					>
						<LogOut />
						Выйти
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
