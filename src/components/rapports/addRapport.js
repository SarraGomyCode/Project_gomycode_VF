import React, { useState, useEffect } from "react";
//APIs
import { Alert } from "react-bootstrap";
// package
const axios = require("axios");

const AddUser = () => {
  const [rapportInfo, setRapportInfo] = useState({
    projet: "",
    consultant: [],
    client: [],
    kilo_depart: 0,
    kilo_retour: 0,
    tache_effectuee: "",
  });
  const [clients, setClients] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlter, setShowAlter] = useState(false);

  useEffect(() => {
    getClients();
    getConsultants();
    setLoading(true);
  }, []);

  const getClients = async () => {
    axios
      .get("http://localhost:5000/clients")
      .then((clients) => {
        if (clients.data.length) {
          setClients(clients.data);
        }
      })
      .catch((error) => console.log(`Getting clients failed ${error.message}`));
  };

  const getConsultants = () => {
    axios
      .get("http://localhost:5000/users")
      .then((users) => {
        if (users.data.length) {
          setConsultants(
            users.data.filter((user) => user.type === "consultant")
          );
        }
      })
      .catch((error) => console.log(`Getting clients failed ${error.message}`));
  };

  const OnSubmit = (event) => {
    event.preventDefault();
    // send data to back-end
    axios
      .post("http://localhost:5000/rapports/add", rapportInfo)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

    setRapportInfo({
      projet: "",
      consultant: [],
      client: [],
      kilo_depart: 0,
      kilo_retour: 0,
      tache_effectuee: "",
    });

    handleVisible();
  };

  const handleVisible = () => {
    setShowAlter(true);
    setTimeout(() => {
      setShowAlter(false);
    }, 3000);
  };

  if (!loading) return <div>loading...</div>;

  return (
    <div className="addUser-form-container">
      <h2>Ajouter un nouveau rapport</h2>
      {showAlter ? (
        <Alert variant={"success"}>Raport a été ajouté</Alert>
      ) : (
        <div style={{ height: 66 }} />
      )}
      <form onSubmit={OnSubmit}>
        {/* projet */}
        <div className="form-group">
          <label>projet: </label>
          <input
            type="text"
            required
            className="form-control"
            value={rapportInfo.projet}
            onChange={(e) => {
              setRapportInfo({ ...rapportInfo, projet: e.target.value });
            }}
          />
        </div>
        {/* consultant */}
        <div className="form-group">
          <label>consultant: </label>
          <select
            placeholder="here"
            required
            className="form-control"
            value={rapportInfo.consultant}
            onChange={(e) => {
              setRapportInfo({ ...rapportInfo, consultant: e.target.value });
            }}
          >
            <option value="" disabled selected>
              Select your option
            </option>
            {consultants.map((consultant) => {
              return (
                <option key={consultant._id} value={consultant._id}>
                  {consultant.nom} {consultant.prenom}
                </option>
              );
            })}
          </select>
        </div>

        {/* client */}
        <div className="form-group">
          <label>client: </label>
          <select
            placeholder="here"
            required
            className="form-control"
            value={rapportInfo.client}
            onChange={(e) => {
              setRapportInfo({ ...rapportInfo, client: e.target.value });
            }}
          >
            <option value="" disabled selected>
              Select your option
            </option>
            {clients.map((client) => {
              return (
                <option key={client._id} value={client._id}>
                  {client.nom} {client.prenom}
                </option>
              );
            })}
          </select>
        </div>

        {/* kilo_depart */}
        <div className="form-group">
          <label>Départ (Kilométre): </label>
          <input
            type="number"
            required
            minlength="8"
            className="form-control"
            value={rapportInfo.kilo_depart}
            onChange={(e) => {
              setRapportInfo({ ...rapportInfo, kilo_depart: e.target.value });
            }}
          />
        </div>
        {/* kilo_retour */}
        <div className="form-group">
          <label>Retour (Kilométre): </label>
          <input
            type="number"
            required
            minlength="8"
            className="form-control"
            value={rapportInfo.kilo_retour}
            onChange={(e) => {
              setRapportInfo({ ...rapportInfo, kilo_retour: e.target.value });
            }}
          />
        </div>

        {/* tache_effectuee */}
        <div className="form-group">
          <label>Tache effectuée: </label>
          <input
            type="text"
            // style={{ height: "142px" }}
            className="form-control"
            value={rapportInfo.tache_effectuee}
            onChange={(e) => {
              setRapportInfo({
                ...rapportInfo,
                tache_effectuee: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-group">
          <br />
          <input
            type="submit"
            value="Ajouter un nouveau rapport"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
