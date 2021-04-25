import React, { useState } from "react";
//APIs
import { Alert } from "react-bootstrap";
//package
import axios from "axios";

const AddClient = () => {
  const [clientInfo, setClientInfo] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    projet: "",
  });
  // alter
  const [showAlter, setShowAlter] = useState(false);

  const OnSubmit = (event) => {
    event.preventDefault();
    // send data to back-end
    axios
      .post("http://localhost:5000/clients/add", clientInfo)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

    setClientInfo({
      nom: "",
      prenom: "",
      adresse: "",
      telephone: "",
      projet: "",
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
      <h2>Ajouter un nouveau client</h2>
      {showAlter ? (
        <Alert variant={"success"}>client a été ajouté</Alert>
      ) : (
        <div style={{ height: 66 }} />
      )}
      <form onSubmit={OnSubmit}>
        {/* nom */}
        <div className="form-group">
          <label>Nom: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={clientInfo.nom}
            onChange={(e) => {
              setClientInfo({ ...clientInfo, nom: e.target.value });
            }}
          />
        </div>
        {/* prenom */}
        <div className="form-group">
          <label>Prenom: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={clientInfo.prenom}
            onChange={(e) => {
              setClientInfo({ ...clientInfo, prenom: e.target.value });
            }}
          />
        </div>
        {/* adresse */}
        <div className="form-group">
          <label>Adresse: </label>
          <input
            type="text"
            required
            className="form-control"
            value={clientInfo.adresse}
            onChange={(e) => {
              setClientInfo({ ...clientInfo, adresse: e.target.value });
            }}
          />
        </div>
        {/* telephone */}
        <div className="form-group">
          <label>Telephone: </label>
          <input
            type="number"
            required
            className="form-control"
            value={clientInfo.telephone}
            onChange={(e) => {
              setClientInfo({ ...clientInfo, telephone: e.target.value });
            }}
          />
        </div>

        {/* projet */}
        <div className="form-group">
          <label>Projet: </label>
          <input
            type="text"
            required
            className="form-control"
            value={clientInfo.projet}
            onChange={(e) => {
              setClientInfo({ ...clientInfo, projet: e.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <br />
          <input
            type="submit"
            value="ajouter un nouveau client"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default AddClient;
