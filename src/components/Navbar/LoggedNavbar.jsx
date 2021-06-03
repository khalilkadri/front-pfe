import React,{useState} from 'react'
import "../../Styles/LoggedNavbar.css"
import {NavLink,Link} from 'react-router-dom'
import AddCircle from "@material-ui/icons/AddCircle";
import IconButton from '@material-ui/core/IconButton';
import Operation_decaisse from './Operation_decaisse';
import Operation_encaisse from './Operation_encaisse';
import Objectif from './../Dashboard/Objectif';
const LoggedNavbar = ({ sidebarOpen, openSidebar }) => {
  const navs=[{path:"/category",
  title:"categories"},
  {path:"/dashboard",
  title:"dashboard"},
]
const [modalShow, setModalShow] = React.useState(false);
const [modal,setModal]=React.useState(false)
  return (
    <nav className="loggednavbar">
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
    
        
      
      <div className="container " >
     <div className=" container ml-auto mb-2 ml-lg-0"> 
     <IconButton  color="primary"  className="btn" data-toggle="dropdown">
         <AddCircle />
     </IconButton> 
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



