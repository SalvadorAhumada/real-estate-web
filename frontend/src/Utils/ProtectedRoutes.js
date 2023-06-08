import { Outlet, Navigate } from 'react-router-dom';
import Loading from "../components/Shared/Loading";
import { useContext } from "react";
import { UserContext } from '../Context/UserContext';

function PrivateRoutes() {

    const {
        TOKEN
    } = useContext(UserContext);

    const RenderPrivateComponents = () => {
        switch(TOKEN) {
            case null:
                return <Loading />;
            case false:
                return <Navigate to='/login' />;
            default: 
                return <Outlet />;
        }
    }

    return (
        RenderPrivateComponents()
    )
}

export default PrivateRoutes;