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

const formSchema = z.object({
	username: z
		.email("Некорректный адрес электронной почты")
		.max(255, "Электронная почта не может быть длиннее 255 символов"),
	password: z
		.string()
		.min(8, "Пароль не должен быть короче 8 символов")
		.max(40, "Пароль не может быть длиннее 40 символов"),
});

export const Route = createFileRoute("/login")({
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
	const navigate = useNavigate();
	const { loginMutation } = useAuth();

	function onSubmit(data: z.infer<typeof formSchema>) {
		loginMutation.mutate(data);
	}

	const form = useForm({
		resolver: zodResolver(formSchema),
		mode: "onTouched",
		defaultValues: {
			username: "",
			password: "",
		},
	});

	return (
		<div className="w-full min-h-screen flex justify-center items-center">
			<header className="absolute top-0 z-10 flex justify-end items-center gap-2 w-full p-4">
				<ModeToggle />
			</header>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Войдите в свой аккаунт</CardTitle>
					<CardDescription>
						Введите свой адрес электронной почты ниже, чтобы войти в свою
						учетную запись
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Controller
								name="username"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										className="grid gap-2"
										data-invalid={fieldState.invalid}
									>
										<FieldLabel htmlFor="form-login-username">
											Электронная почта
										</FieldLabel>
										<Input
											{...field}
											id="form-login-username"
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
								name="password"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										className="grid gap-2"
										data-invalid={fieldState.invalid}
									>
										<FieldLabel htmlFor="form-login-password">
											Пароль
										</FieldLabel>
										<Input
											{...field}
											id="form-login-password"
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
					{loginMutation.error && (
						<div className="text-destructive text-sm pt-3">
							{loginMutation.error.detail}
						</div>
					)}
				</CardContent>
				<CardFooter>
					<Field orientation="horizontal" className="grid grid-cols-2">
						<Button
							variant="outline"
							className="cursor-pointer"
							type="button"
							onClick={() => navigate({ to: "/signUp" })}
						>
							Регистрация
						</Button>
						<Button className="cursor-pointer" type="submit" form="form-login">
							Войти
						</Button>
					</Field>
				</CardFooter>
			</Card>
		</div>
	);
}
