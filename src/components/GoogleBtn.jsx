import React from "react";
import api from "./Api";

function GoogleLogin(props){
    async function login(){
        window.location.href = "http://localhost:3000/auth/google";
    }

    return(
        <button onClick={login}>{props.btnName}</button>
    )
}

export default GoogleLogin;