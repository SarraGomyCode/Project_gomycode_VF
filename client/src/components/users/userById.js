import React, { useEffect, useState } from "react";
//APIs
import { Alert, Button } from "react-bootstrap";

//APIs
import axios from "axios";
const _ = require("lodash");

const UserById = ({ location, match }) => {
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  // alter
  const [showAlter, setShowAlter] = useState(false);

  // 404 page
  const [_404, set404] = useState(false);

  const userTypes = ["admin", "manager", "consultant"];

  // remarque lodash if  location.state is empty
  useEffect(() => {
    const { id } = match.params;
    if (location.state) {
      setUser(location.state.data);
      setLoaded(true);
    } else {
      axios
        .get("http://localhost:5000/users/" + id)
        .then((result) => {
          if (!_.isEmpty(result.data)) {
            setUser(result.data);
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
      .post("http://localhost:5000/users/" + id, user)
      .then(() => handleVisible())
      .catch((err) => console.log("modify user has been updated", err.message));
  };

  const deleteUser = () => {
    const { id } = match.params;
    //send request to back-end
    axios
      .delete("http://localhost:5000/users/" + id)
      .then(() => {
        window.location = "/users";
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
      <h2>Modifier l'utilisateur</h2>
      {showAlter ? (
        <Alert variant={"success"}>l'utilisateur a été modifié</Alert>
      ) : (
        <div style={{ height: 66 }} />
      )}
      <Button variant="danger" onClick={deleteUser}>
        Supprimer l 'utilisateur
      </Button>
      <form onSubmit={OnSubmit}>
        {/* prenom */}
        <div className="form-group">
          <label>Prenom: </label>
          <input
            type="text"
            required
            minlength="3"
            className="form-control"
            value={user.prenom}
            onChange={(e) => {
              setUser({ ...user, prenom: e.target.value });
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
            value={user.nom}
            onChange={(e) => {
              setUser({ ...user, nom: e.target.value });
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
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
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
            value={user.password}
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-group">
          <label>type: </label>
          <select
            // ref="user"
            placeholder="here"
            required
            className="form-control"
            value={user.type}
            onChange={(e) => {
              setUser({ ...user, type: e.target.value });
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
            value="Modifier l'utilisateur"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default UserById;
