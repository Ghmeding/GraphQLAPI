import React, { useEffect, useState } from 'react'
import './Form.css'; 
import { CREATE_USER_MUTATION } from '../GraphQL/Mutations';
import { useMutation, useQuery } from '@apollo/client';
import { LOAD_USERS } from '../GraphQL/Queries';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }


const Form = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [fetchUsers, setFetchUsers] = useState(false);

    const [createUser, { error: mutationError, data: mutationData }] = useMutation(CREATE_USER_MUTATION);
    const {error, loading, data: queryData} = useQuery(LOAD_USERS);

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

    const getAllUsers = async() => {
        try {
            const users = await queryData.getAllUsers;
            setUsers(users);
        } catch (error) {
            console.log(error);
        }
    }

    //Will run after each succesful render
    useEffect(() => {
        if (mutationData) { //check if there is data
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        }
    }, [mutationData]);

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
                <button onClick={getAllUsers}>Get All Users</button>
                {users.map((user: User) => (
                    <p>{user.firstName}</p>
                ))}
            </div>
        </div>
  )
}

export default Form
