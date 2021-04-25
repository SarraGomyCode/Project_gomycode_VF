import React from "react";
//style
import "bootstrap/dist/css/bootstrap.min.css";
//APIs
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//components
import NavBar from "./components/global/Navbar";
import NavBarManager from "./components/global/navBarManager";
import NavBarAdmin from "./components/global/navBarAdmin";
import NavBarConsultant from "./components/global/navBarConsultant";

// component About user page
import Users from "./components/users/users";
import AddUser from "./components/users/addUser";
import UserById from "./components/users/userById";
// component About rapport page
import Rapports from "./components/rapports/rapports";
import AddRapport from "./components/rapports/addRapport";
import RapportById from "./components/rapports/rapportById";
// component About client page
import Clients from "./components/clients/clients";
import AddClient from "./components/clients/addClient";
import ClientById from "./components/clients/clientById";
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile/Profile';
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.userReducers.user);
console.log(user)
const renderSwitch=()=>{
  if(!user) {
    console.log(user)
    return
  };
  switch(user.type) {
  case 'admin':
    return <NavBarAdmin/>
    break;
  case 'manager':
    return <NavBarManager/>
    break;
    case 'consultant':
      return <NavBarConsultant/>
      break;
  default:
    // code block
}
}
  return (
    <div className="container">
      <Router>
        <NavBar />
        {renderSwitch()}
        <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/profile" component={Profile} />
          <Route exact path="/" component={Home} />
          {/* About User */}
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/:id" component={UserById} />
          {/* other path */}
          <Route exact path="/rapports" component={Rapports} />
          <Route exact path="/rapports/add" component={AddRapport} />
          <Route exact path="/rapports/:id" component={RapportById} />
          {/* other path */}
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/clients/add" component={AddClient} />
          <Route exact path="/clients/:id" component={ClientById} />

          {/* 404  */}
          <Route path="/" component={Error404} />
        </Switch>
      </Router>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      {" "}
      The main idea of the project is to help a company to manages the external
      consultant or the freelancers
    </div>
  );
};

const Error404 = () => {
  return <div>404</div>;
};

export default App;
