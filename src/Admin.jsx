
import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import{ useState, useEffect } from 'react';
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import { ContactSupportOutlined } from '@material-ui/icons';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import {NavLink,Link} from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
toast.configure()
const useStyles = makeStyles((theme) => ({

    root: {
        width: "100%",
        maxWidth: 360,
        background: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4
    },
    paper: {
      position: 'absolute',
      width: 1500,
      height:800,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  
    },
    paper1:{
      position: 'absolute',
      width: 400,
      height:200,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  
    },
    head:{
      backgroundColor: "#90D2E2",
    },
    cell:{
      minWidth:232,
    },
   sum:{  minWidth:132,
    textAlign:'center',},
    montant:{
      minWidth:132,
      textAlign:'center',
      "&:hover": {
        backgroundColor: "#cfcfcf",
        cursor: "pointer",
      },
    }
  }))
  
  
  function getModalStyle() {
    const top = 50 
    const left = 50 
    const bottom = 50 
    const right = 50 
    return {
      top: `${top}%`,
      left: `${left}%`,
      right: `${right}%`,
      bottom: `${bottom}%`,
      transform: `translate(-${top}%, -${left}%)`,
      overflowY: 'scroll',
  
      
    };
  }
  
function Admin(){
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [openmodal, setOpenmodal] = React.useState(false);
    const [id,setID]=React.useState();
    const [intitule,setIntitule]=React.useState('');
    const [montant,setMontant]=React.useState('');
    const [tva,setTva]=React.useState('');
    const [type,setType]=React.useState('');
    const [facturation,setFacturation]=React.useState('');
    const [reglement,setReglement]=React.useState('');
    const [categorie,setCategorie]=React.useState('');
    const [subcategorie,setSubcategorie]=React.useState('');
    const [memo,setMemo]=React.useState('');
    const [data, setdata] = React.useState([]);
    const [subs,setSubs]=React.useState(false);
    const [users,setUsers]=React.useState([]);
    const [cats,setCats]=React.useState([])
    const [cat,setCat]=React.useState('');
    const [subcat,setSubcat]=React.useState('')
    const [subcats,setSubcats]=React.useState([])
    const [items,setItems]=React.useState([])
    const[showsub,setShowsub]=React.useState(true)
    const[intituleError,setIntituleError]=React.useState('')
    const[TypeError,setTypeError]=React.useState('')
    const[MontantError,setMontantError]=React.useState('')
    const[FacturationError,setFacturationError]=React.useState('')
    const[ReglementError,setReglementError]=React.useState('')
    const[CategorieError,setCategorieError]=React.useState('')
    const[SubcatError,setSubcatError]=React.useState('')
    const [valid,setValid]=React.useState(false)
    const[disablereglement,setDisablereglement]=React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const config= {
      headers:{
          Authorization: 'Bearer '+localStorage.getItem('token')
      }}
    useEffect(() => {
        const fetchData = async () => {
          
          axios.get('http://127.0.0.1:3333/admin',config).then(res=>{
            setUsers(res.data)
          })
      };
       
      fetchData();
      }, []);
      

 function handleOpenmodal (event,item){
   event.preventDefault();
 setOpenmodal(true)
 setID(item.id)
  
  };
 
  
  function handleClosemodal(e){
    e.preventDefault()
   setOpenmodal(false)
  };
 
  
 
 function handleDelete(e){
   e.preventDefault();
   console.log(id)
   axios.delete(`http://127.0.0.1:3333/admin/${id}`,config).then(res => {   
     let tab=users
           tab=tab.filter(enc=> enc.id !==id);
           setUsers(tab)
 
   })   
   handleClosemodal(e)
   handleClose()
   toast.error('supprimé avec success',{position:toast.POSITION.BOTTOM_RIGHT})

 }
 
 
 
 function handleUpdate(e,item){
  e.preventDefault();

      toast.success('modifié avec success',{position:toast.POSITION.BOTTOM_RIGHT})

 }
 const handleClose = () => {
  setAnchorEl(null);
  setOpenmodal(true)
};
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

    return(
      
        <div className="container mt-5">
          <div className="container mb-5">
          <NavLink to='/' onClick={()=>localStorage.clear()} style={{textDecoration:"none",color:"red"}}><ExitToAppIcon/>Déconnexion</NavLink>        </div>
       <Table class="table table-bordered">
    <TableHead class="thead-dark">
    <TableRow >
      <TableCell>nom de l'entreprise</TableCell>
      <TableCell>email</TableCell>
      <TableCell>secteur d'activité</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {users.map(e=>(
      <>
  <TableRow>
    <TableCell >{e.username}</TableCell>
    <TableCell >{e.email}</TableCell>
    <TableCell >{e.email}</TableCell>
    <TableCell><Button onClick={handleClick}><MoreHoriz/></Button></TableCell>
  </TableRow>
  <Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
><MenuItem onClick={event=>handleOpenmodal(event,e)}><DeleteIcon />Delete</MenuItem>
<MenuItem onClick={handleClose}><BlockIcon />Ban</MenuItem>
</Menu>
</>
  ))}
  </TableBody>
</Table>

<Modal
             open={openmodal}
             onClose={handleClosemodal}
             aria-labelledby="simple-modal-title"
             aria-describedby="simple-modal-description"
           
     
      >
                <div style={modalStyle} className={classes.paper1}> 
                <form onSubmit={handleDelete}>
        <ModalBody closeButton>
        <h1 className="mb-5">Etes-vous sure?</h1>
       <div className="container row">
         <div className="col"><button type="submit" className="btn btn-success">Valider</button></div>
         <div className="col"><button className="btn btn-danger" onClick={handleClosemodal}>Annuler</button></div>
       </div>
       </ModalBody>
       </form>
        </div>
      </Modal>
     
</div>
    )
}
export default Admin;