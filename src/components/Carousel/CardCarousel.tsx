import { useEffect, useState } from "react";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";

export function CardCarousel() {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	const array = new Array(10).fill(0).map((_, index) => index);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<div className="mx-auto max-w-40 sm:max-w-xs">
			<Carousel
				setApi={setApi}
				opts={{ loop: true }}
				className="w-full max-w-sm"
			>
				<CarouselContent>
					{array.map((_, index) => (
						<CarouselItem key={array[index]}>
							<Card className="m-px">
								<CardContent className="flex flex-col aspect-square items-center justify-center gap-10 p-6">
									<span className="text-4xl font-semibold">
										Вопрос №{index + 1}
									</span>
									<span className="text-3xl font-base">Ответ №{index + 1}</span>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="cursor-pointer" />
				<CarouselNext className="cursor-pointer" />
			</Carousel>
			<div className="py-2 text-center text-sm text-muted-foreground">
				Карточка {current} из {count}
			</div>
		</div>
	);
}
