import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { Button } from '@material-ui/core';

// firebase.initializeApp(firebaseConfig);
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const Firebase = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSign: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success:false
    });
    const handlerSign = () => {
        console.log('click');
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result);
            const {displayName, email, photoURL} = result.user;
            const signUsers = {
                isSign: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(signUsers)
            console.log(displayName, email, photoURL);
        })
        .catch((error) => {
            console.log(error);
            console.log(error.massage);
        })
    }

    const handlerSignOut = () =>{
        firebase.auth().signOut()
        .then(res => {
            
            const signOutUsers = {
                isSign:false,
                name:'',
                email: '',
                photo: '',
                // error: ''
            }
            setUser(signOutUsers)
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const inputValueHandle = (e) =>{
        // console.log(e.target.name, e.target.value);
        let isFormValid = true;  
        if (e.target.name === 'email') {
           isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
            // console.log(isEmailValid);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const isPasswordNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && isPasswordNumber;
        }
        if (isFormValid) {
            let userInfo = {...user}
            userInfo[e.target.name] = e.target.value;
            setUser(userInfo)
        }
    }

    const handlerSubmit = (e) =>{
        if (newUser && user.email && user.password) {
            // console.log('login done');
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user}
                newUserInfo.error = '';
                newUserInfo.success = true
                setUser(newUserInfo)
            })
            .catch((error) => {
                let newUserInfo = {...user}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(errorCode, errorMessage);
              });
            
        }
        if (!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user}
                newUserInfo.error = '';
                newUserInfo.success = true
                setUser(newUserInfo)
            })
            .catch((error) => {
                let newUserInfo = {...user}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(errorCode, errorMessage);
              });
            
        }

        e.preventDefault();
    }


    return (
        <div>
            {
                user.isSign && <div> 
                    <p>{user.name} </p> 
                    <p>{user.email} </p>
                    <img src={user.photo} alt="" />
                </div>
            }

            {
                user.isSign ? <Button onClick={handlerSignOut} variant="contained" color="primary" >Sign out</Button> :
                <Button onClick={handlerSign} variant="contained" color="primary" >Sign in</Button>
            }

            <div>

                     <p> Name: {user.name} </p>
                    <p>Email:{user.email} </p>
                    <p> Password: {user.password} </p>
                   
                
            </div>
                <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
                <label htmlFor="New Sign Up"> New Sign Up </label>
            <form onSubmit={handlerSubmit}>
                {newUser && <input type="text" onChange={inputValueHandle} name="name" placeholder="Enter Your Name" id=""  />}
                <br />
                <input type="text" onChange={inputValueHandle} name="email" placeholder="Enter Your Email" id="" required />
                <br />
                <input type="password" onChange={inputValueHandle} name="password" placeholder="Enter Password" id="" required />
                <br />
                <input type="submit" value="submit" />
            </form>
            
                <p> {user.error} </p>
                {user.success && <p> User { newUser ? "created" : 'logged in'} successfully</p>}
        </div>
    );
};

export default Firebase;