
import React,{useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import axios from 'axios';
import {useState} from 'react'
import { SettingsSystemDaydreamSharp } from '@material-ui/icons';
import Alert from 'react-bootstrap/Alert'
import { useHistory } from "react-router-dom";

  function Operation_encaisse(props) {
     const cats=[]
     const [cat,setCat]=React.useState("");
     const [subcat,setSubcat]=React.useState('')
     const subs=[]
     let history = useHistory();
     const [subcats,setSubcats]=React.useState([])
     const [items,setItems]=React.useState([])
     const[showsub,setShowsub]=React.useState(true)
     const [intitule,setIntitule]=React.useState('');
     const [montant,setMontant]=React.useState('');
     const [tva,setTva]=React.useState('');
     const [type,setType]=React.useState('');
     const [facturation,setFacturation]=React.useState('');
     const [reglement,setReglement]=React.useState('');
     const [memo,setMemo]=React.useState('');
     const[disabled,setDisabled]=React.useState(true)
     const[disablereglement,setDisablereglement]=React.useState(true)
     const [data, setdata] = React.useState([]);
  
    useEffect(() => {
      async function fetchData   ()  {
    const response=await fetch('http://127.0.0.1:3333/cat?type=encaissement')
    const body=await response.json()
    for(let i of body.list)
      cats.push(i)
    
        setSubcats(cats[0].subcategories)
        //setCat(cats[0].nom)
    setItems(cats) };
    fetchData();
    console.log(cat,subcats)
    }, []);
  const init=()=>{
    setType('')
    setIntitule('')
    setMontant('')
    setFacturation('')
    setReglement('')
    setCat('')
    setSubcat('')
    setSubcats([])
    setDisabled(true)
    setDisablereglement(false)
  }
   const validate=()=>{
     if(intitule!=''&&type!=''&&montant!=''&&tva!=''&&facturation!=''&&cat!='')
     setDisabled(false)
     else setDisabled(true)
   }
    
    const handleChangeIntitule=(e)=>{
      e.preventDefault();
      setIntitule(e.target.value)
    validate()
    }
    const handleChangeType=(e)=>{
      e.preventDefault();
      setType(e.target.value)
      if(e.target.value=='payee')
      {setDisablereglement(true)
      }
      else if (e.target.value=='engagee')
      setDisablereglement(false)
      validate()
    }
    const handleChangeMontant=(e)=>{
      e.preventDefault();
      setMontant(e.target.value)
      validate()
    }
    const handleChangeTva=(e)=>{
      e.preventDefault();
      setTva(e.target.value)
      validate()
    }
    const handleChangeFacturation=(e)=>{
      e.preventDefault();
      setFacturation(e.target.value)
      validate()
    }
    const handleChangeReglement=(e)=>{
      e.preventDefault();
      setReglement(e.target.value)
      validate()
    }
   
    const handleChangeSubcat=(e)=>{
      e.preventDefault();
      setSubcat(e.target.value)
      validate()
    }
    const handleChangeMemo=(e)=>{
      e.preventDefault();
      setMemo(e.target.value)
    
    }
  function handleSelect(e){
     e.preventDefault();
     console.log(cat,subcats)
     setCat(e.target.value)
     for(let i of items)
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
     console.log(cat,subcats)

    }
    function handleSubcat(e){
      e.preventDefault()
      setSubcat(e.target.value)
    }
    function handleType(e){
      e.preventDefault()
      setType(e.target.value)
    }
    function submit(e){
      const config= {
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
    };
        e.preventDefault();
        axios.post("http://127.0.0.1:3333/encaisse"
        , {
    
          user_id:'1',
            intitule: intitule,
            montant: montant,
            tva:tva,
            type:type,
            facturation: facturation,
            reglement:reglement,
            categorie:cat,
            subcategorie:subcat,
            memo:memo}
            
    
        )
        .then(res=>{
           init()
          localStorage.setItem('refresh','true')
            }
           
        )
      
    }
    const cancel=(e)=>{
      e.preventDefault()
      props.onHide()
      init()
    
    }
    return (
      <>
      <Modal
        {...props}
     
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <TrendingUpIcon style={{color:"green"}}/>Ajouter Encaissement          
          </Modal.Title>
        </Modal.Header>
        <form  onSubmit={(e)=>submit(e)}>
        <Modal.Body>
        <div class="row">
        <div class="col-sm-6">
    <label >intitulé</label>
    <input type="text" class="form-control"  onChange={e=>handleChangeIntitule(e)} id="intitule" />
    {(intitule=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>
):(<area/>)}
</div>
    <div class="col-sm-6">
    <label for="type">type de l'opération</label>
    <select class="form-control" id="type" onChange={e=>handleChangeType(e)}>
      <option selected disabled>sélectionner type</option>
      <option value="payee">payée</option>
      <option value="engagee">engagée</option>
    </select>
    {(type=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}
</div>
  </div>
       
  <div class="row mt-3">
  <div class="col-sm-6">
    <label >Montant</label>
    <input type="number" class="form-control" id="montant" onChange={e=>handleChangeMontant(e)}  />
    {(montant=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}
  </div>
  <div class="col-sm-6"><label >TVA</label>
    <input type="number" class="form-control" id="tva" onChange={e=>handleChangeTva(e)}  />
</div>
  </div>
  <div class="row mt-3">
  <div class="col-sm-6">
    <label >Date de facturation</label>
    <input type="date" class="form-control" id="facturation" onChange={e=>handleChangeFacturation(e)}  />
    {(facturation=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}
  </div>
  <div class="col-sm-6"><label >Date de règlement</label>
    <input type="date" class="form-control" id="reglement" onChange={e=>handleChangeReglement(e)}  disabled={disablereglement}/>    
    {(!disablereglement)?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}
</div>
  </div>
  <div class="form-group mt-3">
    <label for="cats"> Catégorie</label>
    <select class="form-control"   onChange={e=>handleSelect(e)}>
    <option selected disabled>selectionner catégorie</option>
        {items.map(event=>(
            <option  value={event.nom}>{event.nom}</option>
        ))}
      </select>
      {(cat=='')?(<div style={{ fontSize: 12, color: "red" }}>* champ obligatoire</div>):(<area/>)}
        </div>
        {(subcats.length!=0)?(
        <div class="form-group mt-3">
    <label for="cats"> Sous Catégorie</label>
    <select class="form-control"  onChange={e=>handleSubcat(e)}>
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
    <input type="text" class="form-control" id="memo" onChange={e=>handleChangeMemo(e)}  />
  </div>
  


<br/>
        </Modal.Body>
        <Modal.Footer>
          <div><button  type="cancel"   class="btn btn-danger border border-primary" onClick={(e)=>cancel(e)}>
                    annuler
                 </button></div>
                <div> <Button  type="submit"  bg ="success"variant="success" onClick={props.onHide} disabled={disabled}>
                   Valider
                 </Button></div>
        
                 
        </Modal.Footer>
        </form>
      </Modal>
     
      </>
    );
  }

export default Operation_encaisse;