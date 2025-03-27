import React from "react";
import api from "./Api";

function Logout(){

    async function LogoutBtn(){
        await api.post("http://localhost:3000/logout")
    }

    return(
        <button onClick={LogoutBtn}>Logout</button>
    )
}

export default Logout;