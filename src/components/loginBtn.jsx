import React, {useState, useEffect} from "react";
import axios from "axios";

function LoginBtn() {
    const [isLoading, setisLoading] = useState(false);
    const [name, setName] = useState(null);
    const [isError, setIsError] = useState(null)

    async function test(){
        try {
            setisLoading(true)
            const result = await axios.post("http://localhost:3000/getItem", { name: "jhon" })
            setName(result.data.name)
        } catch (error) {
            setIsError(error)
            console.log(error)
        }finally{
            setisLoading(false) 
        }   
        }
       
        // useEffect(() => {
        //     test()
        // }, []
        // )


        return(
        <div>
            <button onClick={test}>{isLoading ? "Loading..." : "Click"}</button>
            <p>{name ? name : "no name"}</p>
        </div>
        )
    }
  
 

export default LoginBtn;