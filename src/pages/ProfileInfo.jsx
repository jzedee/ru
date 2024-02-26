import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/profilecard.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState({
    address: "",
    contactNumber: "",
    designation: "",
  });

  const fetchUserByUID = async (uid) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);

    const userDoc = snapshot.docs.find((doc) => doc.data().uid === uid); // Find the document with the matching UID

    if (!userDoc) {
      console.log("No such user found with UID: " + uid);
      return null;
    }

    const userData = userDoc.data();
    console.log("Fetched user data:", userData);
    return userData;
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          // Fetch additional details using the existing logic
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setAdditionalDetails({
              address: userData.address || "",
              contactNumber: userData.contactNumber || "",
              designation: userData.designation || "",
            });
          }

          // Fetch user data by UID using the new logic
          const userByUID = await fetchUserByUID(user.uid);
          if (userByUID) {
            console.log("User Data by UID:", userByUID);
            // Update the local state with the additional details fetched by UID
            setAdditionalDetails({
              address: userByUID.address || "",
              contactNumber: userByUID.contactNumber || "",
              designation: userByUID.designation || "",
            });
          }
        } catch (error) {
          console.error("Error fetching user details:", error.message);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="profile-card">
      {user && user.photoURL && (
        <img src={user.photoURL} alt="Profile" className="profile-picture" />
      )}
      {user && user.displayName && <h2>{user.displayName}</h2>}
      <div className="profile-details">
        <p>
          <strong>Address:</strong> {additionalDetails.address}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Contact Number:</strong> {additionalDetails.contactNumber}
        </p>
        <p>
          <strong>Designation:</strong> {additionalDetails.designation}
        </p>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // Remove the prop types for address, contactNumber, and designation
};

export default ProfileCard;
