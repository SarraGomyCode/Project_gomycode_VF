import React, { useEffect, useState } from "react";
//APIs
import { Alert, Button } from "react-bootstrap";

//APIs
import axios from "axios";
const _ = require("lodash");

const ClientById = ({ location, match }) => {
  const [client, setClient] = useState({});
  const [loaded, setLoaded] = useState(false);
  // alter
  const [showAlter, setShowAlter] = useState(false);

  // 404 page
  const [_404, set404] = useState(false);

  

  // remarque lodash if  location.state is empty
  useEffect(() => {
   // dispatch(fetchUser(id));
    const { id } = match.params;
    if (location.state) {
      setClient(location.state.data);
      setLoaded(true);
    } else {
      axios
        .get("http://localhost:5000/clients/" + id)
        .then((result) => {
          if (!_.isEmpty(result.data)) {
            setClient(result.data);
            set404(false);
          } else {
            set404(true);
          }

          setLoaded(true);
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  const handleVisible = () => {
    setShowAlter(true);
    setTimeout(() => {
      setShowAlter(false);
    }, 3000);
  };

  const OnSubmit = (e) => {
    const { id } = match.params;

    e.preventDefault();
    axios
      .post("http://localhost:5000/clients/" + id, client)
      .then(() => handleVisible())
      .catch((err) =>
        console.log("modify client has been updated", err.message)
      );
  };

  const deleteClient = () => {
    const { id } = match.params;
    //send request to back-end
    axios
      .delete("http://localhost:5000/clients/" + id)
      .then(() => {
        window.location = "/clients";
      })
      .catch((err) => console.log(err.message));
    handleVisible();
  };

  if (_404) {
    window.location = "/404";
  }

  if (!loaded) return <div>loading...</div>;

  return (
    <div className="addUser-form-container">
      <h2>Modifier client</h2>
      {showAlter ? (
        <Alert variant={"success"}>client a été modifié</Alert>
      ) : (
        <div style={{ height: 66 }} />
      )}
      <Button variant="danger" onClick={deleteClient}>
        Supprimer client
      </Button>
      <form onSubmit={OnSubmit}>
        {/* nom */}
        <div className="form-group">
          <label>Nom: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={client.nom}
            onChange={(e) => {
              setClient({ ...client, nom: e.target.value });
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
            value={client.prenom}
            onChange={(e) => {
              setClient({ ...client, prenom: e.target.value });
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
            value={client.adresse}
            onChange={(e) => {
              setClient({ ...client, adresse: e.target.value });
            }}
          />
        </div>

        {/* telephone */}
        <div className="form-group">
          <label>Telephone: </label>
          <input
            type="number"
            required
            minlength="8"
            className="form-control"
            value={client.telephone}
            onChange={(e) => {
              setClient({
                ...client,
                telephone: e.target.value,
              });
            }}
          />
        </div>
        {/* projet */}
        <div className="form-group">
          <label>Projet: </label>
          <input
            type="text"
            required
            minlength="8"
            className="form-control"
            value={client.projet}
            onChange={(e) => {
              setClient({
                ...client,
                projet: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-group">
          <br />
          <input
            type="submit"
            value="Modifier le client"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default ClientById;
