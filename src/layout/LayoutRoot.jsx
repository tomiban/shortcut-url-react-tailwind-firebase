import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LayoutRoot = () => {
	const navigation = useNavigation();

	return (
		<>
			<NavBar />
			<main className='container mx-auto'>
				<ToastContainer
					position="top-right"
                    autoClose={"delay"}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="dark"
				/>
				<Outlet />
			</main>
			<footer className='container'>Footer</footer>
		</>
	);
};
export default LayoutRoot;
