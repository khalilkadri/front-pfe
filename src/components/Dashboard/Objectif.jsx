import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
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
import AddIcon from '@material-ui/icons/Add';
import prevision from "../../images/prevision.svg";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()
const { forwardRef, useRef, useImperativeHandle } = React;

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

const Objectif=forwardRef((props, ref) => {
  

const classes = useStyles();
const [modalStyle] = React.useState(getModalStyle);
const [open, setOpen] = React.useState(false);
const [openModal, setOpenModal] = React.useState(false);
const [id,setID]=React.useState();
const [montant,setMontant]=React.useState('');
const [type,setType]=React.useState('');
const [categorie,setCategorie]=React.useState('');
const [subcategorie,setSubcategorie]=React.useState('');
const [data, setdata] = React.useState([]);
const [subs,setSubs]=React.useState(false);
const [encaissements,setEncaissements]=React.useState([]);
const [month,setMonth]=React.useState();
const [subcats,setSubcats]=React.useState([])
const [cat,setCat]=React.useState('');
const [subcat,setSubcat]=React.useState('');
const [cats,setCats]=React.useState([]);
const [year,setYear]=React.useState('')
const [obj,setobj]=React.useState()
const config= {
  headers:{
      Authorization: 'Bearer '+localStorage.getItem('token')
  }}
const months=[{id:"0",value:"Janvier"},{id:"1",value:"F??vrier"},{id:"2",value:"Mars"},{id:"3",value:"Avril"},{id:"4",value:"Mai"},
{id:"5",value:"Juin"},{id:"6",value:"July"},{id:"7",value:"Aout"},{id:"8",value:"Septembre"},{id:"9",value:"Octobre"},{id:"10",value:"Novembre"},{id:"11",value:"D??cembre"}]
useEffect(() => {
  const fetchData = async () => {
await axios.get('http://127.0.0.1:3333/objectif?year=2021',config).then(res=>{
setdata(res.data)
})
await axios.get('http://127.0.0.1:3333/cat?type=encaissement',config).then(res=>{
  setCats(res.data.list)
});
};
 
fetchData();
}, []);
function handleOpen (event,e,item,sid){
  event.preventDefault()
  let recherche='year=2021'
  console.log(e.date,item.categorie,sid.subcategorie)
  let subcat=(!sid.subcategorie)?(''):(sid.subcategorie)
  axios.get('http://127.0.0.1:3333/objfetch?year=2021&month='+e.date+'&cat='+item.categorie+'&subcategorie='+sid.subcategorie,config).then(res=>{
setMontant(res.data.montant)
setType(res.data.type)
setYear(res.data.year)
setMonth(res.data.month)
setCat(res.data.categorie)
setSubcategorie(res.data.subcategorie)
console.log(montant,type)
})

  setOpen(true)

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
 };
const handleCloseModal =(e)=> {
  e.preventDefault();

 setOpenModal(false)

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

useImperativeHandle(ref, () => ({
  setData(year){
    axios.get(`http://127.0.0.1:3333/objectif?year=${year}`,config).then(res=>{
  setdata(res.data)
  })
  }
    }));


const handleChangeType=(e)=>{
  e.preventDefault();
  setType(e.target.value)

}
const handleChangeMontant=(e)=>{
  e.preventDefault();
  setMontant(e.target.value)

}


const handleChangeCategorie=(e)=>{
  e.preventDefault();
  setCategorie(e.target.value)

}
const handleChangeSubcategorie=(e)=>{
  e.preventDefault();
  setSubcategorie(e.target.value)

}
const handleSubmit=(e)=>{
 
    e.preventDefault();
    axios.post('http://127.0.0.1:3333/objectif', {

      user_id:'1',
        montant:montant,
        type:type,
        year:year,
        month:month,
        categorie:cat,
        subcategorie:subcat,
       },config
        

    )
    .then(res=>{
      handleCloseModal(e)

        }
    )
  
}
const handleDelete=(e,item)=>{
  e.preventDefault();
  axios.delete(`http://127.0.0.1:3333/encaisse/${id}`,config).then(res => {   
    let tab=encaissements   
          tab=tab.filter(enc=> enc.id !==id);
          setEncaissements(tab)

  })   
  handleClose();
  toast.error('supprim?? avec success',{position:toast.POSITION.BOTTOM_RIGHT})

}
const handleUpdate=(e)=>{
  e.preventDefault();
  const objectif = {
  montant:montant,
  type:type,
  year:year,
  month:month,
  categorie:cat,
  subcategorie:subcat,
}
axios.put(`http://127.0.0.1:3333/objectif/${id}`,objectif,config).then(res=>{
  let tab=encaissements
  for (let i of tab)
    if(i.id===id){
      i.montant=montant
      i.type=type
      i.categorie=categorie
      i.subcategorie=subcategorie
      continue
    }
    handleClose();
    setEncaissements(tab)
  
})
}
const handleYear=(e)=>{
  e.preventDefault()
   setYear(e.target.value)
    axios.get(`http://127.0.0.1:3333/objectif?year=${e.target.value}`,config).then(res=>{
  setdata(res.data)
  })
  console.log(year)

  }
  const selectType=(e)=>{
e.preventDefault()
setType(e.target.value)
if(e.target.value=='encaissement')
axios.get('http://127.0.0.1:3333/cat?type=encaissement',config).then(res=>{
  setCats(res.data.list)
})
else if(e.target.value=='decaissement')
{
  axios.get('http://127.0.0.1:3333/cat?type=decaissement',config).then(res=>{
    setCats(res.data.list)
  })
}
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
const handleSubcat=(e)=>{
  e.preventDefault()
  setSubcat(e.target.value)
}
const handleMonth=(e)=>{
  e.preventDefault()
  setMonth(e.target.value)
}

 const items=data
 const eps=encaissements
 return (
  <main>
  <div className="main__container container-fluid">
  

  <div className="main__title mb-3 d-flex justify-content-center">
      <img src={prevision} alt="prevision" />
      <div className="main__greeting">
        <h1>Pr??visions</h1>
      </div>
     
    </div>

 

  



  <Table className="table table-bordered" >
    <TableHead style={{backgroundColor: "#e6e6e6"}}>
      <TableRow >
        <TableCell className={classes.cell}></TableCell>
        <TableCell className={classes.montant}>Janvier</TableCell>
        <TableCell className={classes.montant}>F??vrier</TableCell>
        <TableCell className={classes.montant}>Mars</TableCell>
        <TableCell className={classes.montant}>Avril</TableCell>
        <TableCell className={classes.montant}>Mai</TableCell>
        <TableCell className={classes.montant}>Juin</TableCell>
        <TableCell className={classes.montant}>Juillet</TableCell>
        <TableCell className={classes.montant}>Aout</TableCell>
        <TableCell className={classes.montant}>Septembre</TableCell>
        <TableCell className={classes.montant}>Octobre</TableCell>
        <TableCell className={classes.montant}>Novembre</TableCell>
        <TableCell className={classes.montant}>D??cembre</TableCell>
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
               <TableCell className={classes.montant}><Button onClick={event=>handleOpen(event,e,item,sid)}>{e.montant}</Button></TableCell>
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
        <TableCell className={classes.montant}><Button onClick={event=>handleOpen(event,e,item)}>{e.montant}</Button>
                              
      </TableCell>
        ))}
       </TableRow>
       </TableHead>
  </Table>
  )
      
      )))
      
      )
      :(<area/>)}
    
    <Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="simple-modal-title"
       aria-describedby="simple-modal-description"
     
      >
        
        <div style={modalStyle} className={classes.paper1}> 
        <ModalHeader>
            <ModalTitle><TrackChangesIcon style={{color:"green"}}/>Modifier Pr??vision</ModalTitle>          
            </ModalHeader>
        <form  >
        <ModalBody>

        
        <div class="row">
        <div class="col-sm-6">
    <label >Montant</label>
    <input type="number" class="form-control" id="montant"  value={montant} />
  </div>
    <div class="col-sm-6">
    <label for="type">Type Du Pr??vision</label>
    <select class="form-control" id="type" onChange={e=>{selectType(e)}} value={type} >
      <option value="encaissement">Encaissement</option>
      <option value="decaissement">D??caissement</option>
    </select>
</div>
  </div>
       
  <div class="row mt-3">
  <div class="col-sm-6">
    <label >Ann??e</label>
    <select class="form-control" id="type" value={year} >
      <option value="2019">2019</option>
      <option value="2020">2020</option>
      <option value="2021">2021</option>
    </select>  </div>
  <div class="col-sm-6"><label >Mois</label>
  <select class="form-control" id="month" value={month} >
      {months.map(e=>(
        <option value={e.id}>{e.value}</option>
      ))}
    </select>    </div>
  </div>
  <div class="form-group mt-3">
    <label for="cats"> Cat??gorie</label>
    <select class="form-control" onChange={handleSelect}   value={cat}>
    <option disabled selected>selectionner cat??gorie</option>
        {cats.map(e=>(
            <option  value={e.nom}>{e.nom}</option>
        ))}
      </select>
        </div>
        {(subcats.length!=0)?(
        <div class="form-group mt-3">
    <label for="cats"> Sous Cat??gorie</label>
    <select class="form-control" id="cats" name="cats" value={subcategorie}>
        <option>selectionner sous cat??gorie</option>
        {subcats.map(e=>(
            <option >{e.nom}</option>
        ))}
      </select>
        </div>):(<area/>)}
 
  <div class="row">
<button className="btn btn-outline-danger  col m-3" onClick={e=>{handleDelete(e,id)}}>Supprimer</button>
<button className="btn btn-outline-success col m-3" onClick={e=>handleUpdate(e)}>Modifier</button>

</div>
<br/>
     
</ModalBody>
<ModalFooter>
          <div><button  type="cancel"   class="btn btn-primary" onClick={handleClose}>
                    Fermer
                 </button></div>
              
        
                 
                 </ModalFooter>

        </form>
  </div>
      </Modal>
        
    <Modal
       open={openModal}
       onClose={handleCloseModal}
       aria-labelledby="simple-modal-title"
       aria-describedby="simple-modal-description"
     
      >
        
        <div style={modalStyle} className={classes.paper1}> 
        <ModalHeader>
            <ModalTitle><TrackChangesIcon style={{color:"green"}}/>Ajouter Pr??vision</ModalTitle>          
            </ModalHeader>
        <form className="needs-validation" >
        <ModalBody>

        
        <div class="row">
        <div class="col-sm-6">
    <label >Montant</label>
    <input type="number" class="form-control" id="montant"  onChange={handleChangeMontant} required/>
  </div>
    <div class="col-sm-6">
    <label for="type">Type Du Pr??vision</label>
    <select class="form-control" id="type"  onChange={e=>{selectType(e)}} required >
      <option value="encaissement">Encaissement</option>
      <option value="decaissement">D??caissement</option>
    </select>
</div>
  </div>
       
  <div class="row mt-3">
  <div class="col-sm-6">
    <label >Ann??e</label>
    <select class="form-control" id="type"  onChange={handleYear} required >
      <option value="2019">2019</option>
      <option value="2020">2020</option>
      <option value="2021">2021</option>
    </select>  </div>
  <div class="col-sm-6"><label >Mois</label>
  <select class="form-control" id="type"   onChange={handleMonth} required>
      {months.map(e=>(
        <option value={e.id}>{e.value}</option>
      ))}
    </select>    </div>
  </div>
  <div class="form-group mt-3">
    <label for="cats"> Cat??gorie</label>
    <select class="form-control"  onChange={handleSelect}  required>
    <option disabled selected>selectionner cat??gorie</option>
        {cats.map(e=>(
            <option  value={e.nom}>{e.nom}</option>
        ))}
      </select>
        </div>
        {(subcats.length!=0)?(
        <div class="form-group mt-3">
    <label for="cats"> Sous Cat??gorie</label>
    <select class="form-control" id="cats" name="cats"  onChange={handleSubcat} required>
        <option>selectionner sous cat??gorie</option>
        {subcats.map(e=>(
            <option >{e.nom}</option>
        ))}
      </select>
        </div>):(<area/>)}
 
 
     
</ModalBody>
<ModalFooter>
<div class="row">
<button className="btn btn-danger  col m-3" onClick={handleCloseModal}>Annuler</button>
<button className="btn btn-success col m-3" onClick={e=>handleSubmit(e)}>Ajouter</button>

</div>
              
        
                 
                 </ModalFooter>

        </form>
  </div>
      </Modal>

</div>
</main>
  );
      
});
export default Objectif;