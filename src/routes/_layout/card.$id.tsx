import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { client } from "@/client/client";
import { CardCarousel } from "@/components/Carousel/CardCarousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/_layout/card/$id")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Карточка",
			},
		],
	}),
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data: card } = useQuery({
		queryKey: ["card", id],
		queryFn: async () => {
			const { data, error } = await client.GET("/api/v1/cards/{card_id}", {
				params: {
					path: {
						card_id: id.toString(),
					},
				},
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			});
			if (error) throw error;
			return data;
		},
	});
	const content = card?.content;
	const keys = content ? Object.keys(content) : [];
	const items = content ? Object.keys(content).map((key) => content[key]) : [];

	return (
		<div className="flex justify-center items-center w-full h-full">
			<Card className="mx-auto w-full max-w-lg px-3 py-8">
				<CardHeader>
					<CardTitle>{card?.title || `Набор карточек №${card?.id}`}</CardTitle>
				</CardHeader>
				<CardContent className="">
					{keys.length > 0 ? (
						<CardCarousel items={items} keys={keys} />
					) : (
						<div className="flex flex-col justify-center items-center p-10 gap-4">
							<Spinner className="size-10 text-muted-foreground" />
							<p className="text-sm"> Создание учебных карточек... </p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
