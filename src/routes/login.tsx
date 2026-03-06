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

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	return (
		<div className="w-full min-h-screen flex flex-col justify-center items-center">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Войдите в свой аккаунт</CardTitle>
					<CardDescription>
						Введите свой адрес электронной почты ниже, чтобы войти в свою
						учетную запись
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
						</div>
					</form>
				</CardContent>
				<CardFooter className="grid grid-cols-2 gap-2">
					<Button
						variant="outline"
						className="cursor-pointer"
						onClick={() => navigate({ to: "/register" })}
					>
						Регистрация
					</Button>
					<Button
						className="cursor-pointer"
						type="submit"
						onClick={() => navigate({ to: "/" })}
					>
						Войти
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
