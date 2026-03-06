import { useUploadFiles } from "@better-upload/client";
import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { UploadDropzone } from "@/components/ui/upload-dropzone";

export const Route = createFileRoute("/_layout/card/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const { control } = useUploadFiles({
		route: "http://localhost:8000/api/v1/cards/create",
	});
	return (
		<div className="flex flex-col justify-center items-center h-full w-full">
			<Card className="mx-auto w-full max-w-md">
				<CardHeader>
					<CardTitle>Создание нового набора карточек</CardTitle>
					<CardDescription>Создайте новый набор карточек</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-center items-center">
					<UploadDropzone control={control} accept=".pdf, application/pdf" />
				</CardContent>
			</Card>
		</div>
	);
}
