import { NotepadText } from "lucide-react";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command";

interface SearchProps {
	searchOpen?: boolean;
	onOpenSearch?: (open: boolean) => void;
}

export function SearchDialog({
	searchOpen = false,
	onOpenSearch,
}: SearchProps) {
	return (
		<div className="flex flex-col gap-4">
			<CommandDialog
				open={searchOpen}
				onOpenChange={onOpenSearch}
				showCloseButton={false}
			>
				<Command>
					<CommandInput placeholder="Поиск по содержимому карточек"></CommandInput>
					<CommandList>
						<CommandEmpty>Ничего не найдено.</CommandEmpty>
						<CommandGroup heading="Вчера" className="">
							<CommandItem>
								<NotepadText />
								Карточка №1
							</CommandItem>
							<CommandItem>
								<NotepadText />
								Карточка №2
							</CommandItem>
							<CommandItem>
								<NotepadText />
								Карточка №3
							</CommandItem>
						</CommandGroup>
						<CommandGroup heading="За последние 7 дней">
							<CommandItem>
								<NotepadText />
								Карточка №4
							</CommandItem>
							<CommandItem>
								<NotepadText />
								Карточка №5
							</CommandItem>
							<CommandItem>
								<NotepadText />
								Карточка №6
							</CommandItem>
						</CommandGroup>
						<CommandGroup heading="За последние 30 дней">
							<CommandItem>
								<NotepadText />
								Карточка №7
							</CommandItem>
							<CommandItem>
								<NotepadText />
								Карточка №8
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</CommandDialog>
		</div>
	);
}
