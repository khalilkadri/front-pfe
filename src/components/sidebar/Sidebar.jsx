import { NavLink } from "react-router-dom";
import "../../Styles/Sidebar.css";
import homme from "../../images/homme1.png"
import React  from "react";
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import EqualizerIcon from '@material-ui/icons/Equalizer';
const Sidebar = ({ sidebarOpen, closeSidebar }) => {
 

  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div >
        <img src={homme} alt="logo" />
          <h1>Code Hut</h1>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
      <NavLink style={{ textDecoration: 'none', fontWeight: 700, color: '#a5aaad'}} to="/Dashboard" 
      activeClassName="sidebar__link active_menu_link">
    
        <EqualizerIcon /> Dashboard
         
        </NavLink>
        <h2>Tables</h2>
        <br/>
        
        <NavLink style={{ textDecoration: 'none', fontWeight: 700, color: '#a5aaad'}} to="/encaissement" 
      activeClassName="sidebar__link active_menu_link">
    
    <TrendingUpIcon />           encaissement
         
      
        </NavLink>
        <br/>
        <br/>

       
        <NavLink style={{ textDecoration: 'none', fontWeight: 700, color: '#a5aaad'}} to="/decaissement" 
      activeClassName="sidebar__link active_menu_link">
    
    <TrendingDownIcon /> decaissement
         
      
        </NavLink>
        <br/>
        <br/>


        <NavLink style={{ textDecoration: 'none', fontWeight: 700, color: '#a5aaad'}} to="/objectif" 
      activeClassName="sidebar__link active_menu_link">
    
    <TrackChangesIcon /> prévisions
         
      
        </NavLink>
      
        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <NavLink to='/' onClick={()=>localStorage.clear()}>Log out</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
