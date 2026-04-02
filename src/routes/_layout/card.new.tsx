import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { client } from "@/client/client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_layout/card/new")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Создать карточку",
			},
		],
	}),
});

function RouteComponent() {
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState<File>();

	const mutationCreateCard = useMutation({
		mutationFn: async (formData: FormData) => {
			const { data, error } = await client.POST("/api/v1/cards/create", {
				body: formData as unknown as { file: string },
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			});
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			navigate({ to: `/card/${data.id}` });
		},
	});

	const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			const file = e.target.files[0];
			setSelectedFile(file);
		}
	};

	const handleUpload = async () => {
		if (!selectedFile) return;
		const formData = new FormData();
		formData.append("file", selectedFile);
		await mutationCreateCard.mutate(formData);
	};

	return (
		<div className="flex flex-col justify-center items-center h-full w-full overflow-hidden">
			<Card className="mx-auto w-full max-w-sm shrink-0 flex">
				<CardHeader>
					<CardTitle>Создание нового набора карточек</CardTitle>
					<CardDescription>Создайте новый набор карточек</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col justify-center items-center gap-4 py-2 px-10">
					<Input
						type="file"
						accept=".pdf"
						className="cursor-pointer"
						onChange={handleFilesSelected}
					/>
					<Button onClick={handleUpload} className="w-full cursor-pointer">
						<UploadIcon className="mr-2 size-4" />
						Загрузить на сервер
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
