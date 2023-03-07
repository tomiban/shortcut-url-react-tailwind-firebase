import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const LayoutRedirect = () => {

    const { nanoid } = useParams()
	console.log(nanoid);
	
	const { searchData } = useFirestore()
	
	useEffect(() => {
		searchData(nanoid)
			.then(docSnap => {
				if (docSnap.exists()) {
				window.location.href = docSnap.data().origin
			}
		})
	})
    
};
export default LayoutRedirect;
