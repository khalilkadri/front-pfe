import React ,{useState}from "react";
import { Route, Switch,Redirect} from "react-router";
import Register from "./components/register"
import Home from "./Home";
import Service from "./Service";
import Contact from "./Contact";
import Login  from "./Login"
import Chart from "./components/Dashboard/Chart"
import Category from "./components/Dashboard/Category"
import Encaissement from "./components/Dashboard/Encaissement"
import Decaissement from "./components/Dashboard/Decaissement"
import Objectif from './components/Dashboard/Objectif'
import Profile from './components/Dashboard/Profile'
import Engages from './components/Dashboard/Engages'
import Graphiques from './components/Dashboard/Graphiques'
import Admin from './Admin'
import Signup from "./components/Signup";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "./Styles/Dashboard.css";
import LoggedNavbar from "./components/Navbar/LoggedNavbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./Styles/Main.css"
import LoginAdmin from "./LoginAdmin";
function App(){
    function isLoggedIn() {
        if (localStorage.getItem('token')) {
          return true;
        }
        return false;
      }
      const [sidebarOpen, setsidebarOpen] = useState(false);
      const openSidebar = () => {
        setsidebarOpen(!sidebarOpen);
      };
      const closeSidebar = () => {
        setsidebarOpen(false);
      
      };
return(
    <>
  
<Switch >
<Route exact path="/" component={()=>(isLoggedIn()?<Redirect to="/dashboard"/>:<Home/>)}/>
<Route exact path="/service" component={()=>(isLoggedIn()?<Redirect to="/dashboard"/>:<Service/>)}/>
<Route exact path="/contact" component={()=>(isLoggedIn()?<Redirect to="/dashboard"/>:<Contact/>)}/>
<Route exact path="/login" component={()=>(isLoggedIn()?<Redirect to="/dashboard"/>:<Login/>)}/>
<Route exact path="/signup" component={()=>(isLoggedIn()?<Redirect to="/dashboard"/>:<Signup/>)}/>
<Route exact path="/loginadmin" component={()=>(isLoggedIn()?<Redirect to="/admin"/>:<LoginAdmin/>)}/>
<Route exact path="/admin" component={() => (!isLoggedIn() ? <Redirect to="/loginadmin" /> : <Admin/>)}/>
<div >
<LoggedNavbar/>
<Route exact path="/encaissement" component={() => (!isLoggedIn() ? <Redirect to="/login" />:<Encaissement />)}/>
<Route exact path="/decaissement" component={() => (!isLoggedIn() ? <Redirect to="/login" />:<Decaissement />)}/>
<Route exact path="/dashboard" component={() => (!isLoggedIn() ? <Redirect to="/login" /> : <Chart/>)}/>
<Route exact path="/category" component={() => (!isLoggedIn() ? <Redirect to="/login" /> : <Category/>)}/>
<Route exact path="/objectif" component={() => (!isLoggedIn() ? <Redirect to="/login" /> : <Objectif/>)}/>
<Route exact path="/profil" component={() => (!isLoggedIn() ? <Redirect to="/login" /> : <Profile/>)}/>
<Route exact path="/engages" component={() => (!isLoggedIn() ? <Redirect to="/login" /> : <Engages/>)}/>
<Route exact path="/graphiques" component={() => (!isLoggedIn() ? <Redirect to="/login" /> : <Graphiques/>)}/>
</div>
<Redirect to='/'/>
</Switch>
</>
)
}
export default App;