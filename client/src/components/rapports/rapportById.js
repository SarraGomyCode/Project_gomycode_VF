import React, { useEffect, useState } from "react";
//APIs
import { Alert, Button } from "react-bootstrap";

//APIs
import axios from "axios";
const _ = require("lodash");

const RapportById = ({ location, match }) => {
  const [rapport, setRapport] = useState({});
  const [loaded, setLoaded] = useState(false);
  // alter
  const [showAlter, setShowAlter] = useState(false);

  // 404 page
  const [_404, set404] = useState(false);

  // remarque lodash if  location.state is empty
  useEffect(() => {
    const { id } = match.params;
    if (location.state) {
      setRapport(location.state.data);
      setLoaded(true);
    } else {
      axios
        .get("http://localhost:5000/rapports/" + id)
        .then((result) => {
          if (!_.isEmpty(result.data)) {
            setRapport(result.data);
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
      .post("http://localhost:5000/rapports/" + id, rapport)
      .then(() => handleVisible())
      .catch((err) =>
        console.log("modify report has been updated", err.message)
      );
  };

  const deleteRapport = () => {
    const { id } = match.params;
    //send request to back-end
    axios
      .delete("http://localhost:5000/rapports/" + id)
      .then(() => {
        window.location = "/rapports";
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
      <h2>Modifier le rapport</h2>
      {showAlter ? (
        <Alert variant={"success"}>le rapport a été modifié</Alert>
      ) : (
        <div style={{ height: 66 }} />
      )}
      <Button variant="danger" onClick={deleteRapport}>
        Supprimer le rapport
      </Button>
      <form onSubmit={OnSubmit}>
        {/* projet */}
        <div className="form-group">
          <label>Projet: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={rapport.projet}
            onChange={(e) => {
              setRapport({ ...rapport, projet: e.target.value });
            }}
          />
        </div>
        {/* consultant
        <div className="form-group">
          <label>Consultant: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={rapport.consultant}
            onChange={(e) => {
              setRapport({ ...rapport, consultant: e.target.value });
            }}
          />
        </div> */}
        {/* client
        <div className="form-group">
          <label>Consultant: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={rapport.client}
            onChange={(e) => {
              setRapport({ ...rapport, client: e.target.value });
            }}
          />
        </div> */}

        {/* kilo_depart */}
        <div className="form-group">
          <label> kilo_depart: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={rapport.kilo_depart}
            onChange={(e) => {
              setRapport({ ...rapport, kilo_depart: e.target.value });
            }}
          />
        </div>

        {/* kilo_retour */}
        <div className="form-group">
          <label> kilo_retour: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={rapport.kilo_retour}
            onChange={(e) => {
              setRapport({ ...rapport, kilo_retour: e.target.value });
            }}
          />
        </div>

        {/* tache_effectuee */}
        <div className="form-group">
          <label> tache_effectuee: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={rapport.tache_effectuee}
            onChange={(e) => {
              setRapport({ ...rapport, tache_effectuee: e.target.value });
            }}
          />
        </div>

        {/* fichier
        <div className="form-group">
          <label>Consultant: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={rapport.client}
            onChange={(e) => {
              setRapport({ ...rapport, client: e.target.value });
            }}
          />
        </div> */}

        <div className="form-group">
          <br />
          <input
            type="submit"
            value="Modifier le rapport"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default RapportById;
