import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const FriendDetails = () => {
    
    let {id} = useParams();
    console.log(id);
    const [friendInformation, setFriendInformation] = useState({});
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res => res.json())
        .then(data => setFriendInformation(data))
        
    },[id])
    const {name, email,phone, website} = friendInformation
    return (
        <div className="friend-box">
            <h5>Name {name}</h5>
            <p> <strong> Email:</strong> {email}</p>
            <p>Phone: {phone} </p>
            <p>Site: {website}</p>
        </div>
    );
};

export default FriendDetails;