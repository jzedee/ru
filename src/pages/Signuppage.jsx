import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import logo from '../images/logo.png';
import '../styles/signup.css';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [role, setRole] = useState("student");
    const [contactNumber, setContactNumber] = useState("");

    const createUser = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Upload profile picture to Firebase Storage
            const storageRef = ref(storage, `profile_pictures/${user.uid}`);
            await uploadBytes(storageRef, profilePicture);

            // Get the download URL of the uploaded picture
            const pictureURL = await getDownloadURL(storageRef);

            // Update user profile with additional details
            await updateProfile(user, {
                displayName: displayName,
                photoURL: pictureURL,
            });

            // Add user data to Firestore
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                email: email,
                displayName: displayName,
                designation: designation,
                address: address,
                profilePicture: pictureURL,
                role: role,
                contactNumber: contactNumber,
            });

            alert("Registration successful!");

            // Reset form fields
            setEmail("");
            setPassword("");
            setDisplayName("");
            setDesignation("");
            setAddress("");
            setProfilePicture(null);
            setRole("student");
            setContactNumber("");
        } catch (error) {
            // Handle errors here
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === "auth/email-already-in-use") {
                alert("Email address is already in use!");
            } else {
                alert(errorMessage);
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    return (
        <div className="signup-page">
            <div className="title-container-welcome">
                <img
                    src={logo}
                    alt="App Logo"
                    className="logo"
                />
                <div className="spacer"></div>
                <span className="app-name-welcome">Welcome to Rungta Connect 2.0</span>
            </div>

            <div className="login-form">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    required
                    placeholder="Enter your Email here"
                />

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    required
                    placeholder="Enter your Password here"
                />

                <input
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                    type="text"
                    required
                    placeholder="Enter your Name here"
                />

                <input
                    onChange={(e) => setDesignation(e.target.value)}
                    value={designation}
                    type="text"
                    required
                    placeholder="Enter your Designation here"
                />

                <input
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    type="text"
                    required
                    placeholder="Enter your Address here"
                />

                <input
                    onChange={(e) => setContactNumber(e.target.value)}
                    value={contactNumber}
                    type="text"
                    required
                    placeholder="Enter your Contact Number here"
                />

                <select className="dropdown-signup"
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="alumni">Alumni</option>
                </select>

                <label className="file-upload-button">
                    <span>Choose Profile Picture</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>

                <button className="signup-btn-login-page" onClick={createUser}>
                    Sign Up
                </button>
                <Link to="/sign-in" className='welcome-buttons'> Already registered ? </Link>
            </div>
        </div>
    );
};

export default SignupPage;
