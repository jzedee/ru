import React from "react";
import logo from "../images/logo.png";
import mine from "../images/mine.png";
import "../styles/index.css";
import "../styles/welcome.css";
import "../styles/tab.css";
import Navbar from "./Navbar";
import AddPostContainer from "./Addpost";
import PostContainer from "./PostContainer";
import UserProfile from "./Userprofile";
import ImageSlider from "./ImageSlider";
import MainScreen from "./MainScreen";

const Explore = () => {
	const samplePost = {
		profile: mine,
		name: "Sarvesh JD",
		dept: "MCA",
		category: "Query",
		postBody:
			"Dear community, I’m looking for an internship where I can learn basics of Android Development & UI/UX Designing. Can you help me if you have any Ideas? I’ve attached a link to my resume.",
	};

	// Array of image filenames
	const imageFilenames = [
		"rc1.webp",
		"rc2.webp",
		"rc3.jpeg",
		"rc4.png",
		"rc5.webp",
		"rc6.webp",
		"rc7.webp",
	];

	// Construct image URLs from the public folder
	const images = imageFilenames.map(
		(filename) => process.env.PUBLIC_URL + "/" + filename,
	);

	return (
		<div className="main-tab">
			<nav className="header-nav">
				<Navbar />
				<AddPostContainer />
			</nav>
			<main className="post-contents">
				<div className="columns-container">
					<div className="user-profile-box">
						<UserProfile />
					</div>
					<div className="posts-div">
						<MainScreen />
					</div>
					<div className="image-slider-box">
						{/* Pass the 'images' prop to the ImageSlider component */}
						<ImageSlider images={images} />
					</div>
				</div>
			</main>
		</div>
	);
};

export default Explore;
