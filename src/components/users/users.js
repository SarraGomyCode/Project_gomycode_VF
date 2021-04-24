import React, { useEffect, useState } from "react";
//APIs
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
// package
import axios from "axios";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [copieUsers, setCopieUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  // alter
  const [showAlter, setShowAlter] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((result) => {
        if (result.data.length) {
          setUsers(result.data);
          setCopieUsers(result.data);
        }
        setLoaded(true);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const deleteUser = (id) => {
    //send request to back-end
    axios
      .delete("http://localhost:5000/users/" + id)
      .then(() => console.log("user has been deleted"))
      .catch((err) => console.log(err.message));
    // update state
    setUsers(users.filter((user) => user._id !== id));
    handleVisible();
  };

  if (!loaded) return <div>loading...</div>;

  const userList = () => {
    return users.map((user) => {
      let { _id, nom, prenom, email, type } = user;
      let data = users.filter((user) => user._id === _id);
      return (
        <tr key={_id}>
          <td>{nom}</td>
          <td>{prenom}</td>
          <td>{email}</td>
          <td>{type}</td>
          <td>
            <Link
              to={{
                pathname: "/users/" + _id,
                state: { data: data[0] },
              }}
            >
              Profil
            </Link>{" "}
            |{" "}
            <a href="#" onClick={() => deleteUser(_id)}>
              delete
            </a>
          </td>
        </tr>
      );
    });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length) {
      setUsers(
        copieUsers.filter((user) => {
          let text = e.target.value.trim();
          if (user.nom.includes(text)) return user;
          else if (user.prenom.includes(text)) return user;
          else if (user.email.includes(text)) return user;
          else if (user.type.includes(text)) return user;
        })
      );
    } else {
      setUsers(copieUsers);
    }
  };

  const handleVisible = () => {
    setShowAlter(true);
    setTimeout(() => {
      setShowAlter(false);
    }, 3000);
  };

  return (
    <div>
      
      <br />
      {showAlter ? (
        <Alert variant={"success"}>l'utilisateur a été supprimé</Alert>
      ) : null}
      <input
        className="form-control"
        placeholder="Recherche"
        value={search}
        onChange={(e) => handleChange(e)}
      />
      <br />

      <br />
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Status</th>
            <th>Fonction</th>
          </tr>
        </thead>
        <tbody>{userList()}</tbody>
      </table>
    </div>
  );
};

export default ListUsers;
