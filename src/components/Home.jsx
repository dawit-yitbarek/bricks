import React, { useEffect, useState } from "react";
import api from "./Api";

function Home() {
    const [name, setName] = useState("no name");
    const [age, setAge] = useState("no age");

    useEffect(()=>{
        async function fetchData(){
            try {
                const response = await api.get("http://localhost:3000/home")
                setName(response.data.name)
                setAge(response.data.age)
                console.log(response.data.name)
                console.log(response.data.age)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [])

    return (
        <div>
            <h1> {name}</h1>
            <h1> {age}</h1>
        </div>
    )

}

export default Home;

