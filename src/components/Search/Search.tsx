import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { NotepadText } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "@/client/client";
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
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedQuery(query), 500);
		return () => clearTimeout(timer);
	}, [query]);

	useEffect(() => {
		if (!searchOpen) {
			setQuery("");
			setDebouncedQuery("");
		}
	}, [searchOpen]);

	const {
		data: items,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["search", debouncedQuery],
		queryFn: async () => {
			if (!debouncedQuery) return;
			const { data, error } = await client.GET("/api/v1/cards/search", {
				params: {
					query: {
						q: debouncedQuery,
					},
				},
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			});
			if (error) throw error;
			return data;
		},
		enabled: debouncedQuery.length > 0,
		staleTime: 1000 * 60,
	});

	console.log(items);

	return (
		<div className="flex flex-col gap-4">
			<CommandDialog
				open={searchOpen}
				onOpenChange={onOpenSearch}
				showCloseButton={false}
			>
				<Command shouldFilter={false}>
					<CommandInput
						placeholder="Поиск по содержимому карточек"
						value={query}
						onValueChange={setQuery}
					/>
					<CommandList>
						<CommandEmpty>
							{debouncedQuery && !isLoading ? "Ничего не найдено." : ""}
						</CommandEmpty>
						{isLoading && (
							<CommandGroup>
								<CommandItem disabled>Поиск...</CommandItem>
							</CommandGroup>
						)}

						{error && (
							<CommandGroup>
								<CommandItem disabled className="text-red-500">
									Ошибка: {error.message}
								</CommandItem>
							</CommandGroup>
						)}

						{items && (
							<>
								{items.today?.length > 0 && (
									<CommandGroup heading="Сегодня">
										{items.today.map((item) => (
											<CommandItem key={item.id} asChild>
												<Link
													to="/card/$id"
													params={{ id: item.id.toString() }}
													onClick={() => onOpenSearch?.(false)}
													className="flex items-center gap-2"
												>
													<NotepadText />
													<span className="truncate">
														{item.title.length > 0 ? item.title : item.id}
													</span>
												</Link>
											</CommandItem>
										))}
									</CommandGroup>
								)}
								{items.yesterday?.length > 0 && (
									<CommandGroup heading="Вчера">
										{items.yesterday.map((item) => (
											<CommandItem key={item.id} asChild>
												<Link
													to="/card/$id"
													params={{ id: item.id.toString() }}
													onClick={() => onOpenSearch?.(false)}
													className="flex items-center gap-2"
												>
													<NotepadText />
													<span className="truncate">
														{item.title.length > 0 ? item.title : item.id}
													</span>
												</Link>
											</CommandItem>
										))}
									</CommandGroup>
								)}
								{items.last_week?.length > 0 && (
									<CommandGroup heading="За последние 7 дней">
										{items.last_week.map((item) => (
											<CommandItem key={item.id} asChild>
												<Link
													to="/card/$id"
													params={{ id: item.id.toString() }}
													onClick={() => onOpenSearch?.(false)}
													className="flex items-center gap-2"
												>
													<NotepadText />
													<span className="truncate">
														{item.title.length > 0 ? item.title : item.id}
													</span>
												</Link>
											</CommandItem>
										))}
									</CommandGroup>
								)}
								{items.last_month?.length > 0 && (
									<CommandGroup heading="За последние 30 дней">
										{items.last_month.map((item) => (
											<CommandItem key={item.id} asChild>
												<Link
													to="/card/$id"
													params={{ id: item.id.toString() }}
													onClick={() => onOpenSearch?.(false)}
													className="flex items-center gap-2"
												>
													<NotepadText />
													<span className="truncate">
														{item.title.length > 0 ? item.title : item.id}
													</span>
												</Link>
											</CommandItem>
										))}
									</CommandGroup>
								)}
							</>
						)}
					</CommandList>
				</Command>
			</CommandDialog>
		</div>
	);
}
