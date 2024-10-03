import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./back/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./profile.css";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = async (user) => {
    if (user) {
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log("User data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.log("User is not logged in");
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", user);
      fetchUserData(user);
    });
    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      {userDetails ? (
        <>
          <div className="profile-card">
            <img
              src={userDetails.photo}
              className="profile-picture"
              alt="User profile"
            />
            <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
            <div>
              <p>Email: {userDetails.email}</p>
              <p>First Name: {userDetails.firstName}</p>
              {/* <p>Last Name: {userDetails.lastName}</p> */}
            </div>
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
            <button
              className="Information"
              onClick={() => navigate("/options")}
            >
              รับข่าวสารเพิ่มเติม
            </button>
          </div>
        </>
      ) : (
        <p>User is not logged in</p>
      )}
    </div>
  );
}

export default Profile;
