import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Title from "../components/Title";
import { useFirestore } from "../hooks/useFirestore";


const LayoutRedirect = () => {
	const [error, setError] = useState(null);
    const { nanoid } = useParams()
	const [loading, setLoading] = useState(true);
	
	const { searchData } = useFirestore()
	
	useEffect(() => {
		searchData(nanoid)
			.then(docSnap => {
				if (docSnap.exists()) {
				window.location.href = docSnap.data().origin
				} else {
					setLoading(false)
					setError(new Error("El enlace no existe"));
				}
		})
	}, [])
    
	if (loading) return <><Title text="Redireccionando..." /> <Loading /></>
	
	if (error) throw error;
};
export default LayoutRedirect;
