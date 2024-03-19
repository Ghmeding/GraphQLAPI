import React, { useState, useEffect} from 'react';
import {useQuery, gql} from '@apollo/client';
import {LOAD_USERS} from '../GraphQL/Queries'

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const GetUsers = () => {
  const {error, loading, data} = useQuery(LOAD_USERS);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(data){
      setUsers(data.getAllUsers);
    }
  }, [data])

  return (
    <div>
      {/* {users.map((user: User) => {
        return <h1>{user.firstName}</h1>
      })} */}
    </div>
  )
}



export default GetUsers