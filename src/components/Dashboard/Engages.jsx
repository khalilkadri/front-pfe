
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
      height:700,
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
  
function Engages(props){
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
    const [encaissements,setEncaissements]=React.useState([]);
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
    const config= {
      headers:{
          Authorization: 'Bearer '+localStorage.getItem('token')
      }}
    useEffect(() => {
        const fetchData = async () => {
          
          axios.get('http://127.0.0.1:3333/engages',config).then(res=>{
            setEncaissements(res.data)
          })
      let opts=[]
      const res=await axios.get('http://127.0.0.1:3333/cat?type=encaissement')
        setCats(res.data.list)
        console.log(cats)
      };
       
      fetchData();
      }, []);
      

 function handleOpenmodal (event,item){
   event.preventDefault();
   console.log(item.categorie,item.subcategorie)
   setOpenmodal(true)
   setID(item.id)
 setIntitule(item.intitule)
 setMontant(item.montant)
 setTva(item.tva)
 setType(item.type)
 setCat(item.categorie)
 setSubcat(item.subcategorie)
 let facture=new Date(item.facturation)
 var day = ("0" + facture.getDate()).slice(-2);
 var month = ("0" + (facture.getMonth() + 1)).slice(-2);
 let date_fact=facture.getFullYear()+'-'+(month)+'-'+(day)
 setFacturation(date_fact)
 let reglement=new Date(item.reglement)
 var days = ("0" + reglement.getDate()).slice(-2);
 var months = ("0" + (reglement.getMonth() + 1)).slice(-2);
 let date_facts=reglement.getFullYear()+'-'+(months)+'-'+(days)
 setReglement(date_facts.toString())
 
 setMemo(item.memo)
 let subs=[]
 for(let i of cats)
 {
   if(i.nom==item.categorie && i.subcategories.length!=0)
   { 
     for (let j of i.subcategories)
     subs.push(j)
   }
  
 }
 setSubcats(subs)

  
  };
 
  
  function handleClosemodal(){
   setOpenmodal(false)
  };
 
  
 
 function handleDelete(e,item){
   e.preventDefault();
   axios.delete(`http://127.0.0.1:3333/encaisse/${id}`,config).then(res => {   
     let tab=encaissements   
           tab=tab.filter(enc=> enc.id !==id);
           setEncaissements(tab)
 
   })   
   handleClosemodal()
   toast.error('supprimé avec success',{position:toast.POSITION.BOTTOM_RIGHT})

 }
 
 
 function init(){
  setIntitule('')
  setType('')
  setMontant('')
  setReglement('')
  setFacturation('')
  setTva('')
  setCat('')
  setSubcat('')
  setTypeError('')
  setIntituleError('')
  setMontantError('')
  setFacturationError('')
  setReglementError('')
  setCategorieError('')
  setSubcat('')
  setSubcats([])
  setDisablereglement(true)
  setValid(false)
}
 function validate(){
if(!intitule||intitule=='')
{setIntituleError('champ obligatoire')
setValid(false)}
if(intitule!='')
setIntituleError('')
if(type=='')
{setTypeError('champ obligatoire')
setValid(false)}
if(type!='')
setTypeError('')
if(!montant||montant=='')
{setMontantError('champ obligatoire')
setValid(false)}
if(type=='engagee'&&reglement==''){
  setValid(false)
}
if(montant!='')
setMontantError('')
if(!facturation||facturation=='')
{setFacturationError('champ obligatoire')
setValid(false)}
if(facturation!='')
setFacturationError('')
if(cat=='')
{setCategorieError('champ obligatoire')
  setValid(false)}
if(cat!='')
setCategorieError('')
if(intitule!=''&&type!=''&&montant!=''&&facturation!=''&&cat!='')
{
setValid(true)
}
 }
  
  function handleChangeIntitule(e){
    e.preventDefault();
    setIntitule(e.target.value)
  }
  function handleChangeType(e){
    e.preventDefault();
    setType(e.target.value)
    if(e.target.value=='payee')
    {setDisablereglement(true)
      setReglement('')
    }
    else if (e.target.value=='engagee')
    setDisablereglement(false)
    }
  function handleChangeMontant(e){
    e.preventDefault();
    setMontant(e.target.value)
    }
  function handleChangeTva(e){
    e.preventDefault();
    setTva(e.target.value)
    }
  function handleChangeFacturation(e){
    e.preventDefault();
    setFacturation(e.target.value)
    }
  function handleChangeReglement(e){
    e.preventDefault();
    setReglement(e.target.value)
    }
 
  function handleChangeSubcat(e){
    e.preventDefault();
    setSubcat(e.target.value)
    }
  function handleChangeMemo(e){
    e.preventDefault();
    setMemo(e.target.value)
  
  }
function handleSelect(e){
   e.preventDefault();
   console.log(cat,subcats)
   setCat(e.target.value)
   for(let i of cats)
   {
     if((i.nom==e.target.value && i.subcategories.length!=0)==true)
     { 
       setSubcats(i.subcategories)
       break
     }
     else{
       setSubcats([])
     }
    
   }
   if(subcats.length==0){
     setShowsub(true)
   }
   else{
     setShowsub(false)
   }

  }
  function handleSubcat(e){
    e.preventDefault()
    setSubcat(e.target.value)
  }
  function handleType(e){
    e.preventDefault()
    setType(e.target.value)
  }
 const cancel=(e)=>{
   e.preventDefault()
   handleClosemodal()
   init()
 
 }
 function handleUpdate(e){
  e.preventDefault();
  validate()
 if(valid)
    {
      axios.put(`http://127.0.0.1:3333/encaisse/${id}`,{
          intitule: intitule,
          montant: montant,
          tva:tva,
          type:type,
          facturation: facturation,
          reglement:reglement,
          categorie:cat,
          subcategorie:subcat,
          memo:memo},config).then(res=>{
            let date =new Date()
            let tab=encaissements
            let date_reglement=new Date(reglement)
           if(date_reglement<=date)
            {
              for (let i of tab)
              if(i.id===id){
                i.intitule=intitule
                i.montant=montant
                i.type=type
                i.tva=tva
                i.facturation=facturation
                i.reglement=reglement
                i.categorie=cat
                i.subcategorie=subcat
                i.memo=memo
                break
              }
             
            }
            else{
              console.log(false)
              tab=tab.filter(enc=> enc.id !==id);
            }
            setEncaissements(tab)
            handleClosemodal()
          })
          toast.success('modifié avec success',{position:toast.POSITION.BOTTOM_RIGHT})
      }
  
 }
function convertFromStringToDate(responseDate){
  let months=["Janvier","Février","Mars","Avril","Mai",
"Juin","July","Aout","Septembre","Octobre","Novembre","Décembre"]
const date=new Date(responseDate)
return (date.getDate()+' '+(months[date.getMonth()])+' '+date.getFullYear())
}
    return(
        <div className="container">
       <Table>
  <TableHead>
    <TableRow >
      <TableCell>intitulé</TableCell>
      <TableCell>catégorie</TableCell>
      <TableCell>Date</TableCell>
      <TableCell>montant</TableCell>
      <TableCell>modifier</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {encaissements.map(e=>(
  <TableRow>
    <TableCell >{e.intitule}<span className="alert-danger ml-3">en retard</span></TableCell>
    <TableCell >{e.categorie}:{e.subcategorie}</TableCell>
    <TableCell >{convertFromStringToDate(e.reglement)}</TableCell>
    <TableCell className="text-danger"><p className="font-weight-bold">- {e.montant}</p></TableCell>
    <TableCell><Button onClick={event=>handleOpenmodal(event,e)}><MoreHoriz/></Button></TableCell>
  </TableRow>
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
        <ModalHeader closeButton>
          <ModalTitle>
            <AccessAlarmsIcon style={{color:"red"}}/>Modifier Operation Payée       
          </ModalTitle>
        </ModalHeader>
        <form>
        <ModalBody>
        <div class="row">
        <div class="col-sm-6">
    <label >intitulé</label>
    <input type="text" class="form-control"  onChange={e=>handleChangeIntitule(e)} id="intitule" defaultValue={intitule}/>
    <div style={{ fontSize: 12, color: "red" }}>{intituleError}</div>

</div>
    <div class="col-sm-6">
    <label for="type">type de l'opération</label>
    <select class="form-control" id="type" onChange={e=>handleChangeType(e)} value={type}>
      <option selected disabled>sélectionner type</option>
      <option value="payee">payée</option>
      <option value="engagee">engagée</option>
    </select>
  <div style={{ fontSize: 12, color: "red" }}>{TypeError}</div>
</div>
  </div>
       
  <div class="row mt-3">
  <div class="col-sm-6">
    <label >Montant</label>
    <input type="number" class="form-control" id="montant" onChange={e=>handleChangeMontant(e)} defaultValue={montant} />
   <div style={{ fontSize: 12, color: "red" }}>{MontantError}</div>
  </div>
  <div class="col-sm-6"><label >TVA</label>
    <input type="number" class="form-control" id="tva" onChange={e=>handleChangeTva(e)} defaultValue={tva} />
</div>
  </div>
  <div class="row mt-3">
  <div class="col-sm-6">
    <label >Date de facturation</label>
    <input type="date" class="form-control" id="facturation" onChange={e=>handleChangeFacturation(e)} defaultValue={facturation} />
    <div style={{ fontSize: 12, color: "red" }}>{FacturationError}</div>
  </div>
  <div class="col-sm-6"><label >Date de règlement</label>
    <input type="date" class="form-control" id="reglement" onChange={e=>handleChangeReglement(e)} defaultValue={reglement} disabled={disablereglement}/>    
    {(!disablereglement&&reglement=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}
</div>
  </div>
  <div class="form-group mt-3">
    <label for="cats"> Catégorie</label>
    <select class="form-control"   onChange={e=>handleSelect(e)} defaultValue={cat}>
    <option selected disabled>selectionner catégorie</option>
        {cats.map(event=>(
            <option  value={event.nom}>{event.nom}</option>
        ))}
      </select>
  <div style={{ fontSize: 12, color: "red" }}>{CategorieError}</div>
        </div>
        {(subcats.length!=0)?(
        <div class="form-group mt-3">
    <label for="cats"> Sous Catégorie</label>
    <select class="form-control"  onChange={e=>handleSubcat(e)} defaultValue={subcat}>
      <option selected disabled>sélectionner sous-catégorie</option>
        {subcats.map(event=>(
            <option >{event.nom}</option>
        ))}
      </select>
      {(subcat=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}
        </div>):(<area/>)
        }
  <div class="form-group mt-3">
    <label > Mémo</label>
    <input type="text" class="form-control" id="memo" onChange={e=>handleChangeMemo(e)}  defaultValue={memo}/>
  </div>
  


  <br/>
<div class="row">
<button className="btn btn-outline-danger  col m-3" onClick={e=>{handleDelete(e,id)}}>Supprimer</button>
<button type="submit" className="btn btn-outline-success col m-3" onClick={e=>handleUpdate(e)}>Modifier</button>

</div>
        </ModalBody>
        <ModalFooter>
          <div><button  type="cancel"   class="btn btn-primary " onClick={handleClosemodal}>
                    fermer
                 </button></div>
                
        
                 
                 </ModalFooter>
        </form>
        </div>
      </Modal>
     
</div>
    )
}
export default Engages;