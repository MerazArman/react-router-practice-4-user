import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './Friend.css'

const Friend = (props) => {
    //console.log(props.friend);
    const {name, email, id} = props.friend

    return (
        <div className="friend-box">
            <h4>Name: {name} </h4>
            <h6>Email: {email} </h6>
            <Link to={`/friend/${id}`}> <Button variant="contained" color="primary" >  see more </Button> </Link>

        </div>
    );
};

export default Friend;