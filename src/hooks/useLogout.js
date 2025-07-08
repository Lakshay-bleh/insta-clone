import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom"; // <-- import navigation hook

const useLogout = () => {
	const [signOut, isLoggingOut, error] = useSignOut(auth);
	const showToast = useShowToast();
	const logoutUser = useAuthStore((state) => state.logout);
	const navigate = useNavigate(); // <-- initialize navigation

	const handleLogout = async () => {
		try {
			await signOut();
			localStorage.removeItem("user-info");
			logoutUser();

			// Redirect to /auth after logout
			navigate("/auth");
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { handleLogout, isLoggingOut, error };
};

export default useLogout;
