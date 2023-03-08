import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/Loading";
import LayoutForm from "../layout/LayoutForm";
import LayoutPrivate from "../layout/LayoutPrivate";
import LayoutRedirect from "../layout/LayoutRedirect";
import LayoutRoot from "../layout/LayoutRoot";
import Home from "../views/Home";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
import Perfil from "../views/Perfil";
import Posts from "../views/Posts";
import Register from "../views/Register";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutRoot />,
		errorElement: <NotFound />,
		children: [
			{
				element: <LayoutForm />, 
				children: [
					{
						path: "login",
						element: <Login />,
					},
					{
						path: "register",
						element: <Register/>,
					},
				]
			},
			{
				element: <LayoutPrivate />,
				path: "/",
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: "perfil",
						element: <Perfil />,
					},
					{
						path: "/:nanoid",
						element: <LayoutRedirect />,
					}
				]
			}
			
		],
	},
]);
