import { deleteUser } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

import UserData from './UserData';

const Users = () => {

    const {user} = useContext(AuthContext);
    const {result, count} = useLoaderData()
    
    const [users ,setUsers]=useState(result)



    const handleDeleteUser = id => {

            fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        const remaining = users.filter(usr => usr._id !== id)
                        setUsers(remaining);
                    }
                })
    }


    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    
                   {
                   users?.map(res=><UserData
                        key={res._id}
                        res={res}
                        count={count}
                        serial = {users?.indexOf(res)}
                        handleDeleteUser = {handleDeleteUser}
                    ></UserData>)
                   }
                    
                </tbody>
            </table>
        </div>
    );
};

export default Users;