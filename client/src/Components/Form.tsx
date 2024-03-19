import React, { useEffect, useState } from 'react'
import './Form.css'; 
import { CREATE_USER_MUTATION } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import { create } from 'domain';


const Form = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [createUser, { error, data }] = useMutation(CREATE_USER_MUTATION);

    const addUser = async() => {
        try {
            const data = await createUser({
                variables: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                },
            });
            console.log('User created:', data);
            alert('Succes!');
        } catch (error) {
            console.error(error);
        }
    };

    //Will run after each succesful render
    useEffect(() => {
        if (data && !error) { //check if there is data
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        }
    }, [data]);

    return (
        <div>
            <h2>GraphQL API</h2>
            <div className={'container'}>
                <input 
                    type="text" 
                    placeholder='First name'
                    value={firstName}
                    onChange={(e) => {
                    setFirstName(e.target.value)
                    }}
                />
                <input 
                    type="text" 
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => {
                    setLastName(e.target.value)
                    }}
                />
                <input 
                    type="text" 
                    placeholder='Email'
                    value={email}
                    onChange={(e) => {
                    setEmail(e.target.value)
                    }}
                />
                <input 
                    type="password" 
                    placeholder='Password'
                    value={password}
                    onChange={(e) => {
                    setPassword(e.target.value)
                    }}
                />
                <button onClick={addUser}>Create User</button>
            </div>
        </div>
  )
}

export default Form
