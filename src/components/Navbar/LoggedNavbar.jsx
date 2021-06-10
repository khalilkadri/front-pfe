import React,{useState} from 'react'
import "../../Styles/LoggedNavbar.css"
import {NavLink,Link} from 'react-router-dom'
import AddCircle from "@material-ui/icons/AddCircle";
import IconButton from '@material-ui/core/IconButton';
import Operation_decaisse from './Operation_decaisse';
import Operation_encaisse from './Operation_encaisse';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
const LoggedNavbar = ({ sidebarOpen, openSidebar }) => {
  const navs=[
  {path:"/dashboard",
  title:"dashboard"},
  {path:"/category",
  title:"categories"},
]
const [modalShow, setModalShow] = React.useState(false);
const [modal,setModal]=React.useState(false)
const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};
  return (
    <nav className="loggednavbar" style={{backgroundColor:"blue"}}>
      <div className="loggednav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="loggednavbar__left">
      {navs.map(t =>
      <NavLink
        exact
        activeClassName="active_link"
        to={t.path}
      >
        {t.title}
      </NavLink>
    )}
      </div>
    
        
      
      <div className="containerd-flex justify-content-end " >
     <div className=" container ml-auto mb-2 ml-lg-0"> 
     <IconButton   style={{color:"white"}} className="btn" data-toggle="dropdown">
         <AddCircle />
     </IconButton> 
     <IconButton  style={{color:"white"}}  className="btn" onClick={handleClick}>
<SettingsIcon />
</IconButton> 
<Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem onClick={handleClose}><GetAppOutlinedIcon/>Exporter mes données</MenuItem>
  <MenuItem onClick={handleClose}><PersonOutlineOutlinedIcon/>Profile</MenuItem>
  <MenuItem><AssessmentOutlinedIcon/>Graphiques</MenuItem>
  <MenuItem > <NavLink to='/' onClick={()=>localStorage.clear()} style={{textDecoration:"none",color:"red"}}><ExitToAppIcon/>Déconnexion</NavLink>
</MenuItem>
</Menu>

          <div className="dropdown dropdown-menu">  
          <div className="row">
          <div className="col-sm-6">
            <h5 className="dropdown-header">Encaissement</h5>
            <ul className="d-flex flex-column justify-content-start">
            <li
                       
                       className="btn flex-fill " style={{marginLeft:"20px",color:"blue"}} 
                      onClick={() => setModalShow(true)}
                     >
                       opération payée
                     </li>   
                    
                     <li
                       
                       className="btn flex-fill " style={{marginLeft:"20px",color:"blue"}} 
                      onClick={() => setModalShow(true)}
                     >
                       opération engagée
                     </li>   </ul></div>      
                     <div class="col-sm-6">

            <h5 className="dropdown-header ">Décaissement</h5>
            <ul className="d-flex flex-column justify-content-start">
            <li
                       
                       className="btn flex-fill " style={{marginLeft:"20px",color:"blue"}} 
                      onClick={() => setModal(true)}
                     >
                       opération payée
                     </li> 
                     <li
                       
                       className="btn flex-fill " style={{marginLeft:"20px",color:"blue"}} 
                      onClick={() => setModal(true)}
                     >
                       opération engagée
                     </li> </ul></div>
                     </div>
          </div>
        </div>
        
        <Operation_encaisse
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Operation_decaisse
      show={modal}
      onHide={()=>setModal(false)}
      />
       
       
        
    
      </div>
    </nav>
  );
};

export default LoggedNavbar;



