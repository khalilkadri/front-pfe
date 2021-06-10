import React,{useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import axios from 'axios';
import {useState} from 'react'
import { SettingsSystemDaydreamRounded, SettingsSystemDaydreamSharp } from '@material-ui/icons';
import Alert from 'react-bootstrap/Alert'
import { useHistory } from "react-router-dom";
import { withStyles,makeStyles } from '@material-ui/core/styles';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';

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
      width: 500,
      height:600,
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
   
    montant:{
      minWidth:132,
      textAlign:'center',
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
  
  
function Operation_prevision(props){
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
const [openModal, setOpenModal] = React.useState(false);
const [id,setID]=React.useState();
const [montant,setMontant]=React.useState('');
const [type,setType]=React.useState('');
const [categorie,setCategorie]=React.useState('');
const [subcategorie,setSubcategorie]=React.useState('');
const [data, setdata] = React.useState([]);
const [subcats,setSubcats]=React.useState([])
const [cat,setCat]=React.useState('');
const [subcat,setSubcat]=React.useState('');
const [cats,setCats]=React.useState([]);
const [year,setYear]=React.useState('')
const[month,setMonth]=React.useState('')
const[disabled,setDisabled]=React.useState(true)
const months=[{id:"0",value:"Janvier"},{id:"1",value:"Février"},{id:"2",value:"Mars"},{id:"3",value:"Avril"},{id:"4",value:"Mai"},
{id:"5",value:"Juin"},{id:"6",value:"July"},{id:"7",value:"Aout"},{id:"8",value:"Septembre"},{id:"9",value:"Octobre"},{id:"10",value:"Novembre"},{id:"11",value:"Décembre"}]
useEffect(() => {
    const fetchData = async () => {
  await axios.get('http://127.0.0.1:3333/cat?type=encaissement').then(res=>{
    setCats(res.data.list)
  });
  };
   
  fetchData();
  }, []);

  const validate=()=>{
    if(type!=''&&montant!=''&&year!=''&&month!=''&&cat!='')
    setDisabled(false)
    else setDisabled(true)
  }
  const handleChangeMontant=(e)=>{
    e.preventDefault();
    setMontant(e.target.value)
    validate()
  
  }
  const selectType=(e)=>{
    e.preventDefault()
    setType(e.target.value)
    validate()
      }
  
  const handleYear=(e)=>{
    e.preventDefault()
    setYear(e.target.value)
    validate()
  }
  const handleMonth=(e)=>{
    e.preventDefault()
    setMonth(e.target.value)   
     validate()
  }
  const handleClose=(e)=>{
    e.preventDefault()
    init()
    props.onHide()
  }

  const init=()=>{
      setMontant('')
      setType('')
      setYear('')
      setMonth('')
      setCat('')
      setSubcat('')
  }
  const handleSubmit=(e)=>{
    const config= {
      headers:{
          Authorization: 'Bearer '+localStorage.getItem('token')
      }
  };
      e.preventDefault();
      axios.post('http://127.0.0.1:3333/objectif', {
  
        user_id:'1',
          montant:montant,
          type:type,
          year:year,
          month:month,
          categorie:cat,
          subcategorie:subcat,
         },
          
  
      )
      .then(res=>{
        handleClose(e)
          }
      )
    
  }
  
  const handleSelect=(e)=>{
    e.preventDefault();
    setCat(e.target.value)
    let subs=[]
    for(let i of cats)
    {
      if(i.nom==e.target.value && i.subcategories.length!=0)
      { 
        for (let j of i.subcategories)
        subs.push(j)
      }
     
    }
    setSubcats(subs)
    console.log(cat,subcats)
    validate()
  }
  const handleSubcat=(e)=>{
    e.preventDefault()
    setSubcat(e.target.value)
  }
    return(
      <>
  <Modal
        {...props}
     
      >
        <Modal.Header closeButton>
          <Modal.Title>
          <TrackChangesIcon style={{color:"blue"}}/>Ajouter Prévision          
          </Modal.Title>
        </Modal.Header>
        <form  >
        <Modal.Body>
        <div class="row">
        <div class="col-sm-6">
    <label >Montant</label>
    <input type="number" class="form-control" id="montant"  onChange={handleChangeMontant}/>
    {(montant=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}

  </div>
    <div class="col-sm-6">
    <label for="type">Type Du Prévision</label>
    <select class="form-control" id="type"  onChange={e=>{selectType(e)}} required >
        <option selected disabled>sélectionner type</option>
      <option value="encaissement">Encaissement</option>
      <option value="decaissement">Décaissement</option>
    </select>
    {(type=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}
</div>
  </div>
       
  <div class="row mt-3">
  <div class="col-sm-6">
    <label >Année</label>
    <select class="form-control" id="type"  onChange={handleYear} required >
    <option selected disabled>sélectionner année</option>
      <option value="2019">2019</option>
      <option value="2020">2020</option>
      <option value="2021">2021</option>
    </select> 
    {(year=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}
 </div>
  <div class="col-sm-6"><label >Mois</label>
  <select class="form-control" id="type"   onChange={handleMonth} required>
  <option selected disabled>sélectionner mois</option>
      {months.map(e=>(
        <option value={e.id}>{e.value}</option>
      ))}
    </select>   
    {(month=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}
 </div>
  </div>
  <div class="form-group mt-3">
    <label for="cats"> Catégorie</label>
    <select class="form-control"  onChange={handleSelect}  required>
    <option disabled selected>selectionner catégorie</option>
        {cats.map(e=>(
            <option  value={e.nom}>{e.nom}</option>
        ))}
      </select>
      {(cat=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}
        </div>
        {(subcats.length!=0)?(
        <div class="form-group mt-3">
    <label for="cats"> Sous Catégorie</label>
    <select class="form-control" id="cats" name="cats"  onChange={handleSubcat} required>
        <option>selectionner sous catégorie</option>
        {subcats.map(e=>(
            <option >{e.nom}</option>
        ))}
      </select>
      {(subcat=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}
        </div>):(<area/>)}
     
</Modal.Body>
<Modal.Footer>
<div class="row">
<button className="btn btn-danger  col m-3" onClick={e=>handleClose(e)}>Annuler</button>
<button className="btn btn-success col m-3" onClick={e=>handleSubmit(e)} disabled={disabled}>Ajouter</button>

</div>
              
        
                 
                 </Modal.Footer>

        </form>
      </Modal>
</>)
}
export default Operation_prevision;