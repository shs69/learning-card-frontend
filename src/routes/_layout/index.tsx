import { createFileRoute } from "@tanstack/react-router";
import HowItWorks from "@/components/how-it-works";
import TextLoop from "@/components/text-loop";

export const Route = createFileRoute("/_layout/")({
	component: Home,
});

function Home() {
	const features = [
		{
			title: "Создайте аккаунт",
			description:
				"Регистрация за 10 секунд. Мгновенный доступ ко всем функциям сервиса.",
			colors: {
				bg: "bg-lime-50 dark:bg-lime-500/20",
				text: "text-lime-500 dark:text-lime-400",
				border: "border-lime-400 dark:border-lime-500",
			},
		},
		{
			title: "Загрузите PDF",
			description:
				"Загрузите конспект - сервис проанализирует содержимое, выделит ключевые понятия и автоматически создаст карточки для обучения.",
			colors: {
				bg: "bg-chart-2/10 dark:bg-chart-2/20",
				text: "text-chart-2 dark:text-chart-2",
				border: "border-blue-400 dark:border-blue-500",
			},
		},
		{
			title: "Управляйте карточками",
			description:
				"Полный контроль над вашей коллекцией: распределяйте по темам, удаляйте ненужное. Мгновенный поиск по ключевым словам найдёт любую карточку за секунды.",
			colors: {
				bg: "bg-chart-3/10 dark:bg-chart-3/20",
				text: "text-chart-3 dark:text-chart-3",
				border: "border-purple-400 dark:border-purple-500",
			},
		},
		{
			title: "Учитесь эффективнее",
			description:
				"Интервальные повторения и умные алгоритмы для быстрого запоминания.",
			colors: {
				bg: "bg-amber-50 dark:bg-amber-500/20",
				text: "text-amber-600 dark:text-amber-500",
				border: "border-amber-400 dark:border-amber-500",
			},
		},
		{
			title: "Достигайте целей",
			description:
				"Отслеживайте прогресс и наблюдайте, как растёт ваш результат каждый день.",
			colors: {
				bg: "bg-emerald-50 dark:bg-emerald-500/20",
				text: "text-emerald-600 dark:text-emerald-400",
				border: "border-emerald-400 dark:border-emerald-500",
			},
		},
	];

	const stepPositions = [
		{ className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-3" },
		{
			className: "md:absolute md:top-[150px] md:right-[13%]",
			rotate: "-rotate-2",
		},
		{
			className: "md:absolute md:top-[350px] md:left-[17%]",
			rotate: "-rotate-2",
		},
		{
			className: "md:absolute md:top-[650px] md:right-[13%]",
			rotate: "rotate-6",
		},
		{
			className: "md:absolute md:top-[810px] md:left-[17%]",
			rotate: "-rotate-5",
		},
	];

	return (
		<div className="relative flex justify-center items-center">
			<div
				className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15]"
				style={{
					backgroundImage: "linear-gradient(#000 1px, transparent 1px)",
					backgroundSize: "100% 35px",
					marginTop: "4px",
				}}
			/>
			<div
				className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-[0.1]"
				style={{
					backgroundImage: "linear-gradient(#fff 1px, transparent 1px)",
					backgroundSize: "100% 35px",
					marginTop: "4px",
				}}
			/>
			<div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-linear-to-r"></div>
			<div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-linear-to-l"></div>
			<div className="relative z-10 w-full">
				<div className="flex items-center justify-center p-15 pb-0 h-full w-full  rounded-md">
					<TextLoop
						staticText="Учись"
						rotatingTexts={["быстрее", "легче", "эффективнее"]}
						className="bg-background p-4 rounded-4xl"
						interval={3500}
						rotatingTextClassName="bg-linear-to-r from-emerald-400 to-emerald-900 dark:bg-linear-to-r from-emerald-400 to-emerald-600 pr-1"
						backgroundClassName="bg-linear-to-r from-transparent via-emerald-200/30 to-emerald-200 dark:from-transparent dark:via-emerald-950/30 dark:to-emerald-950"
						cursorClassName="bg-emerald-500"
					/>
				</div>
				<HowItWorks features={features} stepPositions={stepPositions} />
			</div>
		</div>
	);
}
