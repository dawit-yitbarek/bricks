import React, { useState } from "react";
import api from "./Api";

function Register() {

    const [name, setName] = useState("")
    const [age, setAge] = useState("")


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('http://localhost:3000/register', { name, age })
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleNameInput = (event) => {
        setName(event.target.value)
    };

    const handleAgeInput = (event) => {
        setAge(event.target.value)
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={name} onChange={handleNameInput}></input>
                <input type="number" name="age" value={age} onChange={handleAgeInput}></input>
                <input type="submit" />
            </form>
        </div>
    )

};

export default Register;



