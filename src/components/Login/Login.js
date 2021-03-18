

import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleFbSignIn, handleGoogleSignIn, handleSingOut, initializeLoginFramework } from './LoginManager';



function Login() {
    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({

        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',

    });

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })

    }

    const signOut = () => {
        handleSingOut()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
            })
    }
    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })

    }


    const handleBlur = (event) => {
        let isFieldValid = "true";

        // console.log(event.target.name, event.target.value);
        if (event.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
            // console.log(isEmailValid);

        }
        if (event.target.name === "password") {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /^\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }

    }
    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {


        }
        if (!newUser && user.email && user.password) {


        }

        event.preventDefault();

    }




    return (
        <div style={{ textAlign: "center" }}>

            {
                user.isSignedIn && <div>

                    <p>Welcome ! {user.name}</p>
                    <p><img src={user.photo} alt="" /></p>
                    <p>You are sign in </p>
                    <p>Your email id is : {user.email}</p>


                </div>

            }


            {
                user.isSignedIn ? <button onClick={signOut}>Sign out</button>

                    : <button onClick={googleSignIn}>Sign in</button>
            }
            <br />
            {
                <button onClick={fbSignIn}>Login With Facebook</button>
            }

            <h1>Our Own Authentication</h1>

            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign up</label>

            <form onSubmit={handleSubmit}>
                {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your Name" required />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="your email address" required />
                <br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="Your password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign up' : 'Sign In'} />
            </form>

            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? "Created" : "logged In"} successfully</p>
            }

        </div >

    );
}

export default Login;
