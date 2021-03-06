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
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
     const[TypeError,setTypeError]=React.useState('')
     const[MontantError,setMontantError]=React.useState('')
     const[MonthError,setMonthError]=React.useState('')
     const[YearError,setYearError]=React.useState('')
     const[CategorieError,setCategorieError]=React.useState('')
     const[SubcatError,setSubcatError]=React.useState('')
     const [valid,setValid]=React.useState(false)
     const [first,setFirst]=React.useState('')
     const config= {
      headers:{
          Authorization: 'Bearer '+localStorage.getItem('token')
      }};
    const months=[{id:"0",value:"Janvier"},{id:"1",value:"F??vrier"},{id:"2",value:"Mars"},{id:"3",value:"Avril"},{id:"4",value:"Mai"},
{id:"5",value:"Juin"},{id:"6",value:"July"},{id:"7",value:"Aout"},{id:"8",value:"Septembre"},{id:"9",value:"Octobre"},{id:"10",value:"Novembre"},{id:"11",value:"D??cembre"}]
useEffect(() => {
    const fetchData = async () => {
  await axios.get('http://127.0.0.1:3333/cat?type=encaissement',config).then(res=>{
    setCats(res.data.list)
    let firt=""
    setFirst(firt)
  });
  };
   
  fetchData();
  }, []);

  const validate=()=>{
    if(type=='')
    {setTypeError('champ obligatoire')
    setValid(false)}
    if(type!='')
    setTypeError('')
    if(!montant||montant=='')
    {setMontantError('champ obligatoire')
    setValid(false)}
    if(montant!='')
    setMontantError('')
    if(!month||month=='')
    {setMonthError('champ obligatoire')
    setValid(false)}
    if(month!='')
    setMonthError('')
    if(!year||year=='')
    {setYearError('champ obligatoire')
    setValid(false)}
    if(year!='')
    setYearError('')
    if(cat=='')
    {setCategorieError('champ obligatoire')
      setValid(false)}
    if(cat!='')
    setCategorieError('')
  if(type!=''&&montant!=''&&month!=''&&year!=''&&cat!='')
  {
    setValid(true)
  }
     }
  const handleChangeMontant=(e)=>{
    e.preventDefault();
    setMontant(e.target.value)
  
  }
  const selectType=(e)=>{
    e.preventDefault()
    setType(e.target.value)
    if(e.target.value=='encaissement'){
       axios.get('http://127.0.0.1:3333/cat?type=encaissement',config).then(res=>{
    setCats(res.data.list)
    })}
    else if(e.target.value=='decaissement'){
       axios.get('http://127.0.0.1:3333/cat?type=decaissement',config).then(res=>{
    setCats(res.data.list)
    })}
      }
  
  const handleYear=(e)=>{
    e.preventDefault()
    setYear(e.target.value)
  }
  const handleMonth=(e)=>{
    e.preventDefault()
    setMonth(e.target.value)   
  }
  const handleClose=(e)=>{
    e.preventDefault()
    init()
    props.onHide()
  }

  const init=()=>{
    setType('')
    setMontant('')
    setMonth('')
    setYear('')
    setCat('')
    setSubcat('')
    setTypeError('')
    setMontantError('')
    setMonthError('')
    setYearError('')
    setCategorieError('')
    setSubcat('')
    setSubcats([])
    setValid(false)
  }
  const handleSubmit=(e)=>{
    validate()

      e.preventDefault();
      if(valid)
        {
      axios.post('http://127.0.0.1:3333/objectif', {
  
          montant:montant,
          type:type,
          year:year,
          month:month,
          categorie:cat,
          subcategorie:subcat,
         },config,
          
  
      )
      .then(res=>{
        handleClose(e)
          }
      )
      toast.success('ajout?? avec success',{position:toast.POSITION.BOTTOM_RIGHT})
    }
    
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
          <TrackChangesIcon style={{color:"blue"}}/>Ajouter Pr??vision          
          </Modal.Title>
        </Modal.Header>
        <form  onSubmit={(e)=>handleSubmit(e)}>
        <Modal.Body>
        <div class="row">
        <div class="col-sm-6">
    <label >Montant</label>
    <input type="number" class="form-control" id="montant"  onChange={handleChangeMontant}/>
    <div style={{ fontSize: 12, color: "red" }}>{MontantError}</div>

  </div>
    <div class="col-sm-6">
    <label for="type">Type Du Pr??vision</label>
    <select class="form-control" id="type"  onChange={e=>{selectType(e)}} required >
        <option selected disabled>s??lectionner type</option>
      <option value="encaissement">Encaissement</option>
      <option value="decaissement">D??caissement</option>
    </select>
    <div style={{ fontSize: 12, color: "red" }}>{TypeError}</div>
</div>
  </div>
       
  <div class="row mt-3">
  <div class="col-sm-6">
    <label >Ann??e</label>
    <select class="form-control" id="type"  onChange={handleYear} required >
    <option selected disabled>s??lectionner ann??e</option>
      <option value="2019">2019</option>
      <option value="2020">2020</option>
      <option value="2021">2021</option>
    </select> 
    <div style={{ fontSize: 12, color: "red" }}>{YearError}</div>
 </div>
  <div class="col-sm-6"><label >Mois</label>
  <select class="form-control" id="type"   onChange={handleMonth} required>
  <option selected disabled>s??lectionner mois</option>
      {months.map(e=>(
        <option value={e.id}>{e.value}</option>
      ))}
    </select>   
    <div style={{ fontSize: 12, color: "red" }}>{MonthError}</div>
 </div>
  </div>
  {(first!="")?(
  <div class="form-group mt-3">
    <label for="cats"> Cat??gorie</label>
    
    <select class="form-control"  onChange={handleSelect}  required>
    <option disabled selected>selectionner cat??gorie</option>
    
        {cats.map(e=>(
            <option  value={e.nom}>{e.nom}</option>
        ))}
      </select>
      <div style={{ fontSize: 12, color: "red" }}>{CategorieError}</div>
        </div>):(<area/>)}
        {(subcats.length!=0)?(
        <div class="form-group mt-3">
    <label for="cats"> Sous Cat??gorie</label>
    <select class="form-control" id="cats" name="cats"  onChange={handleSubcat} required>
        <option>selectionner sous cat??gorie</option>
        {subcats.map(e=>(
            <option >{e.nom}</option>
        ))}
      </select>
      <div style={{ fontSize: 12, color: "red" }}>{SubcatError}</div>
        </div>):(<area/>)}
     
</Modal.Body>
<Modal.Footer>
<div><button type="cancel"   class="btn btn-danger border border-primary"  onClick={e=>handleClose(e)}>Annuler</button>
</div>
                <div> <Button  type="submit"  bg ="success"variant="success" >
                   Valider
                 </Button></div>

              
        
                 
                 </Modal.Footer>

        </form>
      </Modal>
</>)
}
export default Operation_prevision;