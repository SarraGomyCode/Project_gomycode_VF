import React, { useState } from "react";
//APIs
import { Alert } from "react-bootstrap";
//package
import axios from "axios";

const AddUser = () => {
  const [userInfo, setUserInfo] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    type: "",
  });
  // alter
  const [showAlter, setShowAlter] = useState(false);

  const userTypes = ["admin", "manager", "consultant"];

  const OnSubmit = (event) => {
    event.preventDefault();
    // send data to back-end
    axios
      .post("http://localhost:5000/users/add", userInfo)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

    setUserInfo({
      nom: "",
      prenom: "",
      email: "",
      password: "",
      type: "",
    });

    handleVisible();
  };

  const handleVisible = () => {
    setShowAlter(true);
    setTimeout(() => {
      setShowAlter(false);
    }, 3000);
  };

  return (
    <div className="addUser-form-container">
      <h2>Ajouter un nouvel utilisateur</h2>
      {showAlter ? (
        <Alert variant={"success"}>l'utilisateur a été ajouté</Alert>
      ) : (
        <div style={{ height: 66 }} />
      )}
      <form onSubmit={OnSubmit}>
        {/* prenom */}
        <div className="form-group">
          <label>Prenom: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={userInfo.prenom}
            onChange={(e) => {
              setUserInfo({ ...userInfo, prenom: e.target.value });
            }}
          />
        </div>
        {/* nom */}
        <div className="form-group">
          <label>Nom: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={userInfo.nom}
            onChange={(e) => {
              setUserInfo({ ...userInfo, nom: e.target.value });
            }}
          />
        </div>
        {/* email */}
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            required
            className="form-control"
            value={userInfo.email}
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
          />
        </div>

        {/* password */}
        <div className="form-group">
          <label>Mot de passe: </label>
          <input
            type="password"
            required
            minlength="8"
            className="form-control"
            value={userInfo.password}
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                password: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-group">
          <label>type: </label>
          <select
            // ref="userInfo"
            placeholder="here"
            required
            className="form-control"
            value={userInfo.type}
            onChange={(e) => {
              setUserInfo({ ...userInfo, type: e.target.value });
            }}
          >
            <option value="" disabled selected>
              Select your option
            </option>
            {userTypes.map(function (type, index) {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <br />
          <input
            type="submit"
            value="ajouter un nouvel utilisateur"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
