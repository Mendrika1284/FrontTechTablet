import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar";

const Client = () => {
    return ( 
        <div>
            <Topbar/>
            <Outlet/>
        </div>
     );
}
 
export default Client;