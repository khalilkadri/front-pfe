
import React,{useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import axios from 'axios';
import {useState} from 'react'

  function Operation_encaisse(props) {
     const cats=[]
     const [cat,setCat]=React.useState("");
     const subs=[]
     const [subcats,setSubcats]=React.useState([])
     const [items,setItems]=React.useState([])
     const[showsub,setShowsub]=React.useState(true)
    const url="http://127.0.0.1:3333/encaisse"
    const [Data,setData]= useState({
        intitule :"",
        montant:"",
        tva:"",
        facturation:"",
        reglement:"",
        categorie:"",
        subcategorie:"",
        memo:""
    
    })
    useEffect(() => {
      async function fetchData   ()  {
    const response=await fetch('http://127.0.0.1:3333/cat?type=encaissement')
    const body=await response.json()
    for(let i of body.list)
      cats.push(i)
    
        setSubcats(cats[0].subcategories)
        setCat(cats[0].nom)
    setItems(cats) };
    fetchData();
    console.log(cat,subcats)
    }, []);
    function submit(e){
      const config= {
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
    };
        e.preventDefault();
        axios.post(url, {
    
          user_id:'1',
            intitule: Data.intitule,
            montant: Data.montant,
            tva:Data.tva,
            type:Data.type,
            facturation: Data.facturation,
            reglement:Data.reglement,
            categorie:cat,
            subcategorie:Data.subcategorie,
            memo:Data.memo},
            
    
        )
        .then(res=>{
            }
           
        )
      
    }
   
    
    function handle(e){
        const newData ={...Data}
        newData[e.target.id]=e.target.value
        setData(newData)
    
    }
  function handleSelect(e){
     //e.preventDefault();
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
    <input type="text" class="form-control"  onChange={e=>handle(e)} id="intitule" value={Data.intitule}/></div>
    <div class="col-sm-6">
    <label for="type">type de l'opération</label>
    <select class="form-control" id="type" onChange={e=>handle(e)} value={Data.type}>
      <option value="payee">payée</option>
      <option value="engagee">engagée</option>
    </select>
</div>
  </div>
       
  <div class="row mt-3">
  <div class="col-sm-6">
    <label >Montant</label>
    <input type="number" class="form-control" id="montant" onChange={e=>handle(e)}  value={Data.montant}/>
  </div>
  <div class="col-sm-6"><label >TVA</label>
    <input type="number" class="form-control" id="tva" onChange={e=>handle(e)} value={Data.tva} /></div>
  </div>
  <div class="row mt-3">
  <div class="col-sm-6">
    <label >Date de facturation</label>
    <input type="date" class="form-control" id="facturation" onChange={e=>handle(e)}  value={Data.facturation}/>
  </div>
  <div class="col-sm-6"><label >Date de règlement</label>
    <input type="date" class="form-control" id="reglement" onChange={e=>handle(e)} value={Data.reglement} /></div>
  </div>
  <div class="form-group mt-3">
    <label for="cats"> Catégorie</label>
    <select class="form-control"   onChange={handleSelect}>
    <option selected disabled>selectionner catégorie</option>
        {items.map(event=>(
            <option  value={event.nom}>{event.nom}</option>
        ))}
      </select>
        </div>
        {(subcats.length!=0)?(
        <div class="form-group mt-3">
    <label for="cats"> Sous Catégorie</label>
    <select class="form-control"  >
        {subcats.map(event=>(
            <option >{event.nom}</option>
        ))}
      </select>
        </div>):(<area/>)
        }
  <div class="form-group mt-3">
    <label > Mémo</label>
    <input type="text" class="form-control" id="memo" onChange={e=>handle(e)} value={Data.memo} />
  </div>
  


<br/>
        </Modal.Body>
        <Modal.Footer>
          <div><button  type="cancel"   class="btn btn-danger border border-primary" onClick={props.onHide}>
                    annuler
                 </button></div>
                <div> <Button  type="submit"  bg ="success"variant="success" onClick={props.onHide}>
                   Valider
                 </Button></div>
        
                 
        </Modal.Footer>
        </form>
      </Modal>
     
      </>
    );
  }

export default Operation_encaisse;