import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { auth } from "../config/firebase";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(false);
	
	console.log(user);
	
	useEffect(() => {
		const unsuscribe = onAuthStateChanged(auth, (user) => {
			//recibe un callback que trae el usuario de la api
			setUser(user);
		});


		return unsuscribe;
	}, []);

	if (user === false) {
        return ;
    }

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{" "}
			{/* //llamamos al context creado con el metodo provider */}
			{children}
		</UserContext.Provider>
	);
};
export default UserProvider;

export const useUserContext = () => useContext(UserContext);

export const useRedirectUser = (user, url) => {
	const navigate = useNavigate(url);
	
	useEffect(() => {
		if (user) {
			navigate(url);
		}
	}, [user]);
};
