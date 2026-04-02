import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useAuth, { isLoggedIn } from "@/hooks/useAuth";

const formSchema = z
	.object({
		email: z
			.email("Некорректный адрес электронной почты")
			.max(255, "Электронная почта не может быть длиннее 255 символов"),
		fullname: z
			.string()
			.min(1, "ФИО не может быть пустым")
			.max(255, "ФИО не может быть длиннее 255 символов"),
		password: z
			.string()
			.min(8, "Пароль не должен быть короче 8 символов")
			.max(40, "Пароль не может быть длиннее 40 символов"),
		repeatPassword: z
			.string()
			.min(8, "Пароль не должен быть короче 8 символов")
			.max(40, "Пароль не может быть длиннее 40 символов"),
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: "Пароли не совпадают",
		path: ["repeatPassword"],
	});

export const Route = createFileRoute("/signUp")({
	component: RouteComponent,
	beforeLoad: async () => {
		if (isLoggedIn()) {
			throw redirect({
				to: "/",
			});
		}
	},
});

function RouteComponent() {
	const { signUpMutation } = useAuth();
	const navigate = useNavigate();

	function onSubmit(data: z.infer<typeof formSchema>) {
		console.log("123");
		const { repeatPassword, fullname, ...withoutRepeat } = data;
		signUpMutation.mutate({ ...withoutRepeat, full_name: fullname });
	}

	const form = useForm({
		resolver: zodResolver(formSchema),
		mode: "onTouched",
		defaultValues: {
			email: "",
			password: "",
			repeatPassword: "",
			fullname: "",
		},
	});

	return (
		<div className="w-full min-h-screen flex flex-col justify-center items-center">
			<header className="absolute top-0 z-10 flex justify-end items-center gap-2 w-full p-4">
				<ModeToggle />
			</header>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Создайте новый аккаунт</CardTitle>
					<CardDescription>
						Введите свой адрес электронной почты ниже, чтобы создать новую
						учётную запись
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="form-register" onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Controller
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										className="grid gap-2"
										data-invalid={fieldState.invalid}
									>
										<FieldLabel htmlFor="form-register-username">
											Электронная почта
										</FieldLabel>
										<Input
											{...field}
											id="form-register-username"
											type="email"
											aria-invalid={fieldState.invalid}
											placeholder="email@example.com"
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								name="fullname"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										className="grid gap-2"
										data-invalid={fieldState.invalid}
									>
										<FieldLabel htmlFor="form-register-fullname">
											ФИО
										</FieldLabel>
										<Input
											{...field}
											id="form-register-fullname"
											type="text"
											aria-invalid={fieldState.invalid}
											placeholder="Иванов Иван Иванович"
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								name="password"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										className="grid gap-2"
										data-invalid={fieldState.invalid}
									>
										<FieldLabel htmlFor="form-register-password">
											Пароль
										</FieldLabel>
										<Input
											{...field}
											id="form-register-password"
											type="password"
											aria-invalid={fieldState.invalid}
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								name="repeatPassword"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										className="grid gap-2"
										data-invalid={fieldState.invalid}
									>
										<FieldLabel htmlFor="form-register-repeat-password">
											Подтверждение пароля
										</FieldLabel>
										<Input
											{...field}
											id="form-register-repeat-password"
											type="password"
											aria-invalid={fieldState.invalid}
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</FieldGroup>
					</form>
					{signUpMutation.error && (
						<div className="text-destructive text-sm pt-3">
							{signUpMutation.error.detail}
						</div>
					)}
				</CardContent>
				<CardFooter className="grid grid-cols-2 gap-2">
					<Button
						className="cursor-pointer"
						variant="outline"
						onClick={() => navigate({ to: "/login" })}
					>
						Авторизироваться
					</Button>
					<Button
						className="cursor-pointer"
						type="submit"
						disabled={signUpMutation.isPending}
						form="form-register"
					>
						Создать
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
