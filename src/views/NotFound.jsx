import { Link, useRouteError } from "react-router-dom";
import Title from "../components/Title";

const NotFound = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold mb-4 text-red-700">404</h1>
            <p className="text-2xl font-medium mb-2 ">Page not found</p>
            <p className="text-gray-600">{error.statusText || error.message}</p>
            <div className="mt-10">
            <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-0 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to="/">Volver al Inicio</Link>
            </div>
        </div>
    );
};
export default NotFound;