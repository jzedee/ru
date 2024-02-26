import React, { useState, useEffect } from "react";
import {
	getFirestore,
	collection,
	addDoc,
	serverTimestamp,
	doc,
	getDoc,
	setDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Auth module from Firebase SDK
import "../styles/addpost.css";

const AddPostContainer = () => {
	const [postText, setPostText] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("Category");
	const [selectedBranch, setSelectedBranch] = useState("Branch");
	const [link, setLink] = useState("");
	const [user, setUser] = useState(null);
	const [displayName, setDisplayName] = useState(""); // To store information about the logged-in user
	const [photoURL, setphotoURL] = useState("");

	const categories = ["Category", "Query", "Notice", "Event", "Achievement"];
	const branches = ["Branch", "MCA", "IT", "CSE", "Civil", "Electronics"];

	useEffect(() => {
		const auth = getAuth();

		// Subscribe to authentication state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setDisplayName(user.displayName);
			setphotoURL(user.photoURL);
		});

		// Clean up the subscription when the component unmounts
		return () => unsubscribe();
	}, []);

	const handlePostSubmit = async () => {
		if (!postText || selectedCategory === "Category") {
			alert("Post text and category are required!");
			return;
		}

		try {
			const db = getFirestore();

			// Check if the user is authenticated
			if (!user) {
				console.error("User not authenticated. Handle this case as needed.");
				return;
			}

			const uid = user.uid; // User ID from Firebase Authentication

			// Get a new document reference within the "posts" collection
			const postRef = doc(collection(db, "posts"));

			// Check if the generated ID is unique (optional)
			const postDoc = await getDoc(postRef);
			if (postDoc.exists()) {
				console.error(
					"Generated post ID is not unique. Handle this case as needed.",
				);
				return;
			}

			// Add a new post to the "posts" collection with the generated ID
			await setDoc(postRef, {
				userId: uid,
				postText,
				selectedCategory,
				selectedBranch,
				link,
				displayName,
				photoURL,
				timestamp: serverTimestamp(),
			});

			console.log("Post submitted successfully! Post ID:", postRef.id);

			// Clear the input fields after successful submission
			setPostText("");
			setSelectedCategory("Category");
			setSelectedBranch("Branch");
			setLink("");
		} catch (error) {
			console.error("Error adding post:", error.message);
		}
	};

	return (
		<div className="add-post-container">
			<div className="user-info">
				{user && (
					<>
						<img
							src={user.photoURL}
							alt="Profile Pic"
							className="profile-pic"
						/>
						<div className="greeting">Hey {user.displayName}!</div>
					</>
				)}
			</div>
			<input
				type="text"
				placeholder="What's on your mind?"
				value={postText}
				onChange={(e) => setPostText(e.target.value)}
				className="post-input"
			/>
			<select
				value={selectedBranch}
				onChange={(e) => setSelectedBranch(e.target.value)}
				className="branch-dropdown">
				{branches.map((branch) => (
					<option
						key={branch}
						value={branch}>
						{branch}
					</option>
				))}
			</select>
			<select
				value={selectedCategory}
				onChange={(e) => setSelectedCategory(e.target.value)}
				className="category-dropdown">
				{categories.map((category) => (
					<option
						key={category}
						value={category}>
						{category}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Add Link (optional)"
				value={link}
				onChange={(e) => setLink(e.target.value)}
				className="link-input"
			/>
			<button
				onClick={handlePostSubmit}
				className="post-button">
				Post
			</button>
		</div>
	);
};

export default AddPostContainer;
