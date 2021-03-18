
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

firebase.initializeApp(firebaseConfig);

function Login() {
    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({

        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',

    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;

                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);

            })

            .catch(err => {
                console.log(err);
                console.log(err.message);
            });
    }
    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;
            console.log('fb user after sign in', user);

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;

            // ...
        })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                // ...
            });
    }
    const handleSingOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                    success: '',
                    error: ''

                }

                setUser(signOutUser);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
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
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    userUpdateName(user.name);

                })

                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });

        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log("sign in user info", res.user);

                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });

        }

        event.preventDefault();

    }

    const userUpdateName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name

        }).then(function () {
            console.log("user name updated successfully")
        }).catch(function (error) {
            console.log(error);
        });

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
                user.isSignedIn ? <button onClick={handleSingOut}>Sign out</button>

                    : <button onClick={handleSignIn}>Sign in</button>
            }
            <br />
            {
                <button onClick={handleFbSignIn}>Login With Facebook</button>
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
