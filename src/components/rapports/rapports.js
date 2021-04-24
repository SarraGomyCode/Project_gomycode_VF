import React, { useEffect, useState } from "react";
//components
import DataNotFound from "../global/dataNotFound";
//APIs
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
// package
import axios from "axios";

const ListRapports = () => {
  const [rapports, setRapports] = useState([]);
  console.log("from hounika", rapports);
  const [copieRapports, setCopieRapports] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  // alter
  const [showAlter, setShowAlter] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/rapports")
      .then((result) => {
        if (result.data.length) {
          setRapports(result.data);
          setCopieRapports(result.data);
        }
        setLoaded(true);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const deleteRapport = (id) => {
    //send request to back-end
    axios
      .delete("http://localhost:5000/rapports/" + id)
      .then(() => console.log("report has been deleted"))
      .catch((err) => console.log(err.message));
    // update state
    setRapports(rapports.filter((rapport) => rapport._id != id));
    handleVisible();
  };

  if (!loaded) return <div>loading...</div>;

  const rapportList = () => {
    return rapports.map((rapport) => {
      let {
        _id,
        projet,
        consultant,
        client,
        kilo_depart,
        kilo_retour,
        tache_effectuee,
      } = rapport;
      console.log("xxx", consultant, client);
      let data = rapports.filter((rapport) => rapport._id === _id);
      return (
        <tr key={_id}>
          <td>{projet}</td>
          <td>{consultant ? consultant.nom : <DataNotFound />}</td>
          <td>{client ? client.nom : <DataNotFound />}</td>
          <td>{kilo_depart ? kilo_depart : <DataNotFound />}</td>
          <td>{kilo_retour ? kilo_retour : <DataNotFound />}</td>
          <td>{tache_effectuee ? tache_effectuee : <DataNotFound />}</td>
          <td>
            <Link
              to={{
                pathname: "/rapports/" + _id,
                state: { data: data[0] },
              }}
            >
              Profil
            </Link>{" "}
            |{" "}
            <a href="#" onClick={() => deleteRapport(_id)}>
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
      setRapports(
        copieRapports.filter((rapport) => {
          let text = e.target.value.trim();
          if (rapport.projet.includes(text)) return rapport;
          // else if (rapport.consultant.includes(text)) return rapport;
          // else if (rapport.client.includes(text)) return rapport;
          // else if (rapport.kilo_depart.includes(text)) return rapport;
          // else if (rapport.kilo_retour.includes(text)) return rapport;
          else if (rapport.tache_effectuee.includes(text)) return rapport;
        })
      );
    } else {
      setRapports(copieRapports);
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
        <Alert variant={"success"}>rapport a été supprimé</Alert>
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
            <th>Projet</th>
            <th>consultant</th>
            <th>client</th>
            <th>kilo_depart</th>
            <th>kilo_retour</th>
            <th>tache_effectuee</th>
          </tr>
        </thead>
        <tbody>{rapportList()}</tbody>
      </table>
    </div>
  );
};

export default ListRapports;
