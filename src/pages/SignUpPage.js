// By Sofie
import React from "react";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "@firebase/firestore";
import { usersRef } from "../firebase-config";
// import placeholder from "../assets/profile-picture.jpg";

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  function signUp(event) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, mail, password, name, image)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const docRef = doc(usersRef, user.uid);
        setDoc(docRef, { name });
        // ...
        navigate("/");
        console.log(user);
      })

      .catch((error) => {
        let code = error.code;
        code = code.replaceAll("-", " ");
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  return (
    <section className="page">
      <div className="signin-cntr">
        <form className="signin-form" onSubmit={signUp}>
          <h1 className="logo">
            Task<span>Roomies</span>
          </h1>
          <p>Opret en bruger</p>

          <input
            type="file"
            id="img"
            accept="image/*"
            onChange={e => setImage(e.target.value)}
            // onChange="previewImage(this.files[0], 'imagePreview')"
          />
          {/* <img
            src="../assets/profile-picture.gif"
            id="imagePreview"
            className="image-preview"
            alt="placeholder"
          /> */}
          <input
            type="text"
            name="name"
            placeholder="Hvad skal vi kalde dig?"
            onChange={e => setName(e.target.value)}
          />
          <input type="email" name="mail" placeholder="Hvad er din mail?" />
          <input type="password" name="password" placeholder="Adgangskode" />
          <p className="text-error">{errorMessage}</p>
          <button className="signin-btn">Opret</button>
          <p className="text-center">
            <strong>Har du en bruger? </strong>

            <Link to="/signin">Log ind</Link>
          </p>
        </form>
      </div>
    </section>
  );
}