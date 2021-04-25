import React, { useEffect, useState } from "react";
//APIs
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
// package
import axios from "axios";

const ListClients = () => {
  const [clients, setClients] = useState([]);
  const [copieClients, setCopieClients] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  // alter
  const [showAlter, setShowAlter] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/clients/")
      .then((result) => {
        if (result.data.length) {
          setClients(result.data);
          setCopieClients(result.data);
        }
        setLoaded(true);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const deleteClient = (id) => {
    //send request to back-end
    axios
      .delete("http://localhost:5000/clients/" + id)
      .then(() => console.log("client has been deleted"))
      .catch((err) => console.log(err.message));
    // update state
    setClients(clients.filter((client) => client._id != id));
    handleVisible();
  };

  if (!loaded) return <div>loading...</div>;

  const clientList = () => {
    return clients.map((client) => {
      let { _id, nom, prenom, adresse, telephone, projet } = client;
      let data = clients.filter((client) => client._id === _id);
      return (
        <tr>
          <td>{nom}</td>
          <td>{prenom}</td>
          <td>{adresse}</td>
          <td>{telephone}</td>
          <td>{projet}</td>
          <td>
            <Link
              to={{
                pathname: "/clients/" + _id,
                state: { data: data[0] },
              }}
            >
              Profil
            </Link>{" "}
            |{" "}
            <a href="#" onClick={() => deleteClient(_id)}>
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
      setClients(
        copieClients.filter((client) => {
          let text = e.target.value.trim();
          if (client.nom.includes(text)) return client;
          else if (client.prenom.includes(text)) return client;
          else if (client.adresse.includes(text)) return client;
          else if (client.projet.includes(text)) return client;
        })
      );
    } else {
      setClients(copieClients);
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
        <Alert variant={"success"}>client a été supprimé</Alert>
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
            <th>Adresse</th>
            <th>Telephone</th>
            <th>Projet</th>
          </tr>
        </thead>
        <tbody>{clientList()}</tbody>
      </table>
    </div>
  );
};

export default ListClients;
