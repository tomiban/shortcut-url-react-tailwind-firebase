import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import "flowbite"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
	<UserProvider>
		<RouterProvider router={router} />
	</UserProvider>
);

