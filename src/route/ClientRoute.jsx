import { Route, Routes } from "react-router-dom";
import Client from "../client/Client";
import Dashboard from "../client/Dashboard";
import Panier from "../client/Panier";
const ClientRoute = () => {
    return ( 
        <Routes>
            <Route element={< Client/>}>
            <Route index element={< Dashboard/>} />
            <Route path="dashboard" element={< Dashboard/>} />
            <Route path="panier" element={< Panier/>} />
            </Route>
        </Routes>
     );
}
 
export default ClientRoute;