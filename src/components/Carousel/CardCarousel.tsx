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

interface CardCarouselProps {
	items: {
		question: string;
		answer: string;
	}[];
	keys: string[];
}

export function CardCarousel({ items, keys }: CardCarouselProps) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (keys.length > 0) {
			setCount(keys.length);
			setCurrent(1);
		}
	}, [keys.length]);

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
					{items.map((item) => (
						<CarouselItem key={crypto.randomUUID()}>
							<Card className="m-px">
								<CardContent className="flex flex-col aspect-square items-center justify-center gap-4">
									<span className="text-lg font-semibold w-full text-center">
										{item.question}
									</span>
									<span className="text-base font-base w-full text-center">
										{item.answer}
									</span>
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
