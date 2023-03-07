import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useUserContext } from "../context/UserProvider";

const LayoutPrivate = () => {

    const {user} = useUserContext()
    const navigate = useNavigate()
    

    useEffect(() => {
        if (!user) {
           navigate("/login");
        }
       })
        
    return (
        <>
        <Outlet></Outlet>
        </>
  );
};
export default LayoutPrivate;
