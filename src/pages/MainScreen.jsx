import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  orderBy,
  query,
} from "firebase/firestore";
import FetchedPostContainer from "./FetchedPostContainer";

const MainScreen = () => {
  const [posts, setPosts] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (uid) => {
    const db = getFirestore();
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      console.log("No such user!");
      return null;
    }
    const userData = userDoc.data();
    console.log(userData);
    return {
      username: usersData.displayName,
      image: userData.profilePicture,
    };
  };

  const fetchPosts = async () => {
    const db = getFirestore();
    const postsCollection = collection(db, "posts");
    const postsQuery = query(postsCollection, orderBy("timestamp", "desc"));
    const postsSnapshot = await getDocs(postsQuery);
    const postsData = [];

    postsSnapshot.forEach((doc) => {
      const postData = doc.data();
      console.log(postData.userId);
      fetchUser(postData.userId).then((doc) => {
        // console.log(doc.username);
        // console.log(doc.image);
      });
      postsData.push(postData);
    });

    setPosts(postsData);
    setLoading(false);
    console.log(postsData.length);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post, index) => (
          <FetchedPostContainer key={index} post={post} />
        ))
      )}
    </div>
  );
};

export default MainScreen;
