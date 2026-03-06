import { createFileRoute } from "@tanstack/react-router";
import { CardCarousel } from "@/components/Carousel/CardCarousel";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_layout/card/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	return (
		<div className="flex justify-center items-center w-full h-full">
			<Card className="mx-auto w-full max-w-lg">
				<CardHeader>
					<CardTitle>Набор карточек №{id}</CardTitle>
					<CardDescription>Описание набора карточек</CardDescription>
				</CardHeader>
				<CardContent className="p-6">
					<CardCarousel />
				</CardContent>
			</Card>
		</div>
	);
}
