import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

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
    minWidth:200,
  },
 
  montant:{
    minWidth:100,
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

function Encaissement(){

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
const [month_year,setMonth_year]=React.useState();
const [subcats,setSubcats]=React.useState([])
const [cat,setCat]=React.useState('abonnements');
const [cats,setCats]=React.useState([]);
const [year,setYear]=React.useState('2021')
useEffect(() => {
  const fetchData = async () => {
const result=await axios.get('http://127.0.0.1:3333/enc-month??year=2021')
setdata(result.data)
console.log(data)
let opts=[]
const res=await axios.get('http://127.0.0.1:3333/encaisse?year=2021')
  setCats(res.data.list)
};
 
fetchData();
}, []);
const handleOpen =(e,sub,item)=> {
  e.preventDefault();
  let month=parseInt(sub.date)+1
  let rech='month='+year+'-'+month+'&categorie='+item.categorie+'&subcategorie='+item.subcategorie
  console.log(rech)
  setMonth_year(rech)
  axios.get('http://127.0.0.1:3333/encaisses?month=2021-7&categorie=factures&subcategorie=mahdi').then(res=>{
    setEncaissements(res.data)
  })
 setOpen(true)

};
const handleClick=(e,item)=>{
  e.preventDefault()
  const tab=data
  for(let i of tab)
  if(i.categorie===item.categorie)
  {
    i.show=!item.show
    setSubs(i.show)
    continue
  }
  setdata(tab)
}

const handleClose = () => {
 setOpen(false)

};
const handleOpenmodal =(event,item)=> {
  event.preventDefault();
  setOpenmodal(true)
  setID(item.id)
setIntitule(item.intitule)
setMontant(item.montant)
setTva(item.tva)
setType(item.type)
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
setCategorie(item.categorie)
setSubcategorie(item.subcategorie)
setMemo(item.memo)
 };
 
 const handleClosemodal = () => {
  setOpenmodal(false)
 };
const handleChangeIntitule=(e)=>{
  e.preventDefault();
  setIntitule(e.target.value)

}
const handleChangeType=(e)=>{
  e.preventDefault();
  setType(e.target.value)

}
const handleChangeMontant=(e)=>{
  e.preventDefault();
  setMontant(e.target.value)

}
const handleChangeTva=(e)=>{
  e.preventDefault();
  setTva(e.target.value)

}
const handleChangeFacturation=(e)=>{
  e.preventDefault();
  setFacturation(e.target.value)

}
const handleChangeReglement=(e)=>{
  e.preventDefault();
  setReglement(e.target.value)

}
const handleChangeCategorie=(e)=>{
  e.preventDefault();
  setCategorie(e.target.value)

}
const handleChangeSubcategorie=(e)=>{
  e.preventDefault();
  setSubcategorie(e.target.value)

}
const handleChangeMemo=(e)=>{
  e.preventDefault();
  setMemo(e.target.value)

}
const handleDelete=(e,item)=>{
  e.preventDefault();
  axios.delete(`http://127.0.0.1:3333/encaisse/${id}`).then(res => {   
    let tab=encaissements   
          tab=tab.filter(enc=> enc.id !==id);
          setEncaissements(tab)

  })   
  handleClosemodal();

}
const handleUpdate=(e)=>{
  e.preventDefault();
  const encaisse = {
  intitule:intitule,
  montant:montant,
  type:type,
  tva:tva,
  facturation:facturation,
  reglement:reglement,
  categorie:categorie,
  subcategorie:subcategorie,
  memo:memo
}
axios.put(`http://127.0.0.1:3333/encaisse/${id}`,encaisse).then(res=>{
  let tab=encaissements
  for (let i of tab)
    if(i.id===id){
      i.intitule=intitule
      i.montant=montant
      i.type=type
      i.tva=tva
      i.facturation=facturation
      i.reglement=reglement
      i.categorie=categorie
      i.subcategorie=subcategorie
      i.memo=memo
      continue
    }
    handleClosemodal();
    setEncaissements(tab)
  
})
}
const handleYear=(e)=>{
  e.preventDefault()
   setYear(e.target.value)
    axios.get(`http://127.0.0.1:3333/dec-month?year=${e.target.value}`).then(res=>{
  setdata(res.data)
  })
  console.log(year)

  }
const handleSelect=(e)=>{
  e.preventDefault();
  setCat(e.target.value)
  let subs=[]
  for(let i of cats)
  {
    if(i.nom==cat && i.subcategories.length!=0)
    { 
      for (let j of i.subcategories)
      subs.push(j)
    }
   
  }
  setSubcats(subs)
  console.log(cat,subcats)
}

let body=  (<div style={modalStyle} className={classes.paper}> 
<Table>
  <TableHead>
    <TableRow >
      <TableCell>intitulé</TableCell>
      <TableCell>catégorie : sous-catégorie</TableCell>
      <TableCell>montant</TableCell>
      <TableCell></TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {encaissements.map(e=>(
  <TableRow>
    <TableCell >{e.intitule}</TableCell>
    <TableCell >{e.categorie} : {e.subcategorie}</TableCell>
    <TableCell >{e.montant}</TableCell>
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
        <ModalHeader>
            <ModalTitle><TrendingUpIcon style={{color:"green"}}/> Modifier opération</ModalTitle>          
            </ModalHeader>
        <form  >
        <ModalBody>

        
        <div class="row">
        <div class="col-sm-6">
    <label >intitulé</label>
    <input type="text" class="form-control"  onChange={e=>{handleChangeIntitule(e)}} defaultValue={intitule} id="intitule" /></div>
    <div class="col-sm-6">
    <label for="type">type de l'opération</label>
    <select class="form-control" id="type" onChange={e=>{handleChangeType(e)}} defaultValue={type} >
      <option value="payee">payée</option>
      <option value="engagee">engagée</option>
    </select>
</div>
  </div>
       
  <div class="row mt-3">
  <div class="col-sm-6">
    <label >Montant</label>
    <input type="number" class="form-control" id="montant" onChange={e=>{handleChangeMontant(e)}} defaultValue={montant} />
  </div>
  <div class="col-sm-6"><label >TVA</label>
    <input type="number" class="form-control" id="tva" onChange={e=>{handleChangeTva(e)}}  defaultValue={tva}/></div>
  </div>
  <div class="row mt-3">
  <div class="col-sm-6">
    <label >Date de facturation</label>
    <input type="date" class="form-control" id="facturation" onChange={e=>{handleChangeFacturation(e)}} defaultValue={facturation}/>
  </div>
  <div class="col-sm-6"><label >Date de règlement</label>
    <input type="date" class="form-control" id="reglement" onChange={e=>{handleChangeReglement(e)}}  defaultValue={reglement}/></div>
  </div>
  <div class="form-group mt-3">
    <label for="cats"> Catégorie</label>
    <select class="form-control"   onChange={e=>{handleSelect(e)}} defaultValue={categorie}>
    <option disabled selected>selectionner catégorie</option>
        {cats.map(e=>(
            <option  value={e.nom}>{e.nom}</option>
        ))}
      </select>
        </div>
        {(subcats.length!=0)?(
        <div class="form-group mt-3">
    <label for="cats"> Sous Catégorie</label>
    <select class="form-control" id="cats" name="cats" defaultValue={subcategorie}>
        <option>selectionner sous catégorie</option>
        {subcats.map(e=>(
            <option >{e.nom}</option>
        ))}
      </select>
        </div>):(<area/>)}
  <div class="form-group mt-3">
    <label > Mémo</label>
    <input type="text" class="form-control" id="memo" onChange={e=>{handleChangeMemo(e)}}  defaultValue={memo}/>
  </div>
  <div class="row">
<button className="btn btn-outline-danger  col m-3" onClick={e=>{handleDelete(e,id)}}>Supprimer</button>
<button className="btn btn-outline-success col m-3" onClick={e=>handleUpdate(e)}>Modifier</button>

</div>
<br/>
     
</ModalBody>
<ModalFooter>
          <div><button  type="cancel"   class="btn btn-primary" onClick={handleClosemodal}>
                    Fermer
                 </button></div>
              
        
                 
                 </ModalFooter>

        </form>
  </div>
      </Modal>
</div>)

 const items=data
 const eps=encaissements
 return (
    
<div class="container mt-5">
<div  className="inline m-5"style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
  <form class="form-inline" >
<label for="years"> veuillez choisir l'année:</label>
<select class="form-control ml-3" id="years" name="years"  onChange={handleYear}>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021" selected>2021</option>
      </select>
      </form>
      </div>
  <Table className="table table-bordered" >
    <TableHead style={{backgroundColor: "#e6e6e6"}}>
      <TableRow >
        <TableCell className={classes.cell}></TableCell>
        <TableCell className={classes.montant}>Janvier</TableCell>
        <TableCell className={classes.montant}>Février</TableCell>
        <TableCell className={classes.montant}>Mars</TableCell>
        <TableCell className={classes.montant}>Avril</TableCell>
        <TableCell className={classes.montant}>Mai</TableCell>
        <TableCell className={classes.montant}>Juin</TableCell>
        <TableCell className={classes.montant}>Juillet</TableCell>
        <TableCell className={classes.montant}>Aout</TableCell>
        <TableCell className={classes.montant}>Septembre</TableCell>
        <TableCell className={classes.montant}>Octobre</TableCell>
        <TableCell className={classes.montant}>Novembre</TableCell>
        <TableCell className={classes.montant}>Décembre</TableCell>
        </TableRow>
    </TableHead>
   
</Table>
      {(items.length!=0)?(
      (items.map(item=>(
        (item.subs.length!==0)?(
          <Table className="table table-bordered" >
                      <TableBody>
            <list>
            <TableRow style={{backgroundColor: "#e6e6e6"}}>
            <TableCell className={classes.cell}>{item.categorie} <Button onClick={(e)=>handleClick(e,item,item.id)}>{(item.show) ? (<ExpandLess 
                                                          />
                                                      ) : (
                                                          <ExpandMore
                                                          />)}</Button></TableCell>
                                                          
            {item.tab.map(e=>(
              <TableCell className={classes.montant}>{e.montant}</TableCell>
            ))}
          </TableRow>
          <Collapse
                                                      key={item.id}
                                                      component="TableRow"
                                                      in={item.show}
                                                      timeout="auto"
                                                      unmountOnExit
                                                  >
                   {item.subs.map(sid=>(
           <TableRow>
             <TableCell className={classes.cell}>{sid.subcategorie}</TableCell>
             {sid.sum.map(e=>(
               <TableCell className={classes.montant}><Button onClick={event=>{handleOpen(event,e,sid)}}>{e.montant}</Button></TableCell>
             ))}                             
           </TableRow>
           
                   ))}
                   </Collapse>

                   </list>
                   </TableBody>

       
         </Table>
         ):

            (
              <Table className="table table-bordered" >
                <TableHead>
            <TableRow style={{backgroundColor: "#e6e6e6"}}>
        <TableCell className={classes.cell}>{item.categorie}</TableCell>
        {item.tab.map(e =>(
        <TableCell className={classes.montant}><Button onClick={handleOpen}>{e.montant}</Button>
                              
      </TableCell>
        ))}
       </TableRow>
       </TableHead>
  </Table>
  )
      
      ))))
      :(<area/>)}
    
  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      {body}
      </Modal>      
</div>
  );
      
}
export default Encaissement;