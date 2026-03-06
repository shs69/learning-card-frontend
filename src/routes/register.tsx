import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	return (
		<div className="w-full min-h-screen flex flex-col justify-center items-center">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Создайте новый аккаунт</CardTitle>
					<CardDescription>
						Введите свой адрес электронной почты ниже, чтобы создать новую
						учётную запись
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Электронная почта</Label>
								<Input
									id="email"
									type="email"
									placeholder="email@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label>Пароль</Label>
								<Input
									id="password"
									type="password"
									placeholder="••••••••"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label>Подтверждение пароля</Label>
								<Input
									id="repeatPassword"
									type="password"
									placeholder="••••••••"
									required
								/>
							</div>
						</div>
					</form>
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
						onClick={() => navigate({ to: "/login" })}
					>
						Создать
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
