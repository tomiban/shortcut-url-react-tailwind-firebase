import { Link, NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../config/firebase";
import { useUserContext } from "../context/UserProvider";
import Button from "./Button";
const NavBar = () => {
	const { user, setUser } = useUserContext();

	const handleClickLogout = async () => {
		try {
			await logOut();
		} catch (error) {
			console.log(error.code);
			console.log(error.message);
		}
	};

	const classBtnBlue =
		"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-0 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
	


	return (
		<>
			<nav className='bg-white border-gray-200 sm:px-4 py-2.5 dark:bg-gray-800'>
				<div className='container flex flex-wrap items-center justify-between mx-auto'>
					<Link
						to='/'
						className='flex items-center'>
						<img
							src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/98/null/external-link-web-seo-prettycons-lineal-color-prettycons.png"
							className='h-6 mr-3 sm:h-9'
							alt='Flowbite Logo'
						/>
						<span className='self-center  font-semibold whitespace-nowrap dark:text-white text-purple-900 font-mono text-2xl'>
							Acortador URL
						</span>
					</Link>
					<div className='flex items-center  md:order-2'>
						{user ? (
							<>
								<NavLink
									to={"/"}
									className={
										classBtnBlue
									}>
									Inicio
								</NavLink>

								<Button
									text={`Logout`}
									color={'red'}
									handleFunction={handleClickLogout}></Button>
								
							</>
						) : (
							<>
								<NavLink
									to={"/login"}
									className={
										classBtnBlue
									}>
									Login
								</NavLink>
								<NavLink
									to={"/register"}
									className={
										classBtnBlue
									}>
									Registrarse
								</NavLink>
							</>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};
export default NavBar;
