import { Outlet } from 'react-router-dom';
import { useContext } from "react";
import { OtherContext } from "../Context/OtherContext";
import Loading from "../Components/Shared/Loading";

function PrivateRoutes() {

    const {
        IS_LOGGED,
        IS_AUTH,
        SET_TOKEN
    } = useContext(OtherContext);

    IS_AUTH().then(({jwt}) => {
        SET_TOKEN(jwt)
    }).catch(err => {
        /* MUST <Navigate to="/login" /> */
        console.log(err)
    })

    return (
        IS_LOGGED ? <Outlet /> : <Loading />

    )
}

export default PrivateRoutes;