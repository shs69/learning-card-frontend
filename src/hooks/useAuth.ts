import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { client } from "@/client/client";

const isLoggedIn = () => {
	return localStorage.getItem("access_token") !== null;
};

const useAuth = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data: user } = useQuery({
		queryKey: ["currentUser"],
		queryFn: async () => {
			const { data, error } = await client.GET("/api/v1/auth/me", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			});
			if (error) throw error;
			return data;
		},
		enabled: isLoggedIn(),
	});

	const loginFn = async (body: { username: string; password: string }) => {
		const { data, error } = await client.POST("/api/v1/auth/login", {
			body: { ...body, scope: "", grant_type: "password" },
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		if (error) throw error;
		if (data) localStorage.setItem("access_token", data.access_token);
		return data;
	};

	const loginMutation = useMutation({
		mutationFn: loginFn,
		onError: (error) => console.error(error),
		onSuccess: () => {
			navigate({ to: "/" });
			queryClient.invalidateQueries({ queryKey: ["cards"] });
		},
	});

	const logoutFn = async () => {
		const { data, error } = await client.DELETE("/api/v1/auth/logout", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
		});
		if (error) throw error;
		return data;
	};

	const logoutMutation = useMutation({
		mutationFn: logoutFn,
		onError: (error) => console.error(error),
		onSuccess: () => {
			localStorage.removeItem("access_token");
			navigate({ to: "/login" });
		},
	});

	const signUpFn = async (body: {
		email: string;
		full_name: string;
		password: string;
	}) => {
		const { data, error } = await client.POST("/api/v1/auth/register", {
			body: { ...body },
		});
		if (error) throw error;
		return data;
	};

	const signUpMutation = useMutation({
		mutationFn: signUpFn,
		onError: (error) => console.log(error),
		onSuccess: () => navigate({ to: "/login" }),
	});

	return {
		user,
		loginMutation,
		logoutMutation,
		signUpMutation,
	};
};

export { isLoggedIn };
export default useAuth;
