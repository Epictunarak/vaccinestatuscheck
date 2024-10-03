import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./back/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [PersonalID, setPersonalID] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          Phone: Phonenumber,
          PersonalID: PersonalID,
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <fieldset>
          <legend>Sign Up</legend>

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="ชื่อจริง"
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="นามสกุล"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input
              type="number"
              className="form-control"
              placeholder="เบอร์โทรศัพท์"
              onChange={(e) => setPhonenumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Personal ID</label>
            <input
              type="number"
              className="form-control"
              placeholder="เลขบัตรประชาชน"
              onChange={(e) => setPersonalID(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="รหัสผ่าน"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">Login</a>
          </p>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;
